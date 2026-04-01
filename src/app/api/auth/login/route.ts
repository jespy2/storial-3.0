import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase, collections } from '@/lib/db';
import { createSecretToken } from '@/lib/token';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { username, password } = await req.json();

    if (!username || !password)
      return NextResponse.json({ message: 'Username and password required' }, { status: 400 });

    const user = await collections.users?.findOne({ username });
    if (!user) return NextResponse.json({ message: 'Invalid username' }, { status: 400 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ message: 'Invalid password' }, { status: 400 });

    const token = createSecretToken(user._id!.toString());
    const response = NextResponse.json({ success: true, message: 'User logged in!', user });
    response.cookies.set('token', token, {
      httpOnly: true, secure: true, sameSite: 'none',
      maxAge: 60 * 15,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}