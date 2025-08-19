// components/Skeleton.tsx
export default function Skeleton({
  width,
  height,
  circle,
  className,
}: {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${circle ? "rounded-full" : "rounded"} ${className}`}
      style={{ width, height }}
    />
  );
}
