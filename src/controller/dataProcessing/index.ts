import express from 'express'
import path from 'path'
import multer from 'multer'
import parseCSVToObject from '@src/controller/utils/parseCSV'
import emailFilter from '@src/controller/utils/emailFilter'
import cpfValidator from '@src/controller/utils/cpfValidate'
import dateValidate from '@src/controller/utils/dateValidate'
import { emailExists } from '@src/service/dataProcessing'
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
        const alunosData = await parseCSVToObject()
    
        const alunosWithoutDuplicateEmail = await emailFilter(alunosData)

        await cpfValidator(alunosWithoutDuplicateEmail)

        await dateValidate(alunosWithoutDuplicateEmail)

        await emailExists(alunosWithoutDuplicateEmail)

        res.status(200).json({ok: true})
    } catch (err) {
        res.status(500).json({error: 'Error'})
        console.log('Error', err)
    }
})

router.post('/aluno/create', async (req, res) => {
    const { cpf, data_nascimento, email, nome } = req.body

    try {
        await prisma.aluno.create({
        data: {
            cpf,
            data_nascimento,
            email,
            nome,
            curso_id: 1,

        }
    })
    } catch (err) {
        console.log('Error', err)
    }

    res.status(200)
})

export default router
