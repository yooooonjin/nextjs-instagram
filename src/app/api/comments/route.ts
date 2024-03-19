import { addComment } from '@/service/posts';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return withSessionUser(async (user) => {
    const body = await request.json();
    const { postId, comment } = body;

    if (!postId || !comment) {
      return new Response('Bad Reqeust', { status: 400 });
    }

    return addComment(postId, user.id, comment).then((res) =>
      NextResponse.json(res)
    );
  });
}
