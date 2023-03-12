import { Prism } from '@mantine/prism';
import { FC } from 'react';
import { Post } from '~/utils/types/Post';

type Props = {
  post: Post;
};

const PostItemRawData: FC<Props> = ({ post }) => {
  return <Prism language="json">{JSON.stringify(post, null, 2)}</Prism>;
};

export default PostItemRawData;
