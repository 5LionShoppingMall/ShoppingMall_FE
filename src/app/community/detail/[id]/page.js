import PostDetail from '@/components/community/PostDetail';

export const metadata = {
  title: 'Post',
};

export default async function CommunityDetail(props) {
  console.log('props');
  console.log(props);
  const postId = props.params.id;
  console.log(props.params.id);
  return <PostDetail postId={postId} />;
}
