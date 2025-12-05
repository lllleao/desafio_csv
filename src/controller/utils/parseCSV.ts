import fs from 'fs'
import csv from 'csv-parser'
import type { AlunosData } from '@src/interfaces'
const parseCSVToObject = (): Promise<AlunosData[]> => {

    return new Promise((resolve, reject) => {

        const results: AlunosData[] = []
        
        fs.createReadStream('upload/alunos.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            resolve(results)
        })
        .on('error', (err) => reject(err))
    })
}

export default parseCSVToObject
