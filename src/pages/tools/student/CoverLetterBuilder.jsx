import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Mail, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CoverLetterBuilder() {
  const navigate = useNavigate();
  const [jobDesc, setJobDesc] = useState('');
  const [background, setBackground] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!jobDesc.trim() || !background.trim()) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write a compelling, professional cover letter for the following job description, tailored to my background.\n\n### Job Description:\n${jobDesc}\n\n### My Background:\n${background}`,
          systemInstruction: 'You are an elite career coach. Return ONLY the final cover letter text. Format it beautifully with HTML line breaks (<br/>) or markdown paragraphs. No conversational filler or introductory text.'
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
            <h1 className="font-serif text-[22px] font-bold text-ink leading-none">Cover Letter Builder</h1>
            <div className="text-[11px] text-inkLight font-bold tracking-[0.1em] uppercase mt-1">Student Suite</div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-[12px] font-bold tracking-[0.05em] uppercase text-white bg-ink px-4 py-2 rounded-[4px] hover:bg-accent transition-colors">
          <Download className="w-4 h-4" /> Export Document
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative" style={{ backgroundImage: 'radial-gradient(var(--color-borderMd) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        
        {/* INPUT PANEL */}
        <div className="w-full lg:w-1/2 h-full bg-card/90 backdrop-blur-md border-r border-borderMd flex flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-y-auto custom-scrollbar">
          <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
            <div>
              <label className="text-[13px] font-bold text-ink tracking-[0.05em] uppercase mb-2 block">Job Description</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-[150px] bg-bg border border-borderMd rounded-xl p-4 text-[14px] text-ink placeholder:text-inkLight resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all custom-scrollbar"
                spellCheck="false"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-[13px] font-bold text-ink tracking-[0.05em] uppercase mb-2 block">Your Background</label>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="Paste your resume or list your key skills here..."
                className="flex-1 w-full bg-bg border border-borderMd rounded-xl p-4 text-[14px] text-ink placeholder:text-inkLight resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all custom-scrollbar"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="p-6 md:p-8 border-t border-borderMd bg-card shrink-0">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !jobDesc.trim() || !background.trim()}
              className="w-full bg-accent hover:bg-[#A83528] disabled:bg-borderMd disabled:text-inkMid text-white font-bold text-[14px] tracking-[0.05em] uppercase py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? <><Sparkles className="w-5 h-5 animate-pulse" /> Generating Cover Letter...</> : <><Sparkles className="w-5 h-5" /> Generate Cover Letter</>}
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto p-6 md:p-12 flex items-start justify-center relative z-10">
          {!result ? (
            <div className="text-center mt-20 flex flex-col items-center opacity-50">
              <Mail className="w-16 h-16 text-inkLight mb-4 stroke-[1]" />
              <p className="text-[15px] text-inkMid font-medium">Your customized cover letter will appear here.</p>
            </div>
          ) : (
            <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(28,25,23,0.08)] border border-borderMd p-10 md:p-16">
              <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink" dangerouslySetInnerHTML={{ __html: result }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
