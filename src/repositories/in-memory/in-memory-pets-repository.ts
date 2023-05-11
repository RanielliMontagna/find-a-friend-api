import {
  FindPetByCityParams,
  PetsRepository,
} from '@/repositories/pets-repository'
import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id || randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      age: data.age,
      photo: data.photo,
      city: data.city,
      orgId: data.orgId,
      createdAt: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  async findPetById(petId: string) {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async findPetByCity({
    city,
    age,
    description,
    name,
    type,
  }: FindPetByCityParams) {
    let pets = this.pets.filter((pet) => pet.city === city)

    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }

    if (description) {
      pets = pets.filter((pet) => pet.description === description)
    }

    if (name) {
      pets = pets.filter((pet) => pet.name === name)
    }

    if (type) {
      pets = pets.filter((pet) => pet.type === type)
    }

    return pets
  }
}
