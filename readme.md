# Autenticação e RefreshToken

Essa aplicação foi desenvolvida para fins de estudo e aprimoramento em autenticação e autorização de usuários no app.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


### 📋 Pré-requisitos

Para a aplicação funcionar corretamente deve haver um arquivo ```.env``` na sua aplicação
com essas variaveis de ambiente

```
PORT= "porta onde a plicaçào ira funcionar"

JWT_SECRET_KEY= "chave para encripitar seus tokens JWT"

DATABASE_URL= "url para o banco de dados seja SQL ou NoSQL"


```

### 📋 Configurar o banco de dedados

Para a aplicação funcionar corretamente deve haver um arquivo ```.env``` na sua aplicação
com essas variaveis de ambiente

```
POSTGRES_HOST=postgress
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=study_refreshToken


```
### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Para isntalar todas as dependências da apicação 

```
yarn install
ou

npm install
```

para realizar a criação das tabelas do banco de dados utilize para ambiente de desenvolvimento

```
yarn prisma migrate dev

npx prisma migrate dev
```

Termine com um exemplo de como obter dados do sistema ou como usá-los para uma pequena demonstração.
