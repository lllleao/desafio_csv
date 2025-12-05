# 📘 Documentação -- Importação de Alunos via CSV (Express 7 + Prisma + MySQL)

## 📄 Visão Geral

Este projeto realiza a **importação em massa de registros de alunos**, a
partir de um arquivo CSV contendo cerca de **50.000 linhas**.

O processo inclui:

1.  Leitura e transformação do CSV em objetos JavaScript
2.  Aplicação de **validações de dados**
3.  Checagens de existência no banco
4.  Inserção em massa com **transação Prisma**, incluindo:
    -   **Timeout configurado** para 60 segundos
    -   **Rollback automático** em caso de falhas
5.  Retorno do número de registros inseridos

Tecnologias utilizadas:

-   **Express 7**
-   **Prisma + PrismaMariaDb Adapter**
-   **MySQL (Docker)**
-   **Node.js**

------------------------------------------------------------------------

# ⚙️ Fluxo de Importação

## 1. Leitura do CSV

``` ts
const alunosData = await parseCSVToObject()
```

------------------------------------------------------------------------

## 2. Filtragem de E-mails Duplicados

``` ts
const alunosWithoutDuplicateEmail = await emailFilter(alunosData)
```

------------------------------------------------------------------------

## 3. Validações

### ✔️ Validação de CPF

### ✔️ Validação de data

### ✔️ Verificação se o e-mail já existe no banco

### ✔️ Verificação se o curso existe
------------------------------------------------------------------------
### 🔐 Regras da transação

-   Timeout de **60 segundos**
-   **Rollback automático** em caso de erro

------------------------------------------------------------------------

# 🧩 Configuração do Prisma e Adapter MariaDB

``` ts
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../prisma/generated/client'

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    connectionLimit: 50
})

const prisma = new PrismaClient({
    adapter,
    transactionOptions: { timeout: 60000 }
})

export default prisma
```
------------------------------------------------------------------------

# 🧪 Como Executar

``` sh
docker compose up -d
npm install
npx prisma generate
npm run dev
```
### O input para upload está em http://localhost:3000/
------------------------------------------------------------------------

# 🚨 Observações de Performance

-   Importação de alto volume (50k+ linhas)
-   Validações podem impactar performance
-   `createMany` utilizado para inserção em batch

------------------------------------------------------------------------

# ✔️ Conclusão

O módulo implementa uma importação robusta com:

-   Validações completas
-   Rollback automático
-   Timeout configurado
-   Inserção eficiente
-   Banco dockerizado
