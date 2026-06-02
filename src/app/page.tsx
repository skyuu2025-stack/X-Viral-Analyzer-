"use client";

import React, { useState } from 'react';
import { Water, Zap, Droplets, Share2, Copy, Search, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetUrl: url }),
      });

      if (!response.ok) throw new Error('分析失败，请检查链接或稍后再试');

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || '发生错误');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-20">
      {/* 装饰性背景 */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-sky-500/10 to-transparent pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-6 pt-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-sky-500/20 border border-sky-500/30 mb-6 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
            <Water className="text-sky-400 w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            GeaTalent <span className="text-sky-500">X-Analyzer</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto italic">
            "不要做一滩平庸的死水，要做一颗击穿心智的水滴。"
          </p>
        </div>

        {/* Input Area */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col md:flex-row gap-3 p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-slate-500 mr-3 w-5 h-5" />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="粘贴 X (Twitter) 贴文链接..."
                  className="w-full bg-transparent py-4 outline-none text-white placeholder-slate-600"
                />
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={loading || !url}
                className="bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5" />}
                {loading ? "正在脱水炼金..." : "分析爆款基因"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-center mt-4 text-sm">⚠️ {error}</p>}
        </div>

        {/* Result Area */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Left Column: Metrics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 text-center shadow-xl">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">水滴指数 / WDI</h3>
                <div className="relative inline-flex mb-6">
                  <div className="w-32 h-40 bg-gradient-to-b from-sky-400 to-sky-600 rounded-t-full rounded-b-[60%] flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(14,165,233,0.4)]">
                    <span className="text-5xl font-black text-white">{result.score || 0}</span>
                  </div>
                </div>
                <p className="text-sky-400 font-bold text-xl mb-8">
                  {result.score > 80 ? "认知穿透力极强" : "内容仍需脱水"}
                </p>
                
                <div className="space-y-6 text-left">
                  <MetricBar label="穿透力 (Penetration)" value={result.penetration} icon={<Zap size={14}/>} color="bg-sky-400" />
                  <MetricBar label="脱水率 (Dehydration)" value={result.dehydration} icon={<Droplets size={14}/>} color="bg-emerald-400" />
                  <MetricBar label="涟漪力 (Ripple)" value={result.ripple} icon={<Share2 size={14}/>} color="bg-indigo-400" />
                </div>
              </div>
            </div>

            {/* Right Column: Prompt & Logic */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Copy className="text-sky-500 w-5 h-5" />
                    专属爆款 Prompt 模版
                  </h3>
                  <button 
                    onClick={() => copyToClipboard(result.generated_prompt || result.reverse_prompt)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-sky-400 px-4 py-2 rounded-lg transition"
                  >
                    一键复制
                  </button>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
                  {result.generated_prompt || result.reverse_prompt || "暂无生成的提示词"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="钩子逻辑 (Hook)" content={result.hook_analysis || result.analysis?.hook} />
                <Card title="正文击穿 (Body)" content={result.body_analysis || result.analysis?.body} />
                <Card title="涟漪效应 (CTA)" content={result.cta_analysis || result.analysis?.cta} />
              </div>
            </div>

          </div>
        )}
      </main>

      <footer className="text-center mt-20 text-slate-600 text-sm">
        <p>© 2024 GeaTalent.uk | 专注社交媒体内容架构</p>
      </footer>
    </div>
  );
}

// 辅助组件：仪表盘进度条
function MetricBar({ label, value, icon, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400 flex items-center gap-1">{icon} {label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// 辅助组件：卡片
function Card({ title, content }: any) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
      <h4 className="text-sky-500 text-xs font-bold uppercase mb-2 tracking-tighter">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed italic">"{content || '正在分析...'}"</p>
    </div>
  );
}
