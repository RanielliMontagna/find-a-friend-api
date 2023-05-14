import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { FindPetParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findPet({ city, name, description, age, type }: FindPetParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        name,
        description,
        age,
        type,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        description: data.description,
        age: data.age,
        city: data.city,
        photo: data.photo,
        type: data.type,
        orgId: data.orgId,
        createdAt: new Date(),
      },
    })

    return pet
  }
}
