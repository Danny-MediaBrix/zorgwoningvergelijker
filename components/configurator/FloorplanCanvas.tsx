"use client";

import { useState, useRef, useCallback, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Text, Group, Line, Circle } from "react-konva";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { KAMER_LABELS, KAMER_BORDER_KLEUREN, KamerType, Kamer } from "@/lib/types";
import { formatM2 } from "@/lib/utils";
import { X, Move, LayoutGrid } from "lucide-react";
import type Konva from "konva";

const GRID_STEP = 0.5; // meters
const WALL_OUTER = 6;
const WALL_INNER_OFFSET = 6;
const HANDLE_RADIUS = 7;
const HANDLE_HIT_RADIUS = 17;
const MIN_ROOM_SIZE = 1; // minimum 1m
const PADDING = 60; // padding around floor plan

// Warm color palette
const COLORS = {
  canvasBg: "#FAF9F6",
  dotPattern: "#E8E4DE",
  gridMajor: "#E8E4DE",
  gridMinor: "#F2EFE9",
  gridNumbers: "#9B958E",
  outerWall: "#4A3B5C",
  innerWall: "#D4CFC8",
  shadow: "rgba(88,58,133,0.04)",
  roomName: "#251938",
  roomM2: "#78716C",
  dimLine: "#583A85",
  dimLabel: "#64748B",
} as const;

/** Detect which room IDs overlap with at least one other room */
function getOverlappingIds(kamers: Kamer[], scale: number): Set<string> {
  const ids = new Set<string>();
  for (let i = 0; i < kamers.length; i++) {
    for (let j = i + 1; j < kamers.length; j++) {
      const a = kamers[i];
      const b = kamers[j];
      const aw = a.breedte * scale;
      const ah = a.diepte * scale;
      const bw = b.breedte * scale;
      const bh = b.diepte * scale;
      if (a.x < b.x + bw && a.x + aw > b.x && a.y < b.y + bh && a.y + ah > b.y) {
        ids.add(a.id);
        ids.add(b.id);
      }
    }
  }
  return ids;
}

export interface FloorplanCanvasHandle {
  exportAsDataUrl: () => string | null;
}

interface FloorplanCanvasProps {
  moduleId?: string;
  readOnly?: boolean;
  compact?: boolean;
}

