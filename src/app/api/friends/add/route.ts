import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { addFriendValidator } from '@/lib/validations/add-friend'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email: emailToAdd } = addFriendValidator.parse(body.email)

    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string

    if (!idToAdd) {
      return new Response('This person does not exist.', { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as a friend', {
        status: 400,
      })
    }

    // Verificação de amizade.
    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1

    if (isAlreadyAdded) {
      return new Response('Você já tem esse usuário como amigo.', {
        status: 400,
      })
    }

    // Verificação de amizade.
    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1

    if (isAlreadyFriends) {
      return new Response('Você já tem esse usuário como amigo.', {
        status: 400,
      })
    }

    // Validação

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

    return new Response('Ok')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Requisição inválida', { status: 422 })
    }

    return new Response('Requisição inválida', { status: 400 })
  }
}