import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      id: 'org-01',
      name: 'Org 01',
      email: 'org@teste.com',
      password: await hash('a1s2d3', 8),
      cep: '95360000',
      address: 'Linha Teste - 0000',
      phone: '54999790871',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@teste.com',
    password: 'a1s2d3',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
