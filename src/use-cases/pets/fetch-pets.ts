import { Pet } from '@prisma/client'
import { FindPetParams, PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsUseCaseRequest extends FindPetParams {}
interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    params: FetchPetsUseCaseRequest,
  ): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findPet(params)

    return { pets }
  }
}
