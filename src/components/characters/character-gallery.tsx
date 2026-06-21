import Image from "next/image";

type CharacterGalleryProps = {
  name: string;
  galleryUrls?: string[];
};

function canRenderImage(url: string) {
  return Boolean(url) && !url.startsWith("/placeholder/");
}

export function CharacterGallery({ name, galleryUrls = [] }: CharacterGalleryProps) {
  const images = galleryUrls.length ? galleryUrls : ["/placeholder/gallery-a.jpg", "/placeholder/gallery-b.jpg"];

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {images.map((image, index) => (
        <div key={`${image}-${index}`} className="image-placeholder relative aspect-square overflow-hidden rounded-lg">
          {canRenderImage(image) ? (
            <Image
              fill
              alt={`${name} 圖片畫廊 ${index + 1}`}
              className="object-cover"
              sizes="180px"
              src={image}
            />
          ) : (
            <span className="sr-only">{name} 圖片畫廊預留 {index + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
}
