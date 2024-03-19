import { followUser, unFollowUser } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const body = await req.json();
    const { id: targetId, follow } = body;

    if (!targetId || follow === undefined) {
      return new Response('Bad Reqeust', { status: 400 });
    }

    const request = follow ? followUser : unFollowUser;

    return request(user.id, targetId).then((res) => NextResponse.json(res));
  });
}
