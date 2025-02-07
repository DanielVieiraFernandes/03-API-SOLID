import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repositorie";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {

    public users: User[] = [];

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(item => item.id === id)

        if (user) {
            return user;
        }

        return null;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            created_at: new Date(),
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
        }

        this.users.push(user)

        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find(item => item.email === email)

        if (user) {
            return user;
        }

        return null;
    }
}