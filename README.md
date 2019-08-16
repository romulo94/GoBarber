# GoBarber

Aplicação para gerenciar agendamentos entre clientes x prestador de serviço

## Como rodar

Crie o arquivo `.env` com base no arquivo `.env.example` e preencha as informação necessárias para rodar a aplicação.
A aplicação usa: REDIS, MONGODB, SQL(postgres || mysql || etc)

_Sugestão:_ **Utilize docker!**

```console

  yarn
  yarn dev
  yarn queue
```

---

### Observações

É necessário rodar as o `dev` e o `queue` pois são processos independentes.

### Principais dependências

- express
- date-fns
- bee-queue
- jsonwebtoken
- bcryptjs
- dotenv
- multer
- nodemailer
- mongoose
- sequelize
- youch
- yup
- winston
- sentry/node

Dependências de desenvolvimento:

- eslint
- nodemon
- sucrase

### Descrição detalhada

GoBarber é um gerenciador de horários, caso seja um cliente,poderá escolher o profissional e o horario em que deseja ser atendido, caso seja um prestador de serviço, poderá ver seus agendamentos.
