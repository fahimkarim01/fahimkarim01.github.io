import type { ReactNode } from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'

export default async function MainLayout({ children }: { children: ReactNode }) {
  let pageMap
  try {
    pageMap = await getPageMap()
  } catch (error) {
    console.error('[nextra] getPageMap failed in main layout', error)
    throw error
  }

  return (
    <Layout
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/fahimkarim01/portfolio"
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
  )
}
