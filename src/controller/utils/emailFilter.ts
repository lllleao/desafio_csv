import type { AlunosData } from "@src/interfaces"

const emailFilter = (alunosData: AlunosData[]): Promise<AlunosData[]> => {
    return new Promise((resolve, reject) => {
        if (!Boolean(alunosData) || alunosData.length === 0) {
            return reject('Array vazio')
        }
        const alunosWithoutDuplicateEmail: AlunosData[] = []
        alunosData.forEach(item => {
            const duplicateEmail = alunosData.filter(aluno => aluno.email === item.email).length
            
            if (duplicateEmail > 1) return
            
            alunosWithoutDuplicateEmail.push(item)
        })
    
        resolve(alunosWithoutDuplicateEmail)
    })
}


export default emailFilter
