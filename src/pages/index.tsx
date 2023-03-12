import {
  Button,
  Container,
  Divider,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { inferProcedureInput } from '@trpc/server';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import type { AppRouter } from '~/server/routers/_app';
import { trpc } from '../utils/trpc';

const IndexPage: FC = () => {
  const utils = trpc.useContext();
  const postsQuery = trpc.posts.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  const addPost = trpc.posts.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.posts.list.invalidate();
    },
  });

  return (
    <Container mt="xl">
      <Title order={1} mb="sm">
        Welcome to Conversea!
      </Title>
      <Text>
        Enim sint dolore ullamco ullamco aute. Nostrud consequat officia tempor
        magna. Culpa consequat cillum adipisicing ad minim tempor do id
        consectetur excepteur eiusmod irure. Culpa nulla consectetur mollit duis
        sunt ipsum et nostrud et reprehenderit voluptate veniam in. Amet culpa
        Lorem adipisicing duis dolor sint ad sunt culpa officia irure proident.
        Quis do nulla mollit sunt deserunt dolor incididunt pariatur aute
        excepteur id. Ipsum aute nostrud laboris do.
      </Text>

      <Title order={2} mt="md" mb="sm">
        Latest Posts
        {postsQuery.status === 'loading' && '(loading)'}
      </Title>
      <Button
        onClick={() => postsQuery.fetchPreviousPage()}
        disabled={
          !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage
        }
      >
        {postsQuery.isFetchingPreviousPage
          ? 'Loading more...'
          : postsQuery.hasPreviousPage
          ? 'Load More'
          : 'Nothing more to load'}
      </Button>

      {postsQuery.data?.pages.map((page, index) => (
        <Fragment key={page.items[0]?.id || index}>
          {page.items.map((item) => (
            <article key={item.id}>
              <Title order={3} mt="sm" mb="xs">
                {item.title}
              </Title>
              <Link href={`/post/${item.id}`}>
                <Button color="white">View more</Button>
              </Link>
            </article>
          ))}
        </Fragment>
      ))}

      <Divider my="md" />

      <Title order={3} mb="sm">
        Add a Post
      </Title>
      <form
        onSubmit={async (e) => {
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @see https://react-hook-form.com/
           * @see https://kitchen-sink.trpc.io/react-hook-form
           */
          e.preventDefault();
          const $form = e.currentTarget;
          const values = Object.fromEntries(new FormData($form));
          type Input = inferProcedureInput<AppRouter['posts']['add']>;
          const input: Input = {
            title: values.title as string,
            text: values.text as string,
          };
          try {
            await addPost.mutateAsync(input);

            $form.reset();
          } catch (cause) {
            console.error({ cause }, 'Failed to add post');
          }
        }}
      >
        <br />
        <TextInput
          label="Title:"
          id="title"
          name="title"
          type="text"
          disabled={addPost.isLoading}
          mt="sm"
        />

        <Textarea
          label="Text:"
          id="text"
          name="text"
          disabled={addPost.isLoading}
          mt="sm"
        />
        <Button type="submit" disabled={addPost.isLoading} mt="md" mb="sm">
          Submit
        </Button>
        {addPost.error && <Text color="red">{addPost.error.message}</Text>}
      </form>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
