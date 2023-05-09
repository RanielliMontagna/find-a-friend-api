import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
      address: 'any_address',
      cep: 'any_cep',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      phone: 'any_phone',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new org with an email that is already in use', async () => {
    const data = {
      address: 'any_address',
      cep: 'any_cep',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      phone: 'any_phone',
    }

    await sut.execute(data)
    await expect(sut.execute(data)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })
})
