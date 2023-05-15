import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    age: z.number().optional(),
    type: z.string().optional(),
  })

  const { city, age, description, name, type } = searchPetsQuerySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    description,
    name,
    type,
  })

  return reply.status(200).send({
    pets,
  })
}
