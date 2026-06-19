import React, { useState, useEffect } from 'react';
import { useRAID } from './RAIDContext';
import { AIEngine } from './AIEngine';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, Bug, CheckSquare, Sparkles, Loader2 } from 'lucide-react';

export default function DashboardView() {
  const { data } = useRAID();
  const [aiSummary, setAiSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      setLoadingSummary(true);
      const summary = await AIEngine.generateExecutiveSummary(data);
      setAiSummary(summary);
      setLoadingSummary(false);
    }
    fetchSummary();
  }, [data]);

  const openRisks = data.risks.filter(r => r.status === 'Open' || r.status === 'In Progress').length;
  const criticalIssues = data.issues.filter(i => i.severity === 'Critical' || i.severity === 'High').length;
  const overdueActions = data.actions.filter(a => new Date(a.dueDate) < new Date() && a.status !== 'Closed').length;

  const chartData = [
    { name: 'Risks', Open: data.risks.filter(r=>r.status!=='Closed').length, Closed: data.risks.filter(r=>r.status==='Closed').length },
    { name: 'Actions', Open: data.actions.filter(a=>a.status!=='Closed').length, Closed: data.actions.filter(a=>a.status==='Closed').length },
    { name: 'Issues', Open: data.issues.filter(i=>i.status!=='Closed').length, Closed: data.issues.filter(i=>i.status==='Closed').length },
    { name: 'Decisions', Open: data.decisions.length, Closed: 0 },
  ];

  const StatCard = ({ icon: Icon, value, label, bg, color }) => (
    <div className={`p-6 rounded-2xl shadow-sm border border-black/5 flex items-center gap-5 ${bg}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-white shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-display text-[2.5rem] font-bold leading-none text-ink tracking-[-1px]">{value}</div>
        <div className="text-[13px] font-medium text-ink/70 mt-1">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={AlertTriangle} value={openRisks} label="Open Risks" bg="bg-[#fef2f2]" color="text-[#ef4444]" />
        <StatCard icon={Bug} value={criticalIssues} label="Critical/High Issues" bg="bg-[#fffbeb]" color="text-[#f59e0b]" />
        <StatCard icon={CheckSquare} value={overdueActions} label="Overdue Actions" bg="bg-[#e0e7ff]" color="text-[#6366f1]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e4db]">
          <h2 className="font-heading text-[18px] font-bold text-ink mb-6">RAID Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e4db" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b6256', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b6256', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f0ece3'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', color: '#6b6256'}} />
                <Bar dataKey="Open" stackId="a" fill="#1f1a14" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Closed" stackId="a" fill="#d8cfbf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e4db] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <h2 className="font-heading text-[18px] font-bold text-ink">AI Executive Summary</h2>
          </div>
          
          <div className="flex-1 bg-[#fbf9f6] rounded-xl p-5 border border-[#e8e4db] text-[14px] leading-[1.6] text-muted overflow-y-auto">
            {loadingSummary ? (
              <div className="h-full flex flex-col items-center justify-center text-muted gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
                <span>Analyzing RAID data...</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: aiSummary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
