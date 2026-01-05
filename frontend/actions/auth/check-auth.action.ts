// actions/check-auth.ts
'use server';

import { cookies } from 'next/headers';

export async function checkAuth() {
  const cookieStore = await cookies();
  console.log({cookieStore})
  console.log({hasCookie: cookieStore.has('access_token')})
  return cookieStore.has('access_token');
}
