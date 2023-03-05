/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router } from '../trpc';
import { postsAdd } from './procedures/posts/add';
import { postsById } from './procedures/posts/byId';
import { postsList } from './procedures/posts/list';

export const postsRouter = router({
  list: postsList,
  byId: postsById,
  add: postsAdd,
});
