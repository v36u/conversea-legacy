import { router } from '~/server/trpc';
import { userRegister } from './userRegister';

export const userRouter = router({
  register: userRegister,
});
