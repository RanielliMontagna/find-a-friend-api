import { Prisma, Pet } from '@prisma/client'

export interface FindPetParams {
  city: string
  name?: string
  description?: string
  age?: number
  type?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  findPet(params: FindPetParams): Promise<Pet[]>
}
