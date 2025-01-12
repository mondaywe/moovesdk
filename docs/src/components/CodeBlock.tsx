"use client";

import { useEffect, useState } from 'react';
import { getHighlighter } from '@/lib/highlighter';
import type { BundledLanguage } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighter = await getHighlighter();
        const result = await highlighter.codeToHtml(code, {
          lang: language as BundledLanguage,
          theme: 'github-dark',
        });
        setHighlightedCode(result);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
    };
    highlight();
  }, [code, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="relative">
        <div className="absolute top-0 right-0 px-4 py-1 text-xs font-medium text-gray-500 uppercase bg-zinc-800/50 rounded-bl">
          {language}
        </div>
        <div
          className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-sm"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
