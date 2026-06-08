import Image from "next/image";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  height?: number;
};

const LOGO_WIDTH = 760;
const LOGO_HEIGHT = 306;
const MARK_WIDTH = 202;
const MARK_HEIGHT = 300;

export function Logo({
  className,
  showWordmark = true,
  height = 44,
}: LogoProps) {
  if (!showWordmark) {
    return <LogoMark className={className} size={height} />;
  }

  const displayWidth = Math.round(height * (LOGO_WIDTH / LOGO_HEIGHT));

  return (
    <Image
      src="/sixcode-logo.png"
      alt="SixCode"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      unoptimized
      sizes={`${displayWidth}px`}
      className={`block select-none ${className ?? ""}`}
      style={{ height, width: displayWidth }}
    />
  );
}

export function LogoMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  const displayWidth = Math.round(size * (MARK_WIDTH / MARK_HEIGHT));

  return (
    <Image
      src="/sixcode-mark.png"
      alt="SixCode"
      width={MARK_WIDTH}
      height={MARK_HEIGHT}
      unoptimized
      sizes={`${displayWidth}px`}
      className={`block select-none ${className ?? ""}`}
      style={{ height: size, width: displayWidth }}
    />
  );
}
