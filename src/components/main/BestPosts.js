import PostsItem from './PostsItem';

export default function BestPosts({ bestPosts }) {
  if (!bestPosts) {
    return (
      <div className='flex justify-center items-center w-full min-h-[400px]'>
        데이터를 찾을 수 없어요.. 🥲
      </div>
    );
  }

  return (
    <div className='w-full min-h-[400px] mt-2 px-2'>
      {bestPosts?.map((post) => (
        <PostsItem key={post.id} post={post} />
      ))}
    </div>
  );
}
