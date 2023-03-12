import { Container, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { FC } from 'react';
import { RouterOutput } from '~/utils/trpc';

type Props = {
  post: RouterOutput['posts']['byId'];
};

const PostItem: FC<Props> = ({ post }) => {
  return (
    <Container>
      <Title mb="sm" order={1}>
        {post.title}
      </Title>
      <Text fs="ita">Created {post.createdAt.toLocaleDateString('en-us')}</Text>
      <Text>{post.text}</Text>

      <Title mt="md" mb="sm" order={2}>
        Raw data:
      </Title>
      <Prism language="json">{JSON.stringify(post, null, 2)}</Prism>
    </Container>
  );
};

export default PostItem;
