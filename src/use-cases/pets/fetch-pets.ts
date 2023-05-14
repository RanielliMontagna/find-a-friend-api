import { Pet } from '@prisma/client'
import { FindPetParams, PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest extends FindPetParams {}
interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    params: FetchPetsByCityUseCaseRequest,
  ): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findPet(params)

    return { pets }
  }
}
