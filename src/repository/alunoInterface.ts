import type { AlunosData } from "@src/interfaces";

export interface AlunoRepository {
    findByEmail(email: string): Promise<AlunosData | null>
}