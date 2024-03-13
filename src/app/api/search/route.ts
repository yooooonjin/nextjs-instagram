import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

//ssg -> ssr로 변경 (정적인 데이터로 인식)
export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
