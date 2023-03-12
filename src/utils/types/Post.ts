import { RouterOutput } from '../trpc';

export type Post = RouterOutput['posts']['byId'];
