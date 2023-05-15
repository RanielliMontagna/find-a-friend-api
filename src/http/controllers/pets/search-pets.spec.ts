import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pets', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    // # Register ten pets
    for (let i = 0; i < 10; i++) {
      await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `any_name_${i}`,
          description: 'any_description',
          type: i % 2 === 0 ? 'dog' : 'cat',
          city: 'any_city',
          age: 1,
          photo: 'any_photo',
          orgId: 'org-01',
        })
    }

    // # Search for pets in any_city
    const response = await request(app.server).get('/pets/search?city=any_city')

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(10)
  })
})
