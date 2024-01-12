import { usePopularPosts, useRecentPosts } from '@/hooks/usePosts';
import ErrorMessage from '../error/ErrorMessage';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import BestPosts from './BestPosts';
import NewestPosts from './NewestPosts';

export default function MainPosts() {
  const {
    posts: best,
    isLoading: isBestLoading,
    isFetching: isBestFetching,
    isError: isBestError,
  } = usePopularPosts(1, 5);

  const {
    posts: newest,
    isLoading: isNewestLoading,
    isFetching: isNewestFetching,
    isError: isNewestError,
  } = useRecentPosts(1, 5);

  if (isBestLoading || isBestFetching || isNewestLoading || isNewestFetching) {
    return (
      <div className='w-full min-h-[400px] flex justify-center items-center mt-24'>
        <LoadingSpinnerCircle />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-5'>
      <div className='flex flex-col gap-2 h-full mt-10 sm:mt-24 w-full sm:w-1/2'>
        <h1 className='text-2xl sm:text-3xl font-bold'># 인기 게시글 ✨ </h1>
        <BestPosts bestPosts={best.objData?.content} />
      </div>
      <div className='flex flex-col gap-2 h-full mt-10 sm:mt-24 w-full sm:w-1/2'>
        <h1 className='text-2xl sm:text-3xl font-bold'># 최신 게시글 </h1>
        <NewestPosts newestPosts={newest.objData} />
      </div>
    </div>
  );
}
