import { Prisma, Pet } from '@prisma/client'

export interface FindPetByCityParams {
  city: string
  name?: string
  description?: string
  age?: number
  type?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  findPetByCity(params: FindPetByCityParams): Promise<Pet[]>
}
