"use client";

import { useId, useState, type ReactNode } from "react";

export interface FloatingBottomNavItem {
  value: string;
  label: string;
  icon: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface FloatingBottomNavProps {
  items: FloatingBottomNavItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function FloatingBottomNav({
  items,
  defaultValue,
  value,
  onValueChange,
  ariaLabel = "Primary navigation",
  className,
}: FloatingBottomNavProps) {
  const navId = useId();
  const firstAvailableValue = items.find((item) => !item.disabled)?.value;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? firstAvailableValue,
  );
  const activeValue = value ?? uncontrolledValue;

  function selectItem(nextValue: string) {
    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  return (
    <nav aria-label={ariaLabel} className={["floating-bottom-nav", className].filter(Boolean).join(" ")} id={navId}>
      <div className="floating-bottom-nav-list">
        {items.map((item) => {
          const isActive = item.value === activeValue;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className="floating-bottom-nav-item"
              disabled={item.disabled}
              key={item.value}
              onClick={() => selectItem(item.value)}
              type="button"
            >
              <span aria-hidden="true" className="floating-bottom-nav-icon">
                {item.icon}
                {item.badge !== undefined && (
                  <span className="floating-bottom-nav-badge">{item.badge}</span>
                )}
              </span>
              <span className="floating-bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
