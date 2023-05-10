import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from '../errors/pet-not-found'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: GetPetDetailsUseCaseRequest,
  ): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findPetById(data.petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
