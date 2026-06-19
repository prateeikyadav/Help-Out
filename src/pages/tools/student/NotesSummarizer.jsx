import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Highlighter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotesSummarizer() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Summarize the following study notes or text into the most critical bullet points. Use clear markdown formatting with logical headings.\n\nRaw Text:\n${notes}`,
          systemInstruction: 'You are an elite academic tutor. Distill the provided text into a concise, highly readable summary. Extract the most important concepts, definitions, and formulas. Return ONLY the markdown formatted summary, absolutely no conversational filler.'
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate');
      setResult(data.text);
    } catch (err) {
      setResult(`**Error:** ${err.message}\n\n*Make sure you added your GEMINI_API_KEY to your Vercel project settings.*`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen bg-bg overflow-hidden">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-inkMid hover:text-ink transition-colors p-1 rounded-md hover:bg-bg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif text-[22px] font-bold text-ink leading-none">AI Notes Summarizer</h1>
            <div className="text-[11px] text-inkLight font-bold tracking-[0.1em] uppercase mt-1">Student Suite</div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-[12px] font-bold tracking-[0.05em] uppercase text-white bg-ink px-4 py-2 rounded-[4px] hover:bg-accent transition-colors">
          <Download className="w-4 h-4" /> Export Summary
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative" style={{ backgroundImage: 'radial-gradient(var(--color-borderMd) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        
        {/* INPUT PANEL */}
        <div className="w-full lg:w-1/2 h-full bg-card/90 backdrop-blur-md border-r border-borderMd flex flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <label className="text-[13px] font-bold text-ink tracking-[0.05em] uppercase mb-2 block">Raw Notes or Text</label>
            <p className="text-[13px] text-inkMid mb-4">Paste your textbook chapter, raw lecture notes, or study guide. The AI will distill it into the most critical bullet points.</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste massive amounts of text here..."
              className="flex-1 w-full bg-bg border border-borderMd rounded-xl p-5 text-[14px] text-ink placeholder:text-inkLight resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all custom-scrollbar"
              spellCheck="false"
            />
          </div>
          <div className="p-6 md:p-8 border-t border-borderMd bg-card">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !notes.trim()}
              className="w-full bg-accent hover:bg-[#A83528] disabled:bg-borderMd disabled:text-inkMid text-white font-bold text-[14px] tracking-[0.05em] uppercase py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? <><Sparkles className="w-5 h-5 animate-pulse" /> Summarizing...</> : <><Sparkles className="w-5 h-5" /> Generate Summary</>}
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto p-6 md:p-12 flex items-start justify-center relative z-10">
          {!result ? (
            <div className="text-center mt-20 flex flex-col items-center opacity-50">
              <Highlighter className="w-16 h-16 text-inkLight mb-4 stroke-[1]" />
              <p className="text-[15px] text-inkMid font-medium">Your distilled summary will appear here.</p>
            </div>
          ) : (
            <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(28,25,23,0.08)] border border-borderMd p-10 md:p-16 prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
