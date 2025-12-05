import type { AlunosData } from "@src/interfaces"

export const cpfNumbersValidator = (cpf: string): boolean => {
    if (!cpf) return false
    cpf = cpf.replace(/\D/g, '')

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false // Verifica se todos os dígitos são iguais (ex.: "111.111.111-11")
    }

    let sum, remainder

    // Validação do primeiro dígito
    sum = 0
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i] as string) * (10 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf[9] as string)) return false

    // Validação do segundo dígito
    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i] as string) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf[10] as string)) return false

    return true
}

const cpfValidator = (alunosData: AlunosData[]) => {
    return new Promise((resolve, reject) => {
        
        for (let aluno of alunosData) {
            const cpf = aluno.cpf

            const isCpfValid = cpfNumbersValidator(cpf)

            if (!isCpfValid) {
                return reject("Cpf inválido")
            }

            resolve("Cpf válido")
        }
    })
}

export default cpfValidator
