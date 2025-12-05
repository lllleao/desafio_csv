import type { AlunosData } from "@src/interfaces";
import type { Curso } from "../../prisma/generated/client";

export interface AlunoRepository {
    findByEmail(email: string): Promise<AlunosData | null>
    findCursoById(id: number): Promise<Curso | null>
    createAlunos(alunos: AlunosData): Promise<any | null>
}