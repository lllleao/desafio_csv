import express from 'express'
import path from 'path'
import multer from 'multer'
import parseCSVToObject from '@src/controller/utils/parseCSV'
import emailFilter from '@src/controller/utils/emailFilter'
import cpfValidator from '@src/controller/utils/cpfValidate'
import dateValidate from '@src/controller/utils/dateValidate'
import { cursoExists, emailExists } from '@src/service/dataProcessing'
import prisma from '@src/prisma'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, 'alunos.csv')
    }
})

const upload = multer({storage})

router.get('/', (req, res) => {
    res.sendFile(path.resolve("src/public/index.html"))
})

router.post('/', upload.single("file"), async (req, res) => {
    try {
        const timeLimit = 60000
        
        const operations = async (): Promise<{totalInseridos: number}> => {
            const alunosData = await parseCSVToObject()
            
            const alunosWithoutDuplicateEmail = await emailFilter(alunosData)
            
            await cpfValidator(alunosWithoutDuplicateEmail)
            
            await dateValidate(alunosWithoutDuplicateEmail)
            
            await emailExists(alunosWithoutDuplicateEmail)
            
            await cursoExists(alunosWithoutDuplicateEmail)
            
            const prismaOperation = prisma.$transaction(async (tx) => {

                const result = await tx.aluno.createMany({
                    data: alunosWithoutDuplicateEmail.map(a => ({
                        cpf: a.cpf,
                        data_nascimento: a.data_nascimento,
                        email: a.email,
                        nome: a.nome,
                        curso_id: Number(a.curso_id),
                    }))
                })

                return {
                    totalInseridos: result.count
                }
            })
            
            return prismaOperation
        }

        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout de 60 segundos excedido")), timeLimit)
        )

        const resultado = await Promise.race([operations(), timeout]) as {totalInseridos: number}


        res.status(200).json({sucesso: true, linhas: resultado.totalInseridos})
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error: err})
    } finally {
        await prisma.$disconnect()
    }
})

router.post('/aluno/create', async (req, res) => {
    const { cpf, data_nascimento, email, nome, curso_id } = req.body

    try {
        await prisma.aluno.create({
        data: {
            cpf,
            data_nascimento,
            email,
            nome,
            curso_id,

        }
    })
    } catch (err) {
        console.log('Error', err)
    }

    res.status(200)
})

export default router
