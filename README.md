# Passos para rodar a API localmente

Você deve fazer o clone do projeto no seu computador através do git:
```bash
git clone https://github.com/labtrackensino/cursovue-api.git
```

Entre na pasta do projeto e execute o método para baixar as dependências:
```bash
cd cursovue-api
npm install
```

O projeto é todo construído em AdonisJS, caso sinta vontade ou necessidade, faça a instalação do CLI (client line interface - interface de linha de comando) da ferramenta:
```bash
npm i -g @adonisjs/cli
```

Você deve fazer uma cópia do .env.example e colocar suas configurações de acesso ao banco de dados e acesso a sua implementação de minio para armazenar as fotos nos atributos.

```
DB_CONNECTION=pg <- pode ser outros bancos, mas utilizamos o PostgreSQL
DB_HOST=localhost <- host do database
DB_PORT=5432 <- porta do database
DB_USER=postgres <- usuário
DB_PASSWORD=postgres <- senha
DB_DATABASE=pedidex <- banco para acesso

MINIO_HOST=play.minio.io  <- host do mínio (utilizamo o play como exemplo)
MINIO_PORT=9000  <- porta onde o minio esta publicado
MINIO_SECURE=true  <- se utiliza https
MINIO_ACCESS=Q3AM3UQ867SPQQA43P2F  <- chave de aceso
MINIO_SECRET=zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG <- secret de acesso
MINIO_BUCKET=labtrack  <- bucket que será utilizado para gravas as imagens
#Region de acesso ao bucket que não precisa ser utilizado, mas tem gente que vai querer
MINIO_REGION=
```

Depois de configurado o .env basta rodar o migration para atualizar as tabelas:

```bash
node ace migration:run
```
ou, caso você tenha instalado o CLI do AdonisJS:
```bash
adonis migration:run
```

Depois disso você já esta pronto para rodar a aplicação, recomendo rodar ela em modo desenvolvimento:
```bash
node server.js --dev
```
ou, caso você tenha instalado o CLI do AdonisJS:
```bash
adonis serve --dev
```

E para rodar em produção basta remover o parâmetro --dev.

Fique a vontade para entrar em contato e tirar suas dúvidas!
