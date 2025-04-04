# ⚡ Energy Billing App

Sistema fullstack para extração, visualização e gerenciamento de dados de faturas de energia elétrica em PDF.

## 🚀 Tecnologias

- **Backend:** NestJS + Prisma + PostgreSQL
- **Frontend:** React + TypeScript + Recharts
- **Extração de PDF:** pdf-parse
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker e Docker Compose

---

## 📁 Estrutura

- `backend/`: API REST em NestJS, extração de dados dos PDFs e comunicação com o banco de dados.
- `frontend/`: Interface web com dashboard, filtros e biblioteca de faturas.
- `docker-compose.yml`: Orquestração dos containers do frontend, backend e banco de dados.

---

## 🧠 Funcionalidades

### Extração e Armazenamento

- Leitura de PDFs de faturas.
- Extração de dados como:
  - Nº do cliente.
  - Mês de referência.
  - Energia elétrica (kWh e R$).
  - Energia compensada GD I (kWh e R$).
  - Contribuição de iluminação pública.
  - Cálculos: total sem GD, economia GD, etc.

### Visualização

- Dashboard com gráficos:
  - Consumo vs Compensação (kWh).
  - Total sem GD vs Economia GD (R$).
- Biblioteca de faturas por cliente e mês.
- Filtros por número do cliente e período.

---

## 🐳 Executar Docker

### Subir o Banco de Dados com Docker Compose

1. **Certifique-se de ter o Docker e Docker Compose instalados**. Caso não tenha, siga as instruções no [site oficial do Docker](https://docs.docker.com/get-docker/) para instalação.

2. Para iniciar o banco de dados PostgreSQL, execute o comando abaixo no diretório raiz do projeto:

   ```bash
   docker-compose up -d
   ```

   Isso vai construir o banco de dados PostgreSQL

### Rodar o Backend

1. **Entre no diretório do backend**:

   ```bash
   cd backend
   ```

2. **Renomeie o arquivo `env.example` para `.env` e configure as variáveis de ambiente**:

   ```bash
   mv env.example .env
   ```

3. **Instale as dependências do backend**:

   ```bash
   npm install
   ```

4. **Gerar os tipos do Prisma**:

   ```bash
   npx prisma generate
   ```

5. **Rodar as migrações no banco de dados**:

   ```bash
   npx prisma migrate dev
   ```

6. **Ler as Faturas**:

   ```bash
   npx ts-node src/processar-faturas.ts
   ```

7. **Subir o servidor do backend**:

   ```bash
   npm run dev
   ```

   O servidor estará rodando na porta **3001**.

8. **Acessar o Prisma Studio**:

   ```bash
   npx prisma studio
   ```

   O Prisma Studio estará rodando na porta **5555**.
   Você pode acessar o Prisma Studio para visualizar e gerenciar os dados do banco de dados.

9. **Fazer Testes**:

   ```bash
   npm run test
   ```

### Rodar o Frontend

1. **Entre no diretório do frontend**:

   ```bash
   cd ../frontend
   ```

2. **Renomeie o arquivo `env.example` para `.env` e configure as variáveis de ambiente**:

   ```bash
   mv env.example .env
   ```

3. **Instale as dependências do frontend**:

   ```bash
   npm install
   ```

4. **Rodar o servidor do frontend**:

   ```bash
   npm run dev
   ```

   O frontend estará rodando na porta **5173**.

## 🖥️ Acessando a Aplicação

- **Frontend:** [http://localhost:3000](http://localhost:5173)
- **Backend (Swagger):** [http://localhost:3001/swagger](http://localhost:3001/swagger)
- **Prisma Studio:** [http://localhost:5555](http://localhost:5555)

---

## 💡 Notas

- Certifique-se de que os containers Docker estão rodando corretamente antes de tentar acessar as aplicações.
- Para rodar as faturas de teste, use o comando `ts-node src/processar-faturas.ts` dentro do diretório do backend.
- Caso enfrente problemas com o Docker, verifique os logs dos containers com o comando `docker-compose logs`.
