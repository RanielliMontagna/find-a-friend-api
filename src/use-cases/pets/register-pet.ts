import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from '../errors/org-not-found'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  type: string
  city: string
  age: number
  photo: string
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    data: RegisterPetUseCaseRequest,
  ): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findOrgById(data.orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name: data.name,
      description: data.description,
      type: data.type,
      city: data.city,
      age: data.age,
      photo: data.photo,
      orgId: data.orgId,
    })

    return { pet }
  }
}
