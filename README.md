# Billing Service — FiapMecanica

Microsserviço responsável pelo gerenciamento de orçamentos e pagamentos da oficina mecânica.

## Responsabilidades

- Geração e envio de orçamentos para aprovação
- Registro e verificação de pagamentos via Mercado Pago
- Atualização do status da OS após pagamento
- Comunicação via RabbitMQ (mensageria assíncrona)

## Tecnologias

- Node.js 20+ / NestJS 10+ / TypeScript
- PostgreSQL (banco relacional) via Prisma ORM
- MongoDB (banco não relacional) — logs e auditoria
- RabbitMQ — mensageria assíncrona
- Mercado Pago — integração de pagamentos
- Jest — testes unitários
- Cucumber — testes BDD
- Docker / Docker Compose

## Persistência Poliglota

| Banco      | Uso                                           |
| ---------- | --------------------------------------------- |
| PostgreSQL | Orçamentos e pagamentos (dados transacionais) |
| MongoDB    | Logs de eventos e auditoria                   |

## Arquitetura

Hexagonal (Ports & Adapters):

src/
├── domain/ # Entidades e regras de negócio
├── application/ # Use cases e ports (interfaces)
├── infrastructure/ # Repositórios, mensageria, Mercado Pago
├── presentation/ # Controllers e DTOs
└── modules/ # Módulos NestJS

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Subir bancos e RabbitMQ
docker compose up -d postgres mongodb rabbitmq

# Criar tabelas
npx prisma db push

# Iniciar em modo desenvolvimento
npm run start:dev
```

## Endpoints

| Método | Rota                              | Descrição                  |
| ------ | --------------------------------- | -------------------------- |
| GET    | /api/v1/health                    | Health check               |
| POST   | /api/v1/budgets                   | Criar orçamento            |
| GET    | /api/v1/budgets                   | Listar orçamentos          |
| GET    | /api/v1/budgets/:id               | Buscar orçamento           |
| PUT    | /api/v1/budgets/:id/approve       | Aprovar/rejeitar orçamento |
| POST   | /api/v1/payments                  | Criar pagamento            |
| GET    | /api/v1/payments/:id              | Buscar pagamento           |
| GET    | /api/v1/payments/budget/:budgetId | Pagamentos por orçamento   |

Swagger: **http://localhost:3001/api/docs**

## Testes

```bash
# Testes unitários
npm test

# Testes BDD
npm run test:bdd
```

## CI/CD

GitHub Actions — `.github/workflows/ci-cd.yml`:

| Evento       | Testes | Build |
| ------------ | ------ | ----- |
| Push main    | ✅     | ✅    |
| Push develop | ✅     | ❌    |
| PR main      | ✅     | ❌    |

## Variáveis de ambiente

```env
DATABASE_URL=postgresql://billing:billing123@localhost:5433/billing_db
MONGODB_URL=mongodb://localhost:27017/billing_logs
RABBITMQ_URL=amqp://localhost:5672
JWT_SECRET=your-secret
MERCADO_PAGO_ACCESS_TOKEN=your-token
PORT=3001
API_PREFIX=api/v1
```
