import './globals.css'
import 'nextra-theme-docs/style.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Md. Fahim Karim | ML Engineer & Developer',
  description: 'Md. Fahim Karim - Machine Learning Engineer, Full-Stack Developer, HCI Researcher',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d4d4d8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
