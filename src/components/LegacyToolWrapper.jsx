import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ExternalLink, Trash2, PenLine } from 'lucide-react';

export default function LegacyToolWrapper() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toolUrl = searchParams.get('url');
  const [loading, setLoading] = useState(true);
  const [scratchpad, setScratchpad] = useState(() => {
    return localStorage.getItem('helpout_scratchpad') || '';
  });

  useEffect(() => {
    localStorage.setItem('helpout_scratchpad', scratchpad);
  }, [scratchpad]);

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
    <div className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen bg-bg">
      {/* Header for Legacy Tool */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shrink-0 z-10">
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

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Iframe Container (Left) */}
        <div className="flex-1 relative bg-bg">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-inkMid gap-3 z-10">
            <Loader2 className="w-6 h-6 animate-spin text-accent" />
            <span className="text-[14px] font-medium tracking-[0.05em] uppercase">Loading classic tool...</span>
          </div>
        )}
        <iframe
          src={toolUrl}
          title={toolTitle}
          className="w-full h-full border-none bg-transparent relative z-20"
          onLoad={(e) => {
            setLoading(false);
            try {
              const iframeWin = e.target.contentWindow;
              const iframeDoc = iframeWin.document;
              const iframePath = iframeWin.location.pathname;

              // Prevent iframe inception
              if (iframePath === '/' || iframePath === '/index.html') {
                navigate('/');
                return;
              }

              // Inject Global Fonts into the Legacy Tool
              const style = iframeDoc.createElement('style');
              style.innerHTML = `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
                
                body, p, span, div, input, button, select, textarea, li, a {
                  font-family: 'DM Sans', sans-serif !important;
                }
                
                body {
                  background-color: transparent !important;
                }
                
                h1, h2, h3, h4, h5, h6, .title, .heading, strong, b {
                  font-family: 'Playfair Display', serif !important;
                }
              `;
              iframeDoc.head.appendChild(style);
            } catch (err) {
              // Ignore cross-origin or access errors
            }
          }}
        />
        </div>

        {/* Universal Scratchpad (Right) */}
        <aside className="hidden xl:flex w-[350px] bg-surfaceDark border-l border-white/5 flex-col shrink-0">
          <div className="p-5 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <PenLine className="w-[14px] h-[14px] text-accent" />
              <h2 className="text-[12px] font-bold text-white tracking-[0.1em] uppercase">Scratchpad</h2>
            </div>
            <button 
              onClick={() => setScratchpad('')}
              className="text-white/40 hover:text-white transition-colors"
              title="Clear Scratchpad"
            >
              <Trash2 className="w-[14px] h-[14px]" />
            </button>
          </div>
          
          <div className="flex-1 p-5 overflow-hidden flex flex-col">
            <textarea
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              placeholder="Jot down quick notes, copy data from the tool, or draft ideas here. This text persists across all tools."
              className="flex-1 w-full bg-transparent text-white/80 placeholder:text-white/20 font-sans text-[13px] leading-relaxed resize-none outline-none border-none"
              spellCheck="false"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </aside>

      </div>
    </div>
  );
}
