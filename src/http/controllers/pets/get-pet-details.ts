import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetsDetailsUseCase } from '@/use-cases/factories/make-get-pet-details'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = getPetDetailsQuerySchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetsDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({
    petId: id,
  })

  return reply.status(200).send({ pet })
}
