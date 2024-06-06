import { comments } from './data'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const filterComments = query
    ? comments.filter((comment) => comment?.text?.includes(query))
    : comments
  return Response.json(filterComments)
}

export async function POST(request: Request) {
  const comment = await request.json()
  const newCommentObj = {
    id: comments?.length + 1,
    text: comment.text,
  }
  comments.push(newCommentObj)
  return new Response(JSON.stringify(newCommentObj), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
