// 结果区域
{result && (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 animate-in fade-in duration-700">
    
    {/* 左侧：水滴指数仪表盘 */}
    <div className="lg:col-span-4 bg-slate-800/50 rounded-3xl p-8 border border-sky-500/20">
      <div className="relative w-32 h-40 mx-auto bg-sky-500/20 rounded-t-full rounded-b-[60%] flex flex-col items-center justify-center border-2 border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
        <span className="text-4xl font-black text-white">{result.score}</span>
        <span className="text-xs text-sky-300 font-bold tracking-tighter">WATER DROP</span>
      </div>
      
      <div className="mt-8 space-y-6 text-left">
        <ScoreBar label="穿透力" value={result.penetration} color="bg-sky-400" />
        <ScoreBar label="脱水率" value={result.dehydration} color="bg-emerald-400" />
        <ScoreBar label="涟漪力" value={result.ripple} color="bg-indigo-400" />
      </div>
    </div>

    {/* 右侧：分析详情与 Prompt */}
    <div className="lg:col-span-8 space-y-6 text-left">
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-700">
        <h4 className="text-sky-400 font-bold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-ping"></span>
          逆向工程 Prompt
        </h4>
        <div className="bg-black/50 p-4 rounded-xl font-mono text-sm text-slate-300 relative group">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(result.reverse_prompt);
              alert("已复制到剪贴板");
            }}
            className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition bg-sky-500 text-white px-2 py-1 rounded text-xs"
          >
            复制
          </button>
          {result.reverse_prompt}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
         <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700">
            <div className="text-xs text-slate-500 mb-1 font-bold">尖端分析</div>
            <div className="text-sm text-slate-300 italic">"{result.analysis.hook}"</div>
         </div>
         {/* 同样方式展示 body 和 cta */}
      </div>
    </div>
  </div>
)}

// 进度条组件
function ScoreBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
