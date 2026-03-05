import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => (
        <details
          key={item.id}
          className="group border border-gray-200 rounded-xl overflow-hidden bg-white"
          {...(!allowMultiple && { name: "accordion" })}
        >
          <summary className="flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="font-semibold text-body pr-4">{item.title}</span>
            <ChevronDown
              className="w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-6 pb-5 text-body text-gray-600 leading-relaxed">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
