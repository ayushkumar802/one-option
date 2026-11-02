'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { getJobShareUrl } from '@/config/constant';

interface CopyJobButtonProps {
  slug: string;
  title?: string;
  className?: string;
}

export function CopyJobButton({ slug, title, className = '' }: CopyJobButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent card navigation or default behavior
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
      e.nativeEvent.stopImmediatePropagation();
    }

    if (!slug) return;

    const shareUrl = getJobShareUrl(slug);
    let success = false;

    // 1. Try modern async Clipboard API if available and in secure context
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch {
        success = false;
      }
    }

    // 2. Reliable fallback for HTTP, older browsers, or mobile WebKit
    if (!success && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '2em';
        textarea.style.height = '2em';
        textarea.style.padding = '0';
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        textarea.style.opacity = '0.01';
        textarea.style.zIndex = '-1';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`job-card-copy-btn ${copied ? 'copied' : ''} ${className}`.trim()}
      aria-label={copied ? 'Job link copied' : `Copy link for ${title || 'job'}`}
      title={copied ? 'Job link copied to clipboard!' : 'Copy job link'}
    >
      {copied ? (
        <>
          <Check size={13} className="copy-icon check-icon" />
          <span className="copy-text">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={13} className="copy-icon" />
          <span className="copy-text">Copy Link</span>
        </>
      )}
    </button>
  );
}
