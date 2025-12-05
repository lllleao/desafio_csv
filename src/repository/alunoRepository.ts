import prisma from '@src/prisma'
import type { AlunoRepository } from './alunoInterface'

export class AlunoDataRepository implements AlunoRepository {
    async findByEmail(email: string) {
        const aluno = await prisma.aluno.findFirst({
            where: {
                email
            }
        })
        return aluno
    }
}
