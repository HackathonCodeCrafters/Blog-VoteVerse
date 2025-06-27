import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) {
  // Handle placeholder URLs
  if (src.includes("placeholder.svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={className}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}
