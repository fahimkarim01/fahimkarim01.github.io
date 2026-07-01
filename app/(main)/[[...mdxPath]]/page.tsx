import type { Metadata } from 'next'
import { importPage, generateStaticParamsFor } from 'nextra/pages'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

type PageProps = {
  params: Promise<{
    mdxPath?: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath } = await params
  const { metadata } = await importPage(mdxPath)
  return metadata ?? {}
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const { mdxPath } = params
  const { default: MDXContent } = await importPage(mdxPath)
  return <MDXContent {...props} params={params} />
}
