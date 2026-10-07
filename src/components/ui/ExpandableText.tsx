"use client";

import * as React from "react";

interface ExpandableTextProps {
  shortText: string;
  fullText: React.ReactNode;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  shortText,
  fullText,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  return (
    <div ref={containerRef} className="space-y-3">
      {!expanded ? (
        <p>
          {shortText}{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(true);
            }}
            className="inline-flex items-center text-white font-black text-lg hover:text-white/80 transition-colors ml-1 animate-pulse"
          >
            &gt;
          </button>
        </p>
      ) : (
        <div className="space-y-2.5 animate-in fade-in duration-500 text-[12px] leading-relaxed">
          {fullText}
        </div>
      )}
    </div>
  );
};
