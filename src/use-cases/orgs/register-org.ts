import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  address: string
  cep: string
  phone: string
  password: string
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
      address: data.address,
      cep: data.cep,
      email: data.email,
      name: data.name,
      password: password_hash,
      phone: data.phone,
    })

    return { org }
  }
}
