"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { StreamText } from "../stream-text";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  const tabsId = useId();
  const firstAvailableValue = items.find((item) => !item.disabled)?.value;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? firstAvailableValue,
  );
  const activeValue = value ?? uncontrolledValue;
  const activeItem = items.find((item) => item.value === activeValue && !item.disabled) ?? items.find((item) => !item.disabled);

  function selectTab(nextValue: string) {
    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentEnabledIndex = enabledItems.findIndex((item) => item.value === items[index].value);
    let nextIndex = currentEnabledIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledItems.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextItem = enabledItems[nextIndex];
    selectTab(nextItem.value);
    document.getElementById(`${tabsId}-tab-${nextItem.value}`)?.focus();
  }

  if (!activeItem) {
    return null;
  }

  const panelId = `${tabsId}-panel-${activeItem.value}`;

  return (
    <div className={["tabs", className].filter(Boolean).join(" ")}>
      <div aria-label="Tabs" className="tabs-list" role="tablist">
        {items.map((item) => {
          const itemId = `${tabsId}-tab-${item.value}`;
          const itemPanelId = `${tabsId}-panel-${item.value}`;

          return (
            <button
              aria-controls={itemPanelId}
              aria-selected={item.value === activeItem.value}
              className="tabs-tab"
              disabled={item.disabled}
              id={itemId}
              key={item.value}
              onClick={() => selectTab(item.value)}
              onKeyDown={(event) => handleTabKeyDown(event, items.indexOf(item))}
              role="tab"
              tabIndex={item.value === activeItem.value ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        aria-labelledby={`${tabsId}-tab-${activeItem.value}`}
        className="tabs-panel"
        id={panelId}
        key={activeItem.value}
        role="tabpanel"
        tabIndex={0}
      >
        <StreamText>{activeItem.content}</StreamText>
      </div>
    </div>
  );
}
