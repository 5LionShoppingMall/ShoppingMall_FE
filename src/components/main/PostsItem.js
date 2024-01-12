import dateConverter from '@/util/dateConverter';
import { AiFillHeart } from 'react-icons/ai';
import NewBadge from '../ui/NewBadge';

export default function PostsItem({ post }) {
  return (
    <div className='flex py-3 border-b gap-1 h-full items-center'>
      <div className='flex flex-col w-full gap-1'>
        <div className='flex gap-2'>
          <div>
            <span>{post.user.nickname}</span>
          </div>
          <span>·</span>
          <div>
            <span className='text-sm'>{dateConverter(post.createdAt)}</span>
          </div>
        </div>
        <div className='flex h-full items-center'>
          <div className='flex flex-1 items-center h-full'>
            <span className='min-w-[50px] text-xl font-semibold tracking-wide overflow-ellipsis overflow-hidden line-clamp-2'>
              {post.title}
            </span>
            <NewBadge createdAt={post.createdAt} />
          </div>
        </div>
      </div>
      <div className='relative flex flex-col items-center gap-1'>
        <AiFillHeart className='w-9 h-9 text-rose-500/80 relative' />
        <span className='absolute text-sm text-white font-semibold w-full h-full flex justify-center items-center'>
          {post.likesCount}
        </span>
      </div>
    </div>
  );
}
