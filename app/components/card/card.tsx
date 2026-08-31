"use client";

import type { ReactNode } from "react";
import { useStaggerReveal } from "../stagger-reveal";

export interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
}

export function Card({ title, description, icon, href, className }: CardProps) {
  const revealRef = useStaggerReveal();

  const content = (
    <>
      <span aria-hidden="true" className="card-icon stagger-line stagger-line--1">
        {icon}
      </span>
      <span className="card-content">
        <span className="card-title stagger-line stagger-line--2">{title}</span>
        <span className="card-description stagger-line stagger-line--3">{description}</span>
      </span>
    </>
  );

  const classes = ["card", "stagger", href && "card-link", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={classes} href={href} ref={revealRef}>
        {content}
      </a>
    );
  }

  return (
    <article className={classes} ref={revealRef}>
      {content}
    </article>
  );
}
