import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../pets/fetch-pets'

export function makeSearchPetsUseCase() {
  const petResository = new PrismaPetsRepository()

  const useCase = new FetchPetsUseCase(petResository)

  return useCase
}
