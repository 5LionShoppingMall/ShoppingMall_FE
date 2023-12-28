import PostDetail from '@/components/community/PostDetail';

export const metadata = {
  title: 'Post',
};

export default async function CommunityDetail(props) {
  // props : { params: { id: '16' }, searchParams: {} }

  const postId = props.params.id; // 16
  return <PostDetail postId={postId} />;
}
