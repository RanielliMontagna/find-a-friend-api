import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets'
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

  const orgData = {
    id: 'org-id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    phone: 'any_phone',
    address: 'any_address',
    cep: 'any_cep',
  }

  it('should be able to fetch pets by city', async () => {
    const org = await orgRepository.create(orgData)

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

  it('should be able to fetch pets by city and age', async () => {
    const org = await orgRepository.create(orgData)

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        description: 'any_description',
        type: 'any_type',
        age: i,
        photo: 'any_photo',
        city: 'Paraí',
        orgId: org.id,
      })
    }

    const { pets } = await sut.execute({ city: 'Paraí', age: 5 })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Pet 5')
  })

  it('should be able to fetch pets by city and type', async () => {
    const org = await orgRepository.create(orgData)

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        description: 'any_description',
        type: `type_${i % 2}`,
        age: 1,
        photo: 'any_photo',
        city: 'Paraí',
        orgId: org.id,
      })
    }

    const { pets } = await sut.execute({ city: 'Paraí', type: 'type_1' })

    expect(pets).toHaveLength(5)
    expect(pets[0].name).toBe('Pet 1')
  })

  it('should be able to fetch pets by city and name', async () => {
    const org = await orgRepository.create(orgData)

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

    const { pets } = await sut.execute({ city: 'Paraí', name: 'Pet 5' })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Pet 5')
  })

  it('should be able to fetch pets by city and description', async () => {
    const org = await orgRepository.create(orgData)

    for (let i = 0; i < 10; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        description: `any_description_${i}`,
        type: 'any_type',
        age: 1,
        photo: 'any_photo',
        city: 'Paraí',
        orgId: org.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Paraí',
      description: 'any_description_5',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Pet 5')
  })
})
