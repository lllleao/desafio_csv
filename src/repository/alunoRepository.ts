import prisma from '@src/prisma'
import type { AlunoRepository } from './alunoInterface'
import type { Curso } from '../../prisma/generated/client'
import type { AlunosData } from '@src/interfaces'

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
    async createAlunos(alunosData: AlunosData): Promise<any | null> {
        const alunos = await prisma.aluno.createMany({
            data: [
                alunosData
            ]
        })

        return alunos
    }
}
