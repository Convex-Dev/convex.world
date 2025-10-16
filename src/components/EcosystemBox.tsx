interface EcosystemBoxProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export default function EcosystemBox({ title, description, image, link }: EcosystemBoxProps) {
  const content = (
    <div className="flex flex-col items-center text-center gap-4">
      {image && (
        <div className="w-full h-32 flex items-center justify-center">
          <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-convex-dark-blue">{title}</h3>
      <p className="description-text">{description}</p>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="ecosystem-box card h-full"
      >
        {content}
      </a>
    );
  }

  return content; 
} 