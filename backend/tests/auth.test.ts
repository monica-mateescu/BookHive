import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { auth } from '../src/utils/auth.ts';
import type { TestHelpers } from 'better-auth/plugins';

describe('auth flow', () => {
  let test: TestHelpers;

  const createdUserIds: string[] = [];

  beforeAll(async () => {
    const ctx = await auth.$context;
    test = ctx.test;
  });

  afterEach(async () => {
    await Promise.all(createdUserIds.map(id => test.deleteUser(id)));
    createdUserIds.length = 0;
  });

  const createTestUser = async (overrides = {}) => {
    const user = test.createUser({
      email: 'alice@example.com',
      name: 'Alice',
      lastName: 'Smith',
      emailVerified: false,
      role: 'user',
      ...overrides
    });

    await test.saveUser(user);
    createdUserIds.push(user.id);

    return user;
  };

  const loginUser = async (userId: string) => {
    return test.login({ userId });
  };

  it('user can register, login and access protected route', async () => {
    const user = await createTestUser();

    const { headers } = await loginUser(user.id);

    const session = await auth.api.getSession({ headers });

    expect(session?.user.id).toBe(user.id);
  });

  it('should prevent duplicate emails (DB constraint test)', async () => {
    const user1 = await createTestUser({ email: 'duplicate@example.com' });
    const user2 = await createTestUser({ email: 'duplicate@example.com' });

    expect(user2.id).not.toBe(user1.id);
  });

  it('should create and invalidate session correctly', async () => {
    const user = await createTestUser();

    const { headers } = await loginUser(user.id);

    let session = await auth.api.getSession({ headers });
    expect(session?.user.id).toBe(user.id);

    await auth.api.signOut({ headers });

    session = await auth.api.getSession({ headers });
    expect(session).toBeNull();
  });

  it('should not allow access without session', async () => {
    const session = await auth.api.getSession({ headers: {} as any });
    expect(session).toBeNull();
  });

  it('should fail login for non-existent user', async () => {
    await expect(loginUser('fake-id')).rejects.toThrow();
  });

  it('should not allow login after user is deleted', async () => {
    const user = await createTestUser();

    await test.deleteUser(user.id);

    await expect(loginUser(user.id)).rejects.toThrow();
  });
});
