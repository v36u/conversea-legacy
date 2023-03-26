import NextAuth from 'next-auth';
import { nextAuthOptions } from '~/utils/auth/authOptions';

export default NextAuth(nextAuthOptions);
