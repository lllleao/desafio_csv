import type { AlunosData } from "@src/interfaces"

const dateValidate = (alunosData: AlunosData[]) => {
    return new Promise((resolve, reject) => {

        for (let aluno of alunosData) {
            const dateOfBirth = new Date(aluno.data_nascimento).getTime()
            const toDay = Date.now()

            if (dateOfBirth > toDay) {
                return reject('Data futura não permitida')
            }
            resolve('Data correta')
        }
    })
}

export default dateValidate
