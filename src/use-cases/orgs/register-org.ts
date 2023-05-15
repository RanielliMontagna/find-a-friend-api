import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  id?: string
  name: string
  email: string
  phone: string
  password: string

  address: string
  cep: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: RegisterOrgUseCaseRequest,
  ): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(data.password, 8)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      id: data.id,
      email: data.email,
      name: data.name,
      password: password_hash,
      phone: data.phone,

      address: data.address,
      cep: data.cep,
    })

    return { org }
  }
}
