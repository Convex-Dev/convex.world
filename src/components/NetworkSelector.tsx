'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useConvex } from '@/contexts/ConvexContext';

const PRESETS: { label: string; url: string }[] = [
  { label: 'Protonet (convex.live)', url: 'https://peer.convex.live' },
  { label: 'Testnet', url: 'https://mikera1337-convex-testnet.hf.space' },
];

function normalizeUrl(u: string): string {
  return (u || '').trim().replace(/\/$/, '');
}

export default function NetworkSelector() {
  const { peerUrl, setPeerUrl } = useConvex();
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  const normalized = normalizeUrl(peerUrl);
  const preset = PRESETS.find((p) => normalizeUrl(p.url) === normalized);
  const displayLabel = preset ? preset.label : 'Custom';

  useEffect(() => {
    if (open && !preset) setCustomInput(peerUrl);
    else if (!open) setCustomInput('');
  }, [open, preset, peerUrl]);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const applyCustom = useCallback(() => {
    const v = customInput.trim();
    if (v) {
      setPeerUrl(v);
      setOpen(false);
    }
  }, [customInput, setPeerUrl]);

  return (
    <div className="network-selector" ref={wrapRef}>
      <button
        type="button"
        className="network-selector-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select network"
        title={peerUrl}
      >
        <span className="network-selector-label">{displayLabel}</span>
        <ChevronDown size={14} className="network-selector-chevron" aria-hidden />
      </button>

      {open && (
        <div className="network-selector-popover" role="listbox">
          {PRESETS.map((p) => (
            <button
              key={p.url}
              type="button"
              role="option"
              aria-selected={normalizeUrl(p.url) === normalized}
              className="network-selector-option"
              onClick={() => {
                setPeerUrl(p.url);
                setOpen(false);
              }}
            >
              {p.label}
            </button>
          ))}
          <div className="network-selector-custom">
            <input
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder="Custom peer URL"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyCustom()}
              className="network-selector-input"
              aria-label="Custom peer URL"
            />
            <button
              type="button"
              className="network-selector-apply"
              onClick={applyCustom}
              disabled={!customInput.trim()}
            >
              Use
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
