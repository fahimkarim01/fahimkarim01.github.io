import { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

type PageProps = {
  params: Promise<{
    mdxPath?: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath } = await params
  const { metadata } = await importPage(mdxPath)
  return metadata as Metadata
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const { default: MDXContent, ...wrapperProps } = await importPage(params.mdxPath)
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
