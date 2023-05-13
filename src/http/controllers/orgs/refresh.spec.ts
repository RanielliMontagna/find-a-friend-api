import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org 01',
      email: 'org@teste.com',
      password: 'a1s2d3',
      cep: '95360000',
      address: 'Linha Teste - 0000',
      phone: '54999790871',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org@teste.com',
      password: 'a1s2d3',
    })

    const cookies = authResponse.get('set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
