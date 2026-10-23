'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/reduced-motion';

type TerminalLine = { type: 'command' | 'result'; text: string };
type TerminalSequence = { lines: TerminalLine[] };

interface AnimatedTerminalProps {
  sequences: TerminalSequence[];
  title?: string;
  className?: string;
}

export default function AnimatedTerminal({ sequences, title = 'convex-lisp', className = '' }: AnimatedTerminalProps) {
  const [seqIdx, setSeqIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const reduceMotion = usePrefersReducedMotion();

  const seq = sequences[seqIdx];
  // With reduced motion, show the sequence complete with a steady cursor instead of typing it out
  const shownLineIdx = reduceMotion ? seq.lines.length : lineIdx;
  const showCursor = reduceMotion || cursorOn;
  const line = seq.lines[shownLineIdx];

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!line) {
      const id = setTimeout(() => {
        setSeqIdx(i => (i + 1) % sequences.length);
        setLineIdx(0);
        setTyped('');
      }, 2000);
      return () => clearTimeout(id);
    }

    if (line.type === 'command') {
      if (typed.length < line.text.length) {
        const id = setTimeout(() => setTyped(t => line.text.slice(0, t.length + 1)), 30 + Math.random() * 25);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => { setLineIdx(i => i + 1); setTyped(''); }, 400);
      return () => clearTimeout(id);
    }

    if (line.type === 'result') {
      const id = setTimeout(() => { setLineIdx(i => i + 1); setTyped(''); }, 800);
      return () => clearTimeout(id);
    }
  }, [line, typed, sequences.length, reduceMotion]);

  const renderLines = () => {
    const out: React.ReactElement[] = [];
    for (let i = 0; i < seq.lines.length; i++) {
      const l = seq.lines[i];
      if (i < shownLineIdx) {
        out.push(
          <code key={i} className={l.type === 'result' ? 'terminal-result' : ''}>
            {l.text}
          </code>
        );
      } else if (i === shownLineIdx) {
        if (l.type === 'command') {
          out.push(
            <code key={i}>
              {typed}
              <span className={`terminal-cursor${showCursor ? '' : ' terminal-cursor-hidden'}`} />
            </code>
          );
        } else {
          out.push(
            <code key={i} className="terminal-result">{l.text}</code>
          );
        }
      }
    }
    if (shownLineIdx >= seq.lines.length) {
      out.push(
        <code key="end">
          <span className={`terminal-cursor${showCursor ? '' : ' terminal-cursor-hidden'}`} />
        </code>
      );
    }
    return out;
  };

  return (
    <div className={`dev-code-showcase ${className}`}>
      <div className="dev-code-header">
        <span className="dev-code-dot" />
        <span className="dev-code-dot" />
        <span className="dev-code-dot" />
        <span className="dev-code-title">{title}</span>
      </div>
      <div className="dev-code-body">
        {renderLines()}
      </div>
    </div>
  );
}
