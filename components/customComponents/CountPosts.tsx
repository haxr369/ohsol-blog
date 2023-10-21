import { allBlogs, allAuthors } from 'contentlayer/generated'
import Link from 'next/link'

const CountPost = () => {
  return (
    <>
      <Link href={'/blog'}>{`총 ${allBlogs.length} posts`}</Link>
    </>
  )
}

export default CountPost
