import PostModify from '@/components/community/post/PostModify'

export const metadata = {
  title: 'Post Modify',
}

export default async function PostModifyPage(props) {
  const postId = props.params.id
  console.log(postId)
  return (
    <section className='max-w-screen-lg mx-auto h-full'>
      <PostModify postId={postId} />
    </section>
  )
}
