import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { allWhitepapers } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const isProduction = process.env.NODE_ENV === 'production'

const whitepapers = allWhitepapers
  .filter((paper) => !isProduction || paper.draft !== true)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const metadata = genPageMetadata({ title: 'Career Reports' })

export default function WhitepapersPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-4 pb-8 pt-6">
        <PageTitle>Career Reports</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          반기별 성장과 성과를 기록한 커리어 리포트입니다.
        </p>
      </div>
      <div className="space-y-10 pt-10">
        {whitepapers.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">작성된 커리어 리포트가 없습니다.</p>
        )}
        {whitepapers.map((paper) => (
          <article key={paper.slug} className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={paper.date}>
                {new Date(paper.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {paper.period && <span>· {paper.period}</span>}
              {paper.department && <span>· {paper.department}</span>}
              {paper.role && <span>· {paper.role}</span>}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              <Link href={`/whitepapers/${paper.slug}`}>{paper.title}</Link>
            </h2>
            {paper.summary && (
              <p className="text-base text-gray-600 dark:text-gray-300">{paper.summary}</p>
            )}
            {paper.techStack && paper.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 text-sm text-gray-600 dark:text-gray-300">
                {paper.techStack.map((item) => (
                  <span key={item} className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                    {item}
                  </span>
                ))}
              </div>
            )}
            <div>
              <Link
                href={`/whitepapers/${paper.slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                자세히 보기 &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
