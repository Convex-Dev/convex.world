interface CodeProps {
  children: string;
  language?: string;
  className?: string;
}

export default function Code({ children, language, className = "" }: CodeProps) {
  return (
    <div className={`code-block ${className}`}>
      {language && (
        <div className="code-language">
          {language}
        </div>
      )}
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
