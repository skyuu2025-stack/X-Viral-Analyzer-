"use client";

import React from 'react';

// 必须使用 export default 导出
export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>GeaTalent <span style={{ color: '#0ea5e9' }}>X-Analyzer</span></h1>
      <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>水滴法则分析工具正在上线中...</p>
      
      <div style={{ marginTop: '2rem', padding: '2rem', background: '#1e293b', borderRadius: '1rem', border: '1px solid #334155' }}>
        <input 
          type="text" 
          placeholder="粘贴 X 链接..." 
          style={{ padding: '1rem', borderRadius: '0.5rem', border: 'none', width: '300px', marginRight: '1rem' }}
        />
        <button style={{ padding: '1rem 2rem', background: '#0ea5e9', border: 'none', borderRadius: '0.5rem', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          开始分析
        </button>
      </div>
    </div>
  );
}
