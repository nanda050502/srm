import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_TTL_SECONDS, UserRole } from '@/lib/auth-session';

interface LoginBody {
  netId?: string;
  password?: string;
}

const STUDENT_PASSWORD = process.env.STUDENT_PASSWORD ?? 'password123';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123';

export async function POST(request: NextRequest) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const rawNetId = (body.netId ?? '').trim().toLowerCase();
  const netId = rawNetId.includes('@') ? rawNetId.split('@')[0] : rawNetId;
  const password = body.password ?? '';

  const expected: Record<UserRole, { netId: string; password: string }> = {
    student: { netId: 'student', password: STUDENT_PASSWORD },
    admin: { netId: 'admin', password: ADMIN_PASSWORD },
  };

  const role: UserRole | null = netId === expected.admin.netId ? 'admin' : netId === expected.student.netId ? 'student' : null;

  if (!role || password !== expected[role].password) {
    return NextResponse.json({ error: 'Invalid NetID or password.' }, { status: 401 });
  }

  const email = `${netId}@srmist.edu.in`;
  const token = await createSessionToken(email, role);

  const response = NextResponse.json({ authenticated: true, role, email });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });

  return response;
}
