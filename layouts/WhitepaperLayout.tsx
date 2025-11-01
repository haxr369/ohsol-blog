import { ReactNode } from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Whitepaper } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const displayDate = (date: string) =>
  new Date(date).toLocaleDateString(siteMetadata.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

interface LayoutProps {
  content: CoreContent<Whitepaper>
  children: ReactNode
  prev?: { path: string; title: string }
  next?: { path: string; title: string }
}

export default function WhitepaperLayout({ content, prev, next, children }: LayoutProps) {
  const { title, date, summary, period, department, role, techStack = [], filePath, path } = content

  return (
    <SectionContainer>
      <article>
        <header className="space-y-6 pt-6 pb-8 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{displayDate(date)}</time>
            {period && <span className="mx-2">·</span>}
            {period && <span>{period}</span>}
          </div>
          <PageTitle>{title}</PageTitle>
          {summary && <p className="text-lg text-gray-500 dark:text-gray-400">{summary}</p>}
        </header>
        <div className="grid gap-8 pb-12 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
          <aside className="space-y-6 rounded-md border border-gray-200 p-6 text-left dark:border-gray-700">
            <dl className="space-y-4 text-sm">
              {department && (
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">부서</dt>
                  <dd className="text-gray-900 dark:text-gray-100">{department}</dd>
                </div>
              )}
              {role && (
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">역할</dt>
                  <dd className="text-gray-900 dark:text-gray-100">{role}</dd>
                </div>
              )}
              {techStack.length > 0 && (
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">주요 기술 스택</dt>
                  <dd className="flex flex-wrap gap-2 pt-2 text-gray-900 dark:text-gray-100">
                    {techStack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <Link
                href={editUrl(filePath)}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                View on GitHub
              </Link>
              <div>
                <Link
                  href="/whitepapers"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to career reports
                </Link>
              </div>
            </div>
            {(prev || next) && (
              <div className="space-y-4 pt-4 text-sm">
                {prev && prev.path && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Previous
                    </div>
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Next
                    </div>
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </aside>
          <div className="prose max-w-none dark:prose-invert">{children}</div>
        </div>
      </article>
    </SectionContainer>
  )
}
