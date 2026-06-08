"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,

  cardWidth = 520,
  cardHeight = 320,

  overlap = 0.48,
  spreadDeg = 48,

  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,

  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,

  springStiffness = 280,
  springDamping = 28,

  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,

  showDots = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  // Pause autoplay when the stack is off-screen — saves CPU on long pages.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (!inView) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    inView,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-white/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/40 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;

              const isActive = off === 0;

              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;

              const rotateX = isActive ? 0 : tiltXDeg;

              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: unknown,
                      info: {
                        offset: { x: number };
                        velocity: { x: number };
                      },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);

                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 overflow-hidden rounded-2xl border border-white/10 shadow-xl",
                    "select-none will-change-transform",
                    isActive
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-pointer",
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 40,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    on
                      ? "w-6 bg-accent"
                      : "w-2 bg-white/25 hover:bg-white/50",
                  )}
                  aria-label={`Ir para ${it.title}`}
                />
              );
            })}
          </div>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              target={activeItem.href.startsWith("http") ? "_blank" : undefined}
              rel={
                activeItem.href.startsWith("http") ? "noreferrer" : undefined
              }
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-white/25 hover:text-foreground"
              aria-label={activeItem.ctaLabel ?? `Abrir ${activeItem.title}`}
            >
              <SquareArrowOutUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function DefaultFanCard({
  item,
  active,
}: {
  item: CardStackItem;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full bg-[#0d0d12]">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 90vw, 520px"
            className="object-cover"
            draggable={false}
            loading="lazy"
            quality={active ? 80 : 55}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface text-sm text-muted">
            Sem imagem
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        {item.tag ? (
          <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
            {item.tag}
          </span>
        ) : null}
        <div
          className={cn(
            "font-display truncate text-lg font-semibold text-white sm:text-xl",
            active ? "drop-shadow-md" : "",
          )}
        >
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-neutral-300">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
