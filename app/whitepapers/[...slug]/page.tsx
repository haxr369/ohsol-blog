import { Metadata } from 'next'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allWhitepapers } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import WhitepaperLayout from '@/layouts/WhitepaperLayout'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const sortWhitepapers = () =>
  allWhitepapers
    .filter((paper) => !isProduction || paper.draft !== true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const generateStaticParams = async () => {
  return allWhitepapers.map((paper) => ({ slug: paper.slug.split('/') }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const paper = allWhitepapers.find((item) => item.slug === slug)

  if (!paper) {
    return
  }

  const summary = paper.summary || `Career report for ${paper.period || paper.title}`
  const imageList = paper.heroImage
    ? typeof paper.heroImage === 'string'
      ? [paper.heroImage]
      : paper.heroImage
    : [siteMetadata.socialBanner]

  return {
    title: paper.title,
    description: summary,
    openGraph: {
      title: paper.title,
      description: summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(paper.date).toISOString(),
      modifiedTime: new Date(paper.lastmod || paper.date).toISOString(),
      images: imageList.map((img) => ({
        url: img.includes('http') ? img : `${siteMetadata.siteUrl}${img}`,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description: summary,
      images: imageList,
    },
  }
}

export default async function WhitepaperPage({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const whitepapers = sortWhitepapers()
  const currentIndex = whitepapers.findIndex((paper) => paper.slug === slug)

  if (currentIndex === -1) {
    return (
      <div className="mt-24 text-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">Career report 준비 중입니다.</p>
      </div>
    )
  }

  const paper = whitepapers[currentIndex]
  const prev = whitepapers[currentIndex + 1]
  const next = whitepapers[currentIndex - 1]
  const mainContent = coreContent(paper)

  return (
    <WhitepaperLayout content={mainContent} prev={prev} next={next}>
      <MDXLayoutRenderer code={paper.body.code} components={components} toc={paper.toc} />
    </WhitepaperLayout>
  )
}
