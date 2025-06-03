interface EcosystemBoxProps {
  title: string;
  description: string;
}

export default function EcosystemBox({ title, description }: EcosystemBoxProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
      <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">{title}</h3>
      <p className="text-convex-medium-blue">{description}</p>
    </div>
  );
} 