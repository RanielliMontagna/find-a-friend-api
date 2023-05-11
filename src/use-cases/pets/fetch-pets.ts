import { Pet } from '@prisma/client'
import {
  FindPetByCityParams,
  PetsRepository,
} from '@/repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest extends FindPetByCityParams {}
interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    params: FetchPetsByCityUseCaseRequest,
  ): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findPetByCity(params)

    return { pets }
  }
}
