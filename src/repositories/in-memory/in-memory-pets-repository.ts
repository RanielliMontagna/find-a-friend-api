import { PetsRepository } from '@/repositories/pets-repository'
import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      city: data.city,
      age: data.age,
      photo: data.photo,
      orgId: data.orgId || null,
    }

    this.pets.push(pet)

    return pet
  }

  async findPetByCity(city: string) {
    const pets = this.pets.filter((pet) => pet.city === city)

    return pets
  }

  async findPetById(petId: string) {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
