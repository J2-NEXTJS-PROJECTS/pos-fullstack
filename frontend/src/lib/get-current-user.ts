import { cookies } from 'next/headers';

export interface CurrentUser {
  id: number;
  email: string;
  role: 'ADMIN' | 'CLIENT';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}
