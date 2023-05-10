import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { PetNotFoundError } from '../errors/pet-not-found'

let petsRepository: InMemoryPetsRepository
let orgRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgRepository = new InMemoryOrgsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const org = await orgRepository.create({
      id: 'org-id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      address: 'any_address',
      cep: 'any_cep',
    })

    await petsRepository.create({
      id: 'pet-01',
      name: 'any_name',
      description: 'any_description',
      type: 'any_type',
      age: 1,
      photo: 'any_photo',
      city: 'Paraí',
      orgId: org.id,
    })

    const { pet } = await sut.execute({ petId: 'pet-01' })

    console.log(pet)

    expect(pet.name).toBe('any_name')
  })

  it('should not be able to get pet details if pet does not exists', async () => {
    await expect(sut.execute({ petId: 'invalid-id' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
