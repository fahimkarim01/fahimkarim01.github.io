import type { Metadata } from 'next'
import { importPage, generateStaticParamsFor } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

type PageProps = {
  params: Promise<{
    mdxPath?: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath } = await params
  try {
    const { metadata } = await importPage(mdxPath)
    return metadata
  } catch (error) {
    console.error('[nextra] generateMetadata importPage failed', { mdxPath, error })
    throw error
  }
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const { mdxPath } = params
  let page

  try {
    page = await importPage(mdxPath)
  } catch (error) {
    console.error('[nextra] Page importPage failed', { mdxPath, error })
    throw error
  }

  const { default: MDXContent, ...wrapperProps } = page
  const Wrapper = getMDXComponents().wrapper

  if (!Wrapper) {
    return <MDXContent {...props} params={params} />
  }

  return (
    <Wrapper {...wrapperProps}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
