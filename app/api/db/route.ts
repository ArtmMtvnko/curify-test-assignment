import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { Applicant } from '@/shared/types/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();

  return NextResponse.json(await User.find({}), { status: 200 });
}

export async function POST(request: Request) {
  await connectToDatabase();

  const body = await request.json();
  const user: Applicant = await User.create(body);
  return NextResponse.json(user, { status: 201 });
}
