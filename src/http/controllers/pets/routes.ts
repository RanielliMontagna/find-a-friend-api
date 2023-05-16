import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { registerPet } from './register-pet'
import { searchPets } from './search-pets'
import { getPetDetails } from './get-pet-details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', searchPets)
  app.get('/pets/:id', getPetDetails)

  app.post(
    '/pets',
    { preValidation: [verifyJWT] }, // Middleware to verify JWT
    registerPet,
  )
}
