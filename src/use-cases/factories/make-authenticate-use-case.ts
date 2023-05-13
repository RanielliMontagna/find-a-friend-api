import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '../orgs/authenticate'

export function makeOrgAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
