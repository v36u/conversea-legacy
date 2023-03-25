import { DefaultSession } from 'next-auth';

/* -------------------------------------------------------------------------- */
/*           See https://next-auth.js.org/getting-started/typescript          */
/* -------------------------------------------------------------------------- */

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
  interface User {
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
  }
}
