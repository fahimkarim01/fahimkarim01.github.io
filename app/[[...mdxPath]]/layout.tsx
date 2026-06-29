import type { ReactNode } from 'react'
import { Layout as NextraLayout, Navbar, Footer } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'

const PAGE_ORDER = ['index', 'research', 'projects', 'achievements', 'skills', 'contact']

// Keep the MDX route on-demand so Vercel does not prerender every slug at build time.
export const dynamic = 'force-dynamic'
export const revalidate = false

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

export default async function Layout({ children }: { children: ReactNode }) {
  const pageMap = orderPageMap(await getPageMap())

  return (
    <NextraLayout
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
    </NextraLayout>
  )
}
