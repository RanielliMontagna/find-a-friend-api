import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  findPetByCity(city: string): Promise<Pet[]>
}
