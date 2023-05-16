import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../pets/get-pet-details'

export function makeGetPetsDetailsUseCase() {
  const petResository = new PrismaPetsRepository()

  const useCase = new GetPetDetailsUseCase(petResository)

  return useCase
}
