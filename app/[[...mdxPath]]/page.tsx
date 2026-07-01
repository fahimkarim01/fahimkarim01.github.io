import type { Metadata } from 'next'
import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

// Opt the MDX catch-all route into runtime rendering.
export const dynamic = 'force-dynamic'
export const revalidate = false

type PageProps = {
  params: Promise<{
    mdxPath?: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath } = await params
  const { metadata } = await importPage(mdxPath)
  return metadata
}

export default async function Page({ params }: PageProps) {
  const { mdxPath } = await params
  const { default: MDXContent, ...wrapperProps } = await importPage(mdxPath)
  const Wrapper = getMDXComponents().wrapper

  if (!Wrapper) {
    return <MDXContent params={params} />
  }

  return (
    <Wrapper {...wrapperProps}>
      <MDXContent params={params} />
    </Wrapper>
  )
}
