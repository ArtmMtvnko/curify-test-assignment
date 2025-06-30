import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await connectToDatabase();

  const body = await request.json();
  const user = await User.create(body);
  return NextResponse.json(user, { status: 201 });
}
