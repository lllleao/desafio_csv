import prisma from '@src/prisma'
import type { AlunoRepository } from './alunoInterface'
import type { Curso } from '../../prisma/generated/client'

export class AlunoDataRepository implements AlunoRepository {
    async findByEmail(email: string) {
        const aluno = await prisma.aluno.findFirst({
            where: {
                email
            }
        })
        return aluno
    }
    async findCursoById(id: number): Promise<Curso | null> {
        const curso = await prisma.curso.findUnique({
            where: {
                id
            }
        })

        return curso
    }
}
