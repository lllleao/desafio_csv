import type { AlunosData } from "@src/interfaces"

const emailFilter = (alunosData: AlunosData[]): Promise<AlunosData[]> => {
    return new Promise((resolve, reject) => {
        if (!Boolean(alunosData) || alunosData.length === 0) {
            return reject('Array vazio')
        }

        const seen = new Set<string>();

        const alunosWithoutDuplicateEmail: AlunosData[] = []

        for (let aluno of alunosData) {
            if (seen.has(aluno.email)) continue
            seen.add(aluno.email)
            alunosWithoutDuplicateEmail.push(aluno)
        }

        
    
        resolve(alunosWithoutDuplicateEmail)
    })
}


export default emailFilter
