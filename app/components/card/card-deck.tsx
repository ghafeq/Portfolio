import { Children, type ReactNode } from "react";

export interface CardDeckProps {
  children: ReactNode;
  className?: string;
}

/**
 * The fanned deck of four cards that spreads into a 2x2 grid on hover. The
 * liquid layer sits behind the cards and is styled entirely in app.css.
 */
export function CardDeck({ children, className }: CardDeckProps) {
  const classes = ["card-deck", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {children}
      <div aria-hidden="true" className="card-deck-liquid">
        {Children.map(children, () => (
          <span />
        ))}
        <svg height="0" style={{ position: "absolute" }} width="0">
          {/* Blur, then threshold the alpha: edges within reach of each other
              merge and everything else stays crisp. The offset sits at half
              the slope, so a lone edge lands where it started. Leave the 24px
              gap clear of the merge range or the cards never separate. */}
          <filter
            colorInterpolationFilters="sRGB"
            height="140%"
            id="card-deck-liquid-filter"
            width="120%"
            x="-10%"
            y="-20%"
          >
            <feGaussianBlur stdDeviation="14" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11.5" />
          </filter>
        </svg>
      </div>
    </div>
  );
}
