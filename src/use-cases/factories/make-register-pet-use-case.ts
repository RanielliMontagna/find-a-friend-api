import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../pets/register-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterPetUseCase() {
  const petResository = new PrismaPetsRepository()
  const orgRepository = new PrismaOrgsRepository()

  const useCase = new RegisterPetUseCase(petResository, orgRepository)

  return useCase
}
