"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="quickstart-code copy-block" onClick={handleCopy}>
      <code>{text}</code>
      <span className="copy-icon" aria-label="Copy to clipboard">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </span>
    </div>
  );
}

export default function InstallCommands() {
  const [host, setHost] = useState("https://convex.world");

  useEffect(() => {
    setHost(window.location.origin);
  }, []);

  return (
    <div className="downloads-platforms">
      <div className="hover-card download-platform-card">
        <h3>macOS / Linux</h3>
        <CopyBlock text={`curl -fsSL ${host}/install.sh | bash`} />
        <p className="quickstart-note">
          Works on macOS, Linux, and Windows via WSL or Git Bash.
        </p>
      </div>
      <div className="hover-card download-platform-card">
        <h3>Windows PowerShell</h3>
        <CopyBlock text={`irm ${host}/install.ps1 | iex`} />
        <p className="quickstart-note">
          Run in PowerShell. Creates a <code>convex</code> command available
          system-wide.
        </p>
      </div>
    </div>
  );
}
