import { FastifyInstance } from 'fastify'

import { registerOrg } from './register-org'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
