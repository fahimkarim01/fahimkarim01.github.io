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

const PAGE_ORDER = ['index', 'research', 'projects', 'achievements', 'skills', 'contact']

function orderPageMap(items: any[]): any[] {
  return [...items]
    .map((item) =>
      item && Array.isArray(item.children)
        ? { ...item, children: orderPageMap(item.children) }
        : item,
    )
    .sort((a, b) => {
      const aIndex = PAGE_ORDER.indexOf(a?.name)
      const bIndex = PAGE_ORDER.indexOf(b?.name)

      if (aIndex === -1 && bIndex === -1) {
        return String(a?.name ?? '').localeCompare(String(b?.name ?? ''))
      }

      if (aIndex === -1) return 1
      if (bIndex === -1) return -1

      return aIndex - bIndex
    })
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  let pageMap

  try {
    pageMap = orderPageMap(await getPageMap())
  } catch (error) {
    console.error('[nextra] getPageMap failed in root layout', error)
    throw error
  }

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
