"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Phone, MapPin, Calendar, FileText, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Lead {
  id: string;
  aanbiederId: string | null;
  bedrijfsnaam: string | null;
  naam: string;
  email: string;
  telefoon: string | null;
  woningtype: string | null;
  bericht: string | null;
  bron: string | null;
  plattegrondUrl: string | null;
  gefactureerd: number | null;
  createdAt: string;
}

interface ParsedBericht {
  // Configurator leads
  configuratie?: {
    woningType?: string;
    totaalM2?: number;
    aantalVerdiepingen?: number;
    buitenBreedte?: number;
    buitenDiepte?: number;
    dakType?: string | null;
    gevelType?: string | null;
    verwarmingType?: string | null;
    zonnepanelen?: number;
    vloerverwarming?: boolean;
    keukenNiveau?: string;
    badkamerNiveau?: string;
    kamers?: { naam: string; m2: number }[];
  };
  prijsIndicatie?: { laag: number; hoog: number };
  contact?: {
    postcode?: string;
    oplevertermijn?: string;
    budget?: string;
    woonsituatie?: string;
    doel?: string;
    heeftKavel?: string;
    kavelGrootte?: number;
    opmerkingen?: string;
  };
  // Verfijnd flag (set by PATCH endpoint)
  isVerfijnd?: boolean;
  // Contactformulier leads
  onderwerp?: string;
  bericht?: string;
}

