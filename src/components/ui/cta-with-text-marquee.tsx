"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface VerticalMarqueeProps {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  playing?: boolean;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  playing = true,
}: VerticalMarqueeProps) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden", className)}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationPlayState: playing ? "running" : "paused" }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationPlayState: playing ? "running" : "paused" }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

export interface CTAItem {
  label: string;
  href: string;
}

export interface CTAWithTextMarqueeProps {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: CTAItem;
  secondaryCta?: CTAItem;
  marqueeItems: string[];
  marqueeSpeed?: number;
  /** When true, marquee renders on the left and content on the right. */
  reverseLayout?: boolean;
  id?: string;
  className?: string;
}

export function CTAWithTextMarquee({
  kicker,
  title,
  description,
  primaryCta,
  secondaryCta,
  marqueeItems,
  marqueeSpeed = 22,
  reverseLayout = false,
  id,
  className,
}: CTAWithTextMarqueeProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = React.useState(false);

  // Pause marquee + opacity loop when section is off-screen.
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const node = sectionRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setPlaying(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Center-fade opacity effect — only runs while section is in view.
  const contentBlock = (
    <div
      className={cn(
        "max-w-xl space-y-7 animate-fade-in-up",
        reverseLayout ? "lg:order-2" : "",
      )}
    >
      {kicker ? (
        <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
          {kicker}
        </div>
      ) : null}
      <h2
        className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="text-base leading-relaxed text-muted sm:text-lg md:text-xl animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          {description}
        </p>
      ) : null}
      {(primaryCta || secondaryCta) && (
        <div
          className="flex flex-wrap gap-3 animate-fade-in-up"
          style={{ animationDelay: "360ms" }}
        >
          {primaryCta ? (
            <a
              href={primaryCta.href}
              className="group relative overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-medium uppercase tracking-wider text-white shadow-accent transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">{primaryCta.label}</span>
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden
              />
            </a>
          ) : null}
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className="group relative overflow-hidden rounded-xl border border-border-strong bg-white/[0.04] px-6 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.08]"
            >
              <span className="relative z-10">{secondaryCta.label}</span>
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden
              />
            </a>
          ) : null}
        </div>
      )}
    </div>
  );

  const marqueeBlock = (
    <div
      className={cn(
        "relative flex h-[480px] items-center justify-center [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)] sm:h-[560px] lg:h-[640px] animate-fade-in-up",
        reverseLayout ? "lg:order-1" : "",
      )}
      style={{ animationDelay: "240ms" }}
    >
      <div className="relative h-full w-full">
        <VerticalMarquee speed={marqueeSpeed} playing={playing} className="h-full">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="marquee-item font-display py-6 text-3xl font-light tracking-tight text-foreground sm:py-8 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {item}
            </div>
          ))}
        </VerticalMarquee>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-background via-background/60 to-transparent sm:h-56"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-background via-background/60 to-transparent sm:h-56"
          aria-hidden
        />
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "cv-auto relative w-full overflow-hidden px-6 py-20 sm:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {reverseLayout ? (
            <>
              {marqueeBlock}
              {contentBlock}
            </>
          ) : (
            <>
              {contentBlock}
              {marqueeBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
