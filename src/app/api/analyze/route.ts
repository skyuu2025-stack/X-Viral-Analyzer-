import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { tweetUrl } = await req.json();

  // 1. TODO: 在这里调用 RapidAPI 抓取 X 内容
  const tweetText = "这里是抓取到的 X 原文内容..."; 

  // 2. 调用 AI 进行水滴法则拆解
  const aiResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { 
          role: "system", 
          content: "你是一位精通水滴法则的内容架构师。请分析 X 贴文并返回 JSON 格式结果，包含 score, penetration, dehydration, ripple, hook_analysis, body_analysis, cta_analysis, generated_prompt。" 
        },
        { role: "user", content: `请拆解这段贴文：${tweetText}` }
      ],
      response_format: { type: 'json_object' }
    })
  });

  const data = await aiResponse.json();
  return NextResponse.json(data);
}
