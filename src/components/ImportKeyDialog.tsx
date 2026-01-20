'use client';

import { useState, useCallback, useEffect } from 'react';
import { hexToBytes, getPublicKeyFromSeed, bytesToHex } from '@/lib/crypto';

type ImportKeyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Account's public key (hex) to verify the imported seed matches */
  accountPublicKey: string | null | undefined;
  onImport: (privateKeyHex: string) => void;
};

const norm = (hex: string) => (hex || '').replace(/^0x/i, '').toLowerCase();

export default function ImportKeyDialog({
  isOpen,
  onClose,
  accountPublicKey,
  onImport,
}: ImportKeyDialogProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const reset = useCallback(() => {
    setInput('');
    setError(null);
    setIsVerifying(false);
  }, []);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleImport = useCallback(async () => {
    setError(null);
    const raw = input.trim().replace(/^0x/i, '').toLowerCase();
    if (raw.length !== 64 || !/^[0-9a-f]+$/.test(raw)) {
      setError('Invalid format: 64 hex characters (0x optional)');
      return;
    }
    if (!accountPublicKey) {
      setError('Account has no public key to verify against');
      return;
    }

    setIsVerifying(true);
    try {
      const seed = hexToBytes(raw);
      const derived = await getPublicKeyFromSeed(seed);
      const derivedHex = bytesToHex(derived);
      if (norm(derivedHex) !== norm(accountPublicKey)) {
        setError("Key does not match this account's public key");
        return;
      }
      onImport(raw);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to verify key');
    } finally {
      setIsVerifying(false);
    }
  }, [input, accountPublicKey, onImport, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="import-key-dialog-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-key-dialog-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="import-key-dialog-panel" onClick={(e) => e.stopPropagation()}>
        <h2 id="import-key-dialog-title" className="import-key-dialog-title">
          Import private key
        </h2>
        <p className="import-key-dialog-desc">
          Enter the Ed25519 seed (32 bytes, 64 hex characters) for this account. It will be
          verified against the account&apos;s public key.
        </p>
        <input
          type="password"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="64 hex characters (0x optional)"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          className="import-key-dialog-input"
          aria-invalid={!!error}
          aria-describedby={error ? 'import-key-dialog-error' : undefined}
        />
        {error && (
          <p id="import-key-dialog-error" className="import-key-dialog-error" role="alert">
            {error}
          </p>
        )}
        <div className="import-key-dialog-actions">
          <button type="button" className="import-key-dialog-btn import-key-dialog-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="import-key-dialog-btn import-key-dialog-import"
            onClick={handleImport}
            disabled={!input.trim() || isVerifying}
          >
            {isVerifying ? 'Verifying…' : 'Import'}
          </button>
        </div>
      </div>
    </div>
  );
}
