import { Container, Text, Title } from '@mantine/core';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Post } from '~/utils/types/Post';

type Props = {
  post: Post;
};

const DynamicPostItemRawData = dynamic(() => import('./postItemRawData'), {
  ssr: false,
});

const PostItem: FC<Props> = ({ post }) => {
  return (
    <Container mt="xl">
      <Title mb="sm" order={1}>
        {post.title}
      </Title>
      <Text fs="ita">Created {post.createdAt.toLocaleDateString('en-us')}</Text>
      <Text>{post.text}</Text>

      <Title mt="md" mb="sm" order={2}>
        Raw data:
      </Title>
      <DynamicPostItemRawData post={post} />
    </Container>
  );
};

export default PostItem;
