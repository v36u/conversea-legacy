import NextError from 'next/error';
import { useRouter } from 'next/router';
import { FC } from 'react';
import PostItem from '~/client/components/posts/postItem';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';
import { trpc } from '~/utils/trpc';

const PostViewPage: FC = () => {
  const id = useRouter().query.id as string;
  const postQuery = trpc.posts.byId.useQuery({ id });

  if (postQuery.error) {
    return (
      <NextError
        title={postQuery.error.message}
        statusCode={
          postQuery.error.data?.httpStatus ??
          HttpStatusCode.INTERNAL_SERVER_ERROR
        }
      />
    );
  }

  if (postQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const { data } = postQuery;
  return <PostItem post={data} />;
};

export default PostViewPage;
