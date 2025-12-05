import type { AlunosData } from "@src/interfaces"
import prisma from "@src/prisma"
import { AlunoDataRepository } from "@src/repository/alunoRepository"

const alunoRepo = new AlunoDataRepository()

export const emailExists = async (alunosData: AlunosData[]) => {
    for (let aluno of alunosData) {
        const alunoByEmail = await alunoRepo.findByEmail(aluno.email)
        if (alunoByEmail) throw new Error('Email já existe no banco')
    }

}
