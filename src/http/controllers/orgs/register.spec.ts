import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org 01',
      email: 'org@teste.com',
      password: 'a1s2d3',
      cep: '95360000',
      address: 'Linha Teste - 0000',
      phone: '54999790871',
    })

    expect(response.statusCode).toEqual(201)
  })
})