const FloorplanCanvas = forwardRef<FloorplanCanvasHandle, FloorplanCanvasProps>(function FloorplanCanvas({
  moduleId,
  readOnly = false,
  compact = false,
}, ref) {
  const {
    kamers: allKamers,
    modules,
    activeModuleId,
    buitenBreedte: storeBreedte,
    buitenDiepte: storeDiepte,
    updateKamer,
    removeKamer,
    pushUndo,
    undo,
  } = useConfiguratorStore();

  // Determine which kamers and dimensions to use
  const targetModuleId = moduleId || activeModuleId;
  const targetModule = modules.find((m) => m.id === targetModuleId);
  const kamers = targetModule ? targetModule.kamers : allKamers;
  const buitenBreedte = targetModule ? targetModule.buitenBreedte : storeBreedte;
  const buitenDiepte = targetModule ? targetModule.buitenDiepte : storeDiepte;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredHandle, setHoveredHandle] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [resizing, setResizing] = useState<{
    id: string;
    handle: string;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startRoomX: number;
    startRoomY: number;
  } | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useImperativeHandle(ref, () => ({
    exportAsDataUrl: () => {
      if (!stageRef.current) return null;
      try {
        return stageRef.current.toDataURL({ pixelRatio: 2 });
      } catch {
        return null;
      }
    },
  }));

  // First-time hint check
  useEffect(() => {
    if (compact || readOnly) return;
    const seen = localStorage.getItem("zwv-floorplan-hint-seen");
    if (!seen && kamers.length > 0) {
      setShowHint(true);
    }
  }, [compact, readOnly, kamers.length]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    localStorage.setItem("zwv-floorplan-hint-seen", "true");
  }, []);

  // Responsive container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Keyboard shortcuts: Ctrl+Z, Escape, Delete
  useEffect(() => {
    if (readOnly || compact) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // Ctrl+Z / Cmd+Z: undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Escape: deselect
      if (e.key === "Escape") {
        setSelectedId(null);
        return;
      }

      // Delete/Backspace: remove selected room
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        removeKamer(selectedId);
        setSelectedId(null);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [readOnly, compact, selectedId, undo, removeKamer]);

  // Zoom-to-fit calculation
  const rawW = buitenBreedte * 40 + PADDING * 2;
  const rawH = buitenDiepte * 40 + PADDING * 2;
  const maxCanvasW = compact ? 200 : containerWidth;
  const maxCanvasH = compact ? 150 : 600;
  const scale = Math.min(
    (maxCanvasW - 40) / rawW,
    (maxCanvasH - 40) / rawH,
    compact ? 0.5 : 1
  );
  const SCALE = 40 * scale;
  const GRID_PX = GRID_STEP * SCALE;

  const canvasWidth = Math.max(compact ? 180 : 500, Math.min(maxCanvasW, buitenBreedte * SCALE + PADDING * 2 * scale));
  const canvasHeight = Math.max(compact ? 120 : 350, buitenDiepte * SCALE + PADDING * 2 * scale);
  const offsetX = compact ? 20 * scale : PADDING * scale;
  const offsetY = compact ? 20 * scale : PADDING * scale;
  const outerW = buitenBreedte * SCALE;
  const outerH = buitenDiepte * SCALE;

  // Snap to grid
  const snapToGrid = useCallback(
    (val: number): number => Math.round(val / GRID_PX) * GRID_PX,
    [GRID_PX]
  );

  // Clamp room position within walls
  const clampPosition = useCallback(
    (x: number, y: number, w: number, h: number) => ({
      x: Math.max(0, Math.min(x, outerW - w)),
      y: Math.max(0, Math.min(y, outerH - h)),
    }),
    [outerW, outerH]
  );

  // Drag start: push undo
  const handleDragStart = useCallback(
    () => {
      if (readOnly) return;
      pushUndo();
    },
    [readOnly, pushUndo]
  );

  // Drag end: snap and clamp to walls (overlap is allowed, shown visually)
  const handleDragEnd = useCallback(
    (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
      if (readOnly) return;
      const kamer = kamers.find((k) => k.id === id);
      if (!kamer) return;

      const rawX = e.target.x() - offsetX;
      const rawY = e.target.y() - offsetY;
      const snappedX = snapToGrid(rawX);
      const snappedY = snapToGrid(rawY);
      const roomW = kamer.breedte * SCALE;
      const roomH = kamer.diepte * SCALE;
      const { x, y } = clampPosition(snappedX, snappedY, roomW, roomH);

      e.target.x(x + offsetX);
      e.target.y(y + offsetY);
      updateKamer(id, { x, y });
    },
    [kamers, clampPosition, updateKamer, offsetX, offsetY, snapToGrid, SCALE, readOnly]
  );

  // Drag bound: clamp to walls in real-time
  const handleDragBound = useCallback(
    (id: string, pos: { x: number; y: number }) => {
      const kamer = kamers.find((k) => k.id === id);
      if (!kamer) return pos;
      const roomW = kamer.breedte * SCALE;
      const roomH = kamer.diepte * SCALE;
      const { x, y } = clampPosition(pos.x - offsetX, pos.y - offsetY, roomW, roomH);
      return { x: x + offsetX, y: y + offsetY };
    },
    [kamers, clampPosition, offsetX, offsetY, SCALE]
  );

  // Resize handlers
  const handleResizeMouseDown = useCallback(
    (id: string, handle: string, e: Konva.KonvaEventObject<MouseEvent>) => {
      if (readOnly) return;
      e.cancelBubble = true;
      const kamer = kamers.find((k) => k.id === id);
      if (!kamer) return;
      const stage = stageRef.current;
      if (!stage) return;
      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;
      pushUndo();
      setResizing({
        id,
        handle,
        startX: pointerPos.x,
        startY: pointerPos.y,
        startWidth: kamer.breedte * SCALE,
        startHeight: kamer.diepte * SCALE,
        startRoomX: kamer.x,
        startRoomY: kamer.y,
      });
    },
    [kamers, SCALE, readOnly, pushUndo]
  );

  const handleMouseMove = useCallback(() => {
    if (!resizing) return;
    const stage = stageRef.current;
    if (!stage) return;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    const dx = pointerPos.x - resizing.startX;
    const dy = pointerPos.y - resizing.startY;
    const minPx = MIN_ROOM_SIZE * SCALE;
    let newW = resizing.startWidth;
    let newH = resizing.startHeight;
    let newX = resizing.startRoomX;
    let newY = resizing.startRoomY;

    switch (resizing.handle) {
      case "se":
        newW = Math.max(minPx, snapToGrid(resizing.startWidth + dx));
        newH = Math.max(minPx, snapToGrid(resizing.startHeight + dy));
        break;
      case "sw":
        newW = Math.max(minPx, snapToGrid(resizing.startWidth - dx));
        newH = Math.max(minPx, snapToGrid(resizing.startHeight + dy));
        newX = resizing.startRoomX + (resizing.startWidth - newW);
        break;
      case "ne":
        newW = Math.max(minPx, snapToGrid(resizing.startWidth + dx));
        newH = Math.max(minPx, snapToGrid(resizing.startHeight - dy));
        newY = resizing.startRoomY + (resizing.startHeight - newH);
        break;
      case "nw":
        newW = Math.max(minPx, snapToGrid(resizing.startWidth - dx));
        newH = Math.max(minPx, snapToGrid(resizing.startHeight - dy));
        newX = resizing.startRoomX + (resizing.startWidth - newW);
        newY = resizing.startRoomY + (resizing.startHeight - newH);
        break;
    }

    // Clamp to walls
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);
    newW = Math.min(newW, outerW - newX);
    newH = Math.min(newH, outerH - newY);

    const newBreedte = Math.round((newW / SCALE) * 2) / 2;
    const newDiepte = Math.round((newH / SCALE) * 2) / 2;

    updateKamer(resizing.id, {
      x: newX,
      y: newY,
      breedte: newBreedte,
      diepte: newDiepte,
      m2: Math.round(newBreedte * newDiepte * 10) / 10,
    });
  }, [resizing, outerW, outerH, updateKamer, SCALE, snapToGrid]);

  const handleMouseUp = useCallback(() => {
    if (resizing) setResizing(null);
  }, [resizing]);

  // Click on background deselects — room clicks cancel bubble so they don't reach here
  const handleStageClick = useCallback(
    () => {
      if (readOnly) return;
      setSelectedId(null);
    },
    [readOnly]
  );

  // Generate dot-pattern + grid with warm colors
  const gridElements = useMemo(() => {
    const elements: React.ReactNode[] = [];

    // Dot pattern background
    if (!compact) {
      const dotSpacing = 40 * scale;
      for (let dx = 0; dx <= canvasWidth; dx += dotSpacing) {
        for (let dy = 0; dy <= canvasHeight; dy += dotSpacing) {
          elements.push(
            <Circle
              key={`dot-${dx}-${dy}`}
              x={dx}
              y={dy}
              radius={1}
              fill={COLORS.dotPattern}
            />
          );
        }
      }
    }

    // Minor grid (0.5m)
    for (let x = 0; x <= buitenBreedte; x += GRID_STEP) {
      const px = x * SCALE + offsetX;
      const isMajor = x % 1 === 0;
      elements.push(
        <Line
          key={`vg-${x}`}
          points={[px, offsetY, px, offsetY + outerH]}
          stroke={isMajor ? COLORS.gridMajor : COLORS.gridMinor}
          strokeWidth={isMajor ? 0.75 : 0.5}
          dash={isMajor ? undefined : [2, 6]}
        />
      );
    }
    for (let y = 0; y <= buitenDiepte; y += GRID_STEP) {
      const py = y * SCALE + offsetY;
      const isMajor = y % 1 === 0;
      elements.push(
        <Line
          key={`hg-${y}`}
          points={[offsetX, py, offsetX + outerW, py]}
          stroke={isMajor ? COLORS.gridMajor : COLORS.gridMinor}
          strokeWidth={isMajor ? 0.75 : 0.5}
          dash={isMajor ? undefined : [2, 6]}
        />
      );
    }

    // Grid numbers along edges
    if (!compact) {
      for (let x = 0; x <= buitenBreedte; x += 1) {
        elements.push(
          <Text
            key={`gn-x-${x}`}
            x={x * SCALE + offsetX - 4}
            y={offsetY - 14}
            text={`${x}`}
            fontSize={9}
            fill={COLORS.gridNumbers}
            align="center"
          />
        );
      }
      for (let y = 0; y <= buitenDiepte; y += 1) {
        elements.push(
          <Text
            key={`gn-y-${y}`}
            x={offsetX - 16}
            y={y * SCALE + offsetY - 4}
            text={`${y}`}
            fontSize={9}
            fill={COLORS.gridNumbers}
            align="right"
          />
        );
      }
    }

    return elements;
  }, [buitenBreedte, buitenDiepte, SCALE, offsetX, offsetY, outerW, outerH, canvasWidth, canvasHeight, compact, scale]);

  // Compute which rooms overlap — for visual feedback
  const overlappingIds = useMemo(
    () => getOverlappingIds(kamers, SCALE),
    [kamers, SCALE]
  );

  const selectedKamer = kamers.find((k) => k.id === selectedId);

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card overflow-hidden relative">
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
          onClick={handleStageClick}
          onTap={handleStageClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: resizing ? "nwse-resize" : readOnly ? "default" : "default" }}
        >
          <Layer>
            {/* Background — warm off-white */}
            <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill={COLORS.canvasBg} />

            {/* Dot pattern + grid */}
            {gridElements}

            {/* Shadow behind floor plan */}
            <Rect
              x={offsetX + 3}
              y={offsetY + 3}
              width={outerW}
              height={outerH}
              fill={COLORS.shadow}
              cornerRadius={1}
            />

            {/* Outer walls — double wall system */}
            {/* Inner fill */}
            <Rect
              x={offsetX}
              y={offsetY}
              width={outerW}
              height={outerH}
              fill="white"
            />
            {/* Inner wall line */}
            <Rect
              x={offsetX + WALL_INNER_OFFSET * scale}
              y={offsetY + WALL_INNER_OFFSET * scale}
              width={outerW - WALL_INNER_OFFSET * 2 * scale}
              height={outerH - WALL_INNER_OFFSET * 2 * scale}
              stroke={COLORS.innerWall}
              strokeWidth={1}
              fill="transparent"
            />
            {/* Outer wall line */}
            <Rect
              x={offsetX}
              y={offsetY}
              width={outerW}
              height={outerH}
              stroke={COLORS.outerWall}
              strokeWidth={WALL_OUTER * scale}
              fill="transparent"
              lineCap="round"
              lineJoin="round"
            />

            {/* Rooms */}
            {kamers.map((kamer) => {
              const isSelected = selectedId === kamer.id;
              const isOverlapping = overlappingIds.has(kamer.id);
              const roomW = kamer.breedte * SCALE;
              const roomH = kamer.diepte * SCALE;
              const roomX = kamer.x + offsetX;
              const roomY = kamer.y + offsetY;
              const borderColor = KAMER_BORDER_KLEUREN[kamer.type];
              const fillColor = kamer.kleur;

              return (
                <Group
                  key={kamer.id}
                  onClick={(e) => { e.cancelBubble = true; }}
                  onTap={(e) => { e.cancelBubble = true; }}
                >
                  {/* Overlap warning: red dashed border */}
                  {isOverlapping && !isSelected && (
                    <Rect
                      x={roomX - 2}
                      y={roomY - 2}
                      width={roomW + 4}
                      height={roomH + 4}
                      fill="transparent"
                      stroke="#E8524A"
                      strokeWidth={2}
                      dash={[5, 3]}
                      cornerRadius={3}
                      listening={false}
                    />
                  )}

                  {/* Selection: dashed border (red if overlapping) */}
                  {isSelected && (
                    <Rect
                      x={roomX - 3}
                      y={roomY - 3}
                      width={roomW + 6}
                      height={roomH + 6}
                      fill="transparent"
                      stroke={isOverlapping ? "#E8524A" : borderColor}
                      strokeWidth={2}
                      dash={[6, 4]}
                      cornerRadius={4}
                      listening={false}
                    />
                  )}

                  {/* Room group — draggable */}
                  <Group
                    x={roomX}
                    y={roomY}
                    draggable={!readOnly}
                    onDragStart={() => handleDragStart()}
                    onDragEnd={(e) => handleDragEnd(kamer.id, e)}
                    dragBoundFunc={(pos) => handleDragBound(kamer.id, pos)}
                    onClick={(e) => {
                      if (readOnly) return;
                      e.cancelBubble = true;
                      setSelectedId(kamer.id);
                    }}
                    onTap={(e) => {
                      if (readOnly) return;
                      e.cancelBubble = true;
                      setSelectedId(kamer.id);
                    }}
                  >
                    {/* Room fill — flat, no gradient */}
                    <Rect
                      x={0}
                      y={0}
                      width={roomW}
                      height={roomH}
                      fill={isOverlapping ? `${fillColor}CC` : fillColor}
                      stroke={isSelected ? (isOverlapping ? "#E8524A" : borderColor) : COLORS.innerWall}
                      strokeWidth={isSelected ? 2 : 1}
                      cornerRadius={2}
                    />

                    {/* Room icon watermark */}
                    {roomW > 30 && roomH > 30 && (
                      <Text
                        x={roomW / 2 - 8}
                        y={roomH / 2 - 12}
                        text={getIconChar(kamer.type)}
                        fontSize={Math.min(roomW, roomH) * 0.3}
                        fill={borderColor}
                        opacity={0.15}
                        align="center"
                        width={16}
                      />
                    )}

                    {/* Room name label */}
                    <Text
                      x={4}
                      y={roomH / 2 - (compact ? 5 : 10)}
                      width={roomW - 8}
                      text={kamer.naam}
                      fontSize={compact ? 8 : 12}
                      fontStyle="600"
                      fill={COLORS.roomName}
                      align="center"
                      wrap="none"
                      ellipsis
                    />
                    {/* M2 label */}
                    {!compact && (
                      <Text
                        x={4}
                        y={roomH / 2 + 4}
                        width={roomW - 8}
                        text={formatM2(kamer.m2)}
                        fontSize={10}
                        fill={COLORS.roomM2}
                        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
                        align="center"
                      />
                    )}
                  </Group>

                  {/* Resize handles (circles) — larger for seniors */}
                  {isSelected && !readOnly && !compact &&
                    (["nw", "ne", "sw", "se"] as const).map((handle) => {
                      const hx =
                        handle.includes("w") ? roomX : roomX + roomW;
                      const hy =
                        handle.includes("n") ? roomY : roomY + roomH;
                      const isHovered = hoveredHandle === `${kamer.id}-${handle}`;
                      return (
                        <Group key={handle}>
                          {/* Invisible hit area for better touch targeting */}
                          <Circle
                            x={hx}
                            y={hy}
                            radius={HANDLE_HIT_RADIUS}
                            fill="transparent"
                            onMouseEnter={() => setHoveredHandle(`${kamer.id}-${handle}`)}
                            onMouseLeave={() => setHoveredHandle(null)}
                            onMouseDown={(e) => handleResizeMouseDown(kamer.id, handle, e)}
                            onTouchStart={(e) =>
                              handleResizeMouseDown(kamer.id, handle, e as unknown as Konva.KonvaEventObject<MouseEvent>)
                            }
                          />
                          {/* Visible handle */}
                          <Circle
                            x={hx}
                            y={hy}
                            radius={isHovered ? HANDLE_RADIUS * 1.3 : HANDLE_RADIUS}
                            fill="#FFF"
                            stroke={borderColor}
                            strokeWidth={2}
                            shadowColor="rgba(0,0,0,0.1)"
                            shadowBlur={3}
                            shadowOffsetY={1}
                            listening={false}
                          />
                        </Group>
                      );
                    })}

                  {/* Dimension lines for selected room */}
                  {isSelected && !readOnly && !compact && (
                    <Group listening={false}>
                      {/* Width dimension line (top) */}
                      <Line
                        points={[roomX, roomY - 18, roomX + roomW, roomY - 18]}
                        stroke={COLORS.dimLine}
                        strokeWidth={1}
                        dash={[4, 3]}
                      />
                      <Line points={[roomX, roomY - 23, roomX, roomY - 13]} stroke={COLORS.dimLine} strokeWidth={1} />
                      <Line points={[roomX + roomW, roomY - 23, roomX + roomW, roomY - 13]} stroke={COLORS.dimLine} strokeWidth={1} />
                      {/* Width pill */}
                      <Rect
                        x={roomX + roomW / 2 - 22}
                        y={roomY - 26}
                        width={44}
                        height={16}
                        fill="white"
                        stroke={COLORS.dimLine}
                        strokeWidth={0.5}
                        cornerRadius={8}
                      />
                      <Text
                        x={roomX + roomW / 2 - 22}
                        y={roomY - 24}
                        width={44}
                        text={`${kamer.breedte} m`}
                        fontSize={9}
                        fill={COLORS.dimLine}
                        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
                        fontStyle="600"
                        align="center"
                      />

                      {/* Depth dimension line (right) */}
                      <Line
                        points={[roomX + roomW + 18, roomY, roomX + roomW + 18, roomY + roomH]}
                        stroke={COLORS.dimLine}
                        strokeWidth={1}
                        dash={[4, 3]}
                      />
                      <Line points={[roomX + roomW + 13, roomY, roomX + roomW + 23, roomY]} stroke={COLORS.dimLine} strokeWidth={1} />
                      <Line points={[roomX + roomW + 13, roomY + roomH, roomX + roomW + 23, roomY + roomH]} stroke={COLORS.dimLine} strokeWidth={1} />
                      {/* Depth pill */}
                      <Rect
                        x={roomX + roomW + 10}
                        y={roomY + roomH / 2 - 8}
                        width={44}
                        height={16}
                        fill="white"
                        stroke={COLORS.dimLine}
                        strokeWidth={0.5}
                        cornerRadius={8}
                      />
                      <Text
                        x={roomX + roomW + 10}
                        y={roomY + roomH / 2 - 6}
                        width={44}
                        text={`${kamer.diepte} m`}
                        fontSize={9}
                        fill={COLORS.dimLine}
                        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
                        fontStyle="600"
                        align="center"
                      />
                    </Group>
                  )}
                </Group>
              );
            })}

            {/* Outer dimension labels */}
            {!compact && (
              <>
                {/* Bottom: width */}
                <Line
                  points={[offsetX, offsetY + outerH + 20, offsetX + outerW, offsetY + outerH + 20]}
                  stroke={COLORS.gridNumbers}
                  strokeWidth={1}
                />
                <Line points={[offsetX, offsetY + outerH + 15, offsetX, offsetY + outerH + 25]} stroke={COLORS.gridNumbers} strokeWidth={1} />
                <Line points={[offsetX + outerW, offsetY + outerH + 15, offsetX + outerW, offsetY + outerH + 25]} stroke={COLORS.gridNumbers} strokeWidth={1} />
                <Rect
                  x={offsetX + outerW / 2 - 26}
                  y={offsetY + outerH + 12}
                  width={52}
                  height={16}
                  fill="white"
                  stroke={COLORS.gridNumbers}
                  strokeWidth={0.5}
                  cornerRadius={8}
                />
                <Text
                  x={offsetX + outerW / 2 - 26}
                  y={offsetY + outerH + 14}
                  width={52}
                  text={`${buitenBreedte} m`}
                  fontSize={10}
                  fontStyle="600"
                  fill={COLORS.dimLabel}
                  fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
                  align="center"
                />

                {/* Right: depth */}
                <Line
                  points={[offsetX + outerW + 20, offsetY, offsetX + outerW + 20, offsetY + outerH]}
                  stroke={COLORS.gridNumbers}
                  strokeWidth={1}
                />
                <Line points={[offsetX + outerW + 15, offsetY, offsetX + outerW + 25, offsetY]} stroke={COLORS.gridNumbers} strokeWidth={1} />
                <Line points={[offsetX + outerW + 15, offsetY + outerH, offsetX + outerW + 25, offsetY + outerH]} stroke={COLORS.gridNumbers} strokeWidth={1} />
                <Rect
                  x={offsetX + outerW + 12}
                  y={offsetY + outerH / 2 - 8}
                  width={52}
                  height={16}
                  fill="white"
                  stroke={COLORS.gridNumbers}
                  strokeWidth={0.5}
                  cornerRadius={8}
                />
                <Text
                  x={offsetX + outerW + 12}
                  y={offsetY + outerH / 2 - 6}
                  width={52}
                  text={`${buitenDiepte} m`}
                  fontSize={10}
                  fontStyle="600"
                  fill={COLORS.dimLabel}
                  fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
                  align="center"
                />
              </>
            )}
          </Layer>
        </Stage>

        {/* Empty state overlay (HTML) */}
        {kamers.length === 0 && !compact && !readOnly && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
            <div className="text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-7 h-7 text-primary" />
              </div>
              <p className="text-body font-semibold text-dark mb-1">Nog geen kamers</p>
              <p className="text-body-sm text-gray-600 max-w-[240px]">
                Voeg kamers toe via het paneel links om je plattegrond samen te stellen.
              </p>
            </div>
          </div>
        )}

        {/* First-time hint overlay */}
        {showHint && !compact && !readOnly && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#251938]/40 rounded-2xl z-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-[280px] mx-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                <Move className="w-6 h-6 text-primary" />
              </div>
              <p className="text-body font-semibold text-dark mb-1">Sleep om te verplaatsen</p>
              <p className="text-body-sm text-gray-600 mb-4">
                Versleep kamers naar de gewenste plek. Gebruik de hoekpunten om het formaat aan te passen.
              </p>
              <button
                type="button"
                onClick={dismissHint}
                className="bg-primary text-white px-5 py-2.5 rounded-xl text-body-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                Begrepen, aan de slag!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected room info card (replaces legend) */}
      {!compact && !readOnly && selectedKamer && (
        <div className="mt-3 bg-white rounded-xl border border-gray-200/80 shadow-sm px-4 py-3 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: selectedKamer.kleur }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: KAMER_BORDER_KLEUREN[selectedKamer.type] }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-semibold text-dark truncate">{selectedKamer.naam}</p>
            <p className="text-caption text-gray-600">
              {selectedKamer.breedte} × {selectedKamer.diepte} m &middot; {formatM2(selectedKamer.m2)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Deselecteer kamer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
});

export default FloorplanCanvas;

// Simple icon characters for room watermarks
function getIconChar(type: KamerType): string {
  const chars: Record<KamerType, string> = {
    woonkamer: "\u2302",    // ⌂
    slaapkamer: "\u2BEC",   // bed-like
    keuken: "\u2668",       // hot springs
    badkamer: "\u2B58",     // circle
    berging: "\u25A3",      // square
    werkruimte: "\u25A4",   // square with lines
    wasruimte: "\u25CB",    // circle
    terras: "\u2600",       // sun
    hal: "\u2302",          // house
  };
  return chars[type] || "";
}
