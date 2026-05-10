import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ExternalLink } from 'lucide-react';

export default function LegacyToolWrapper() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toolUrl = searchParams.get('url');
  const [loading, setLoading] = useState(true);

  if (!toolUrl) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-muted">
        <h2 className="font-heading text-2xl font-bold text-ink mb-2">Tool Not Found</h2>
        <p>No legacy tool URL was provided.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-ink text-cream px-6 py-2 rounded-full font-medium">Return Home</button>
      </div>
    );
  }

  // Extract a readable title from the URL path
  const pathParts = toolUrl.split('/');
  const rawTitle = pathParts[pathParts.length - 2] || 'Tool';
  const toolTitle = decodeURIComponent(rawTitle);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen bg-white">
      {/* Header for Legacy Tool */}
      <header className="bg-white border-b border-[#e8e4db] px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-muted hover:text-ink transition-colors p-1 rounded-md hover:bg-[#f0ece3]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-heading text-[18px] font-bold text-ink leading-none">{toolTitle}</h1>
            <div className="text-[11px] text-muted font-medium tracking-[0.5px] uppercase mt-1">
              Classic Tool
            </div>
          </div>
        </div>
        <a 
          href={toolUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[13px] font-medium text-muted hover:text-ink transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> Open Original
        </a>
      </header>

      {/* Iframe Container */}
      <div className="flex-1 relative bg-[#fbf9f6]">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted gap-3 bg-[#fbf9f6] z-10">
            <Loader2 className="w-6 h-6 animate-spin text-accent" />
            <span className="text-[14px] font-medium">Loading classic tool...</span>
          </div>
        )}
        <iframe
          src={toolUrl}
          title={toolTitle}
          className="w-full h-full border-none"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