function parseBericht(bericht: string | null): ParsedBericht | null {
  if (!bericht) return null;
  try {
    return JSON.parse(bericht);
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function BronBadge({ bron }: { bron: string | null }) {
  const label = bron === "configurator" ? "Configurator" : bron === "contact" ? "Contactformulier" : bron === "aanbiederspagina" ? "Aanbieder" : bron || "Onbekend";
  const color = bron === "configurator" ? "bg-primary-50 text-primary" : bron === "contact" ? "bg-accent-50 text-accent" : "bg-gray-100 text-gray-600";
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-md ${color}`}>{label}</span>;
}

function LeadRow({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);
  const parsed = parseBericht(lead.bericht);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Summary row */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {lead.naam.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-dark truncate">{lead.naam}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span className="truncate">{lead.email}</span>
                {lead.woningtype && (
                  <span className="hidden sm:inline text-gray-400">{lead.woningtype}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <BronBadge bron={lead.bron} />
            {parsed?.isVerfijnd && (
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-md bg-green-50 text-green-700">Verfijnd</span>
            )}
            <span className="text-xs text-gray-400 hidden md:inline">{formatDate(lead.createdAt)}</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {/* Detail panel */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Contact info */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contactgegevens</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">
                    {lead.email}
                  </a>
                </div>
                {lead.telefoon && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <a href={`tel:${lead.telefoon}`} className="hover:text-primary transition-colors">
                      {lead.telefoon}
                    </a>
                  </div>
                )}
                {parsed?.contact?.postcode && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {parsed.contact.postcode}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {formatDate(lead.createdAt)}
                </div>
              </div>

              {/* Extra contact details */}
              {parsed?.contact && (
                <div className="pt-2 space-y-1.5">
                  {parsed.contact.budget && (
                    <p className="text-xs text-gray-600"><span className="font-medium">Budget:</span> {parsed.contact.budget}</p>
                  )}
                  {parsed.contact.oplevertermijn && (
                    <p className="text-xs text-gray-600"><span className="font-medium">Oplevertermijn:</span> {parsed.contact.oplevertermijn}</p>
                  )}
                  {parsed.contact.woonsituatie && (
                    <p className="text-xs text-gray-600"><span className="font-medium">Woonsituatie:</span> {parsed.contact.woonsituatie}</p>
                  )}
                  {parsed.contact.doel && (
                    <p className="text-xs text-gray-600"><span className="font-medium">Doel:</span> {parsed.contact.doel}</p>
                  )}
                  {parsed.contact.heeftKavel && parsed.contact.heeftKavel !== "onbekend" && (
                    <p className="text-xs text-gray-600"><span className="font-medium">Heeft kavel:</span> {parsed.contact.heeftKavel === "ja" ? "Ja" : "Nee"}</p>
                  )}
                  {parsed.contact.kavelGrootte && (
                    <p className="text-xs text-gray-600"><span className="font-medium">Kavelgrootte:</span> {parsed.contact.kavelGrootte} m²</p>
                  )}
                </div>
              )}

              {/* Opmerkingen */}
              {parsed?.contact?.opmerkingen && (
                <div className="pt-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Opmerkingen</p>
                  <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-100">
                    {parsed.contact.opmerkingen}
                  </p>
                </div>
              )}

              {/* Contactformulier bericht */}
              {parsed?.onderwerp && (
                <div className="pt-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Onderwerp</p>
                  <p className="text-sm text-gray-700 font-medium">{parsed.onderwerp}</p>
                </div>
              )}
              {parsed?.bericht && (
                <div className="pt-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Bericht</p>
                  <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-100 whitespace-pre-wrap">
                    {parsed.bericht}
                  </p>
                </div>
              )}

              {/* Plain text bericht (non-configurator leads) */}
              {!parsed && lead.bericht && (
                <div className="pt-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Bericht</p>
                  <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-100 whitespace-pre-wrap">
                    {lead.bericht}
                  </p>
                </div>
              )}
            </div>

            {/* Plattegrond */}
            {lead.plattegrondUrl && (
              <div className="md:col-span-2 space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Plattegrond</h4>
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <img
                    src={lead.plattegrondUrl}
                    alt="Plattegrond"
                    className="w-full max-w-lg rounded-lg border border-gray-200"
                  />
                </div>
              </div>
            )}

            {/* Configuratie info */}
            {parsed?.configuratie && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Configuratie</h4>
                <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2.5">
                  {parsed.configuratie.woningType && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Woningtype</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.woningType}</span>
                    </div>
                  )}
                  {parsed.configuratie.totaalM2 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Oppervlak</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.totaalM2} m²</span>
                    </div>
                  )}
                  {parsed.configuratie.aantalVerdiepingen && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Verdiepingen</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.aantalVerdiepingen}</span>
                    </div>
                  )}
                  {parsed.configuratie.buitenBreedte && parsed.configuratie.buitenDiepte && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Afmetingen</span>
                      <span className="font-medium text-gray-700">
                        {parsed.configuratie.buitenBreedte} x {parsed.configuratie.buitenDiepte} m
                      </span>
                    </div>
                  )}
                  {parsed.configuratie.dakType && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dak</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.dakType}</span>
                    </div>
                  )}
                  {parsed.configuratie.gevelType && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gevel</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.gevelType}</span>
                    </div>
                  )}
                  {parsed.configuratie.verwarmingType && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Verwarming</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.verwarmingType}</span>
                    </div>
                  )}
                  {parsed.configuratie.zonnepanelen !== undefined && parsed.configuratie.zonnepanelen > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Zonnepanelen</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.zonnepanelen}x</span>
                    </div>
                  )}
                  {parsed.configuratie.vloerverwarming && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Vloerverwarming</span>
                      <span className="font-medium text-gray-700">Ja</span>
                    </div>
                  )}
                  {parsed.configuratie.keukenNiveau && parsed.configuratie.keukenNiveau !== "standaard" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Keuken</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.keukenNiveau}</span>
                    </div>
                  )}
                  {parsed.configuratie.badkamerNiveau && parsed.configuratie.badkamerNiveau !== "standaard" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Badkamer</span>
                      <span className="font-medium text-gray-700">{parsed.configuratie.badkamerNiveau}</span>
                    </div>
                  )}

                  {/* Kamers */}
                  {parsed.configuratie.kamers && parsed.configuratie.kamers.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1.5">Kamers</p>
                      <div className="flex flex-wrap gap-1.5">
                        {parsed.configuratie.kamers.map((k, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-100">
                            {k.naam} ({k.m2} m²)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Prijsindicatie */}
                {parsed.prijsIndicatie && parsed.prijsIndicatie.laag > 0 && (
                  <div className="bg-primary-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-primary mb-1">Prijsindicatie</p>
                    <p className="text-lg font-bold text-primary font-heading tabular-nums">
                      {formatPrice(parsed.prijsIndicatie.laag)} – {formatPrice(parsed.prijsIndicatie.hoog)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
        else setError(data.error || "Kon leads niet laden.");
      })
      .catch(() => setError("Kon leads niet laden."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold text-dark mb-6">Leads</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            {leads.length} {leads.length === 1 ? "lead" : "leads"} totaal
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Nog geen leads binnengekomen.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
