"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface ModemAnimatedFooterProps {
  brandName?: string;
  brandDisplayName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  copyright?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

function DefaultBrandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-full w-full"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export const ModemAnimatedFooter = ({
  brandName = "Brand",
  brandDisplayName,
  brandDescription = "",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  copyright,
  brandIcon,
  className,
}: ModemAnimatedFooterProps) => {
  const display = brandDisplayName ?? brandName;
  const year = new Date().getFullYear();

  return (
    <section className={cn("relative mt-0 w-full overflow-hidden", className)}>
      <footer className="relative mt-20 border-t border-border bg-background">
        <div className="relative mx-auto flex min-h-[28rem] max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-[32rem] md:min-h-[36rem]">
          {/* Top — brand block */}
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-1 flex-col items-center space-y-2">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {display}
                </span>
                {brandDescription ? (
                  <p className="w-full max-w-sm px-4 text-center font-medium text-muted sm:w-96 sm:px-0">
                    {brandDescription}
                  </p>
                ) : null}
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-3 mb-8 flex gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted transition-colors hover:text-foreground"
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <div className="h-6 w-6 duration-300 hover:scale-110">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex max-w-full flex-wrap justify-center gap-4 px-4 text-sm font-medium text-muted">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="duration-300 hover:font-semibold hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom row — copyright + creator */}
          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-center text-base text-muted md:text-left">
              {copyright ?? `©${year} ${brandName}. Todos os direitos reservados.`}
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target={
                    creatorUrl.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    creatorUrl.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-base text-muted transition-colors duration-300 hover:font-medium hover:text-foreground"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Massive background brand text */}
        <div
          className="pointer-events-none absolute bottom-40 left-1/2 -translate-x-1/2 select-none bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent bg-clip-text px-4 text-center font-extrabold leading-none tracking-tighter text-transparent md:bottom-32"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            maxWidth: "95vw",
            fontFamily: "var(--font-display, inherit)",
          }}
          aria-hidden
        >
          {display.toUpperCase()}
        </div>

        {/* Floating brand logo card */}
        <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-3xl border-2 border-border bg-background/60 p-3 backdrop-blur-sm drop-shadow-[0_0_20px_rgba(255,255,255,0.18)] duration-400 hover:border-foreground md:bottom-20">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black text-white shadow-lg sm:h-16 sm:w-16 md:h-24 md:w-24">
            <div className="flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-14 md:w-14">
              {brandIcon ?? <DefaultBrandIcon />}
            </div>
          </div>
        </div>

        {/* Gradient divider line */}
        <div
          className="absolute bottom-32 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent backdrop-blur-sm sm:bottom-[8.5rem]"
          aria-hidden
        />

        {/* Soft mask covering the bottom (so the giant text fades into the page) */}
        <div
          className="absolute bottom-28 h-24 w-full bg-gradient-to-t from-background via-background/80 to-background/40 blur-[1em]"
          aria-hidden
        />
      </footer>
    </section>
  );
};

export default ModemAnimatedFooter;
