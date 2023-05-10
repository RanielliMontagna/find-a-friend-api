import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgRepository: InMemoryOrgsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const org = await orgRepository.create({
      id: 'org-id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      address: 'any_address',
      cep: 'any_cep',
    })

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        description: 'any_description',
        type: 'any_type',
        age: 1,
        photo: 'any_photo',
        city: 'Paraí',
        orgId: org.id,
      })
    }

    const { pets } = await sut.execute({ city: 'Paraí' })

    expect(pets).toHaveLength(10)
    expect(pets[0].name).toBe('Pet 0')
    expect(pets[9].name).toBe('Pet 9')
  })
})
