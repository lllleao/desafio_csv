import type { AlunosData } from "@src/interfaces"
import prisma from "@src/prisma"
import { AlunoDataRepository } from "@src/repository/alunoRepository"

const alunoRepo = new AlunoDataRepository()

export const emailExists = async (alunosData: AlunosData[]) => {
    const emails = alunosData.map(a => a.email)

    const existentes = await prisma.aluno.findMany({
        where: {
            email: { in: emails }
        },
        select: { email: true }
    })

    if (existentes.length > 0) {
        throw new Error(`Algum email já existe`)
    }

}

export const cursoExists = async (alunosData: AlunosData[]) => {
    const curso_id = alunosData.map(a => Number(a.curso_id))

    const existentes = await prisma.curso.findMany({
        where: {
            id: { in: curso_id }
        },
        select: { id: true }
    })

    if (!Boolean(existentes)) {
        throw new Error('Algum curso não existe')
    }

    return true
}
