import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../prisma/generated/client'
import dotenv from 'dotenv'
dotenv.config()

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    connectionLimit: 50
})

const prisma = new PrismaClient({adapter, transactionOptions: {
    timeout: 60000
}})

export default prisma
