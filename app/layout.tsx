import type { ReactNode } from 'react'
import './globals.css'
import 'nextra-theme-docs/style.css'
import type { Metadata, Viewport } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

export const metadata: Metadata = {
  title: 'Md. Fahim Karim | ML Engineer & Developer',
  description: 'Md. Fahim Karim - Machine Learning Engineer, Full-Stack Developer, HCI Researcher',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d4d4d8',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/fahimkarim01/portfolio"
          search={false}
          editLink={false}
          feedback={{ content: null }}
          darkMode={true}
          navigation={true}
          navbar={
            <Navbar
              logo={<span style={{ fontWeight: 800, fontSize: '18px' }}>Md. Fahim Karim</span>}
              projectLink="https://github.com/fahimkarim01"
            />
          }
          footer={
            <Footer>
              <span>© 2026 Md. Fahim Karim</span>
            </Footer>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
