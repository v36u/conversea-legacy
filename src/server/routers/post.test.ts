/**
 * Integration test example for the `post` router
 */
import { test, expect } from '@playwright/test';
import { createContextInner } from '../context';
import { AppRouter, appRouter } from './_app';
import { inferProcedureInput } from '@trpc/server';

test('add and get post', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter['post']['add']> = {
    text: 'hello test',
    title: 'hello test',
  };

  const post = await caller.post.add(input);
  const byId = await caller.post.byId({ id: post.id });

  expect(byId).toMatchObject(input);
});
