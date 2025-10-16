interface EcosystemBoxProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export default function EcosystemBox({ title, description, image, link }: EcosystemBoxProps) {
  const content = (
    <div>
      {image && (
        <img src={image} alt={title} style={{ width: '100%',  height: '150px', objectFit: 'contain' }}/>
      )}
      <h3>{title}</h3>
      <p className="description-text">{description}</p>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="ecosystem-box card"
      >
        {content}
      </a>
    );
  }

  return <div className="card">{content}</div>;
} 