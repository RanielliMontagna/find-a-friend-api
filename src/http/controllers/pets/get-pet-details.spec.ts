import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    // # Register ten pets
    for (let i = 0; i < 10; i++) {
      await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: `any_id_${i}`,
          name: `any_name_${i}`,
          description: 'any_description',
          type: i % 2 === 0 ? 'dog' : 'cat',
          city: 'any_city',
          age: 1,
          photo: 'any_photo',
          orgId: 'org-01',
        })
    }

    // # Get pet 5 details
    const response = await request(app.server).get(`/pets/any_id_5`)

    expect(response.status).toBe(200)
    expect(response.body.pet).toMatchObject({
      id: 'any_id_5',
      name: 'any_name_5',
      description: 'any_description',
      type: 'cat',
      city: 'any_city',
      age: 1,
      photo: 'any_photo',
      orgId: 'org-01',
    })
  })
})
