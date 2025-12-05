import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../prisma/generated/client'

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'user123',
    database: 'alunos_db',
    connectionLimit: 5
})

const prisma = new PrismaClient({adapter})

export default prisma
