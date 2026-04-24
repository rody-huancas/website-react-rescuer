import type { CSSProperties } from "react";

interface Props {
  text          : string;
  wordClassName?: string;
  wordStyle    ?: CSSProperties;
}

const StaggerWords = ({ text, wordClassName, wordStyle }: Props) => {
  const words = text.split(" ").filter(Boolean);
  
  return (
    <span className="inline" aria-label={text}>
      <span aria-hidden className="inline">
        {words.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-baseline"
          >
            <span
              data-rr-stagger-word
              className={`inline-block will-change-transform ${wordClassName ?? ""}`}
              style={wordStyle}
            >
              {word}
            </span>
            {idx < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </span>
    </span>
  );
};

export default StaggerWords;
