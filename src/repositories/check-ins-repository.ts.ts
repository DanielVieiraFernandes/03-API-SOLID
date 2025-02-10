import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInsRepository {
    findById(id: string): Promise<CheckIn | null>;
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    save(checkIn: CheckIn): Promise<CheckIn>;
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    countByUserID(userId: string): Promise<number>;
}