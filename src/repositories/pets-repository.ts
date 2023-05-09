import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetByCity(city: string): Promise<Pet[]>
  findPetById(petId: string): Promise<Pet | null>
}
