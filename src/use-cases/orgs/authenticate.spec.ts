import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  const orgData = {
    name: 'Pets Recovery',
    email: 'pets@recovery.com',
    address: '123 Main St',
    cep: '12345123',
    password: '123456',
    phone: '1234567890',
  }

  it('should be able to authenticate an org', async () => {
    const org = await orgsRepository.create(orgData)

    const response = await sut.execute({
      email: 'pets@recovery.com',
      password: '123456',
    })

    expect(response.org).toEqual(org)
  })

  it('should not be able to authenticate an org with wrong email', async () => {
    await orgsRepository.create(orgData)

    await expect(
      sut.execute({
        email: 'pets@rec.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org with wrong password', async () => {
    await orgsRepository.create(orgData)

    await expect(
      sut.execute({
        email: 'pets@recovery.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
