import { FastifyInstance } from 'fastify'

import { register } from './register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)

  /** Authenticated */
  // TODO - implementar rota /orgs/me
}
