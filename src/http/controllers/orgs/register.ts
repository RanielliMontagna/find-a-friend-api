import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string().length(8),
    address: z.string(),
    phone: z.string().max(11),
  })

  const { name, email, password, cep, address, phone } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrgUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      phone,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
