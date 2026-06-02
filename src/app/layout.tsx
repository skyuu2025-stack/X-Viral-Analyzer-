import './globals.css'

export const metadata = {
  title: 'GeaTalent X-Analyzer',
  description: '用水滴法则分析爆贴',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
