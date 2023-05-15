import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { registerPet } from './register-pet'

export async function petsRoutes(app: FastifyInstance) {
  // # Authenticated routes
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', registerPet)
}
