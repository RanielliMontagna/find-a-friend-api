import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgNotFoundError } from '@/use-cases/errors/org-not-found'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    age: z.number().min(1).max(100),
    city: z.string(),
    photo: z.string(),
    description: z.string(),
    type: z.string(),
    orgId: z.string(),
  })

  const { name, age, city, photo, description, type, orgId, id } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterPetUseCase()

    await registerUseCase.execute({
      id,
      name,
      age,
      city,
      photo,
      description,
      type,
      orgId,
    })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
