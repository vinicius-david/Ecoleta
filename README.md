<h1 align='center'>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/logo_-1EfAr_GS.svg'>
</h1>

## 📝 Sobre

O projeto **Ecoleta** foi criado durante a primeira **Next Level Week** da RocketSeat. No site, é possível realizar de novos pontos de coleta, e na versão mobile, é possível buscar os pontos perto da sua localidade de acordo com os itens coletados por cada unidade.

---

<h1>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/web2_FdF4cg42r.jpeg'>
</h1>

<h1>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/web1_25Yjp1NdB.jpeg'>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/web3_C8PIHX4uq.jpeg'>
</h1>

<h1>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/mobile1_C6byv3YzY.jpeg' width=300>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/mobile2_pzXrnw2Ii.jpeg' width=300>
  <img src='https://ik.imagekit.io/xcu9aqv3wh/mobile3_FW80AtwST.jpeg' width=300 >
</h1>

## 💻 Tecnologias

O projeto foi feito de forma diferente do que apresentado durante a semana. Foi utilizado o PostgresSQL como banco de dados e o Docker.

 - Typescript
 - Docker
 - PostgreSQL
 - NodeJS
 - ReactJS
 - React Native

 ---

## 🛠 Como rodar o projeto

```bash
  # Clonar o projeto
  $ git clone https://github.com/vinicius-david/Ecoleta.git

  # Entrar no diretório
  $ cd Ecoleta

  # Instalar as dependências em cada pasta do projeto
  $ cd backend       $ yarn
  $ cd ../frontend   $ yarn
  $ cd ../mobile     $ yarn

```

Depois, é necessário criar a conexão com o Docker e usar as migrations na pasta de backend para criar o banco de dados utilizando o PostgreSQL. 
É necessário colocar o IP da sua máquina nos arquivos ```backend/src/config/serialize.ts``` e ```mobile/src/services/api.ts```.

```bash
  # Execute o programa
  $ yarn dev   // no backend
  $ yarn start  // no frontend e mobile
```
