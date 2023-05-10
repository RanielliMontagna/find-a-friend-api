import { randomUUID } from 'node:crypto'

import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

export class InMemoryOrgsRepository implements OrgsRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const password_hash = await hash(data.password, 8)

    const org = {
      id: randomUUID(),
      ...data,
      password: password_hash,
      createdAt: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    return org || null
  }

  async findOrgById(orgId: string) {
    const org = this.orgs.find((org) => org.id === orgId)

    return org || null
  }
}
