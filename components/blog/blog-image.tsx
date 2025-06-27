import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function BlogImage({
  src,
  alt,
  className,
  width = 400,
  height = 300,
}: BlogImageProps) {
  // Handle placeholder URLs - use regular img for placeholders
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

  // Use Next.js Image for real images
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "cover" }}
      priority={false}
    />
  );
}
