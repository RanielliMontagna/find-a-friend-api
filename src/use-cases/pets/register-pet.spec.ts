import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgNotFoundError } from '../errors/org-not-found'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a new pet', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      address: 'any_address',
      cep: 'any_cep',
      phone: 'any_phone',
    })

    const { pet } = await sut.execute({
      name: 'any_name',
      description: 'any_description',
      type: 'any_type',
      city: 'any_city',
      age: 1,
      photo: 'any_photo',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new pet with a non-existing org', async () => {
    const promise = sut.execute({
      name: 'any_name',
      description: 'any_description',
      type: 'any_type',
      city: 'any_city',
      age: 1,
      photo: 'any_photo',
      orgId: 'org-01',
    })

    await expect(promise).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
