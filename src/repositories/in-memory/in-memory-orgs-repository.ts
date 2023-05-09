import { randomUUID } from 'node:crypto'

import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      ...data,
    }

    this.orgs.push(org)
    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)

    return org || null
  }
}
