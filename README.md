# PhotoOpp 📸

Este projeto foi desenvolvido como parte do desafio técnico para Desenvolvedor Full Stack da Nex Lab.
A proposta simula uma ativação interativa em um estande de evento: o participante tira uma foto, visualiza o resultado com uma moldura, e recebe um QR Code para baixar a imagem gerada.
A aplicação foi construída com foco em fluidez, experiência do usuário e organização do código, conforme especificado no layout do Figma.

## ✨ Funcionalidades

- Captura de imagem com webcam (modo paisagem ou retrato)
- Pré-visualização com overlay customizado
- Upload da imagem para o backend
- Geração de QR Code com link para download
- Tela de agradecimento com QR Code
- Interface responsiva e moderna

## 🖼️ Fluxo da Aplicação

1. **Home** — Início com botão "Iniciar"
2. **Camera** — Acesso à webcam com contagem regressiva
3. **Preview** — Visualização da imagem com frame estilizado
4. **Download** — QR Code sobre a imagem e botão "Finalizar"
5. **Thanks** — Tela final com logo e QR Code
6. **Painel Administrativo** — Lista e download das imagens por data (/admin)

## 🧩 Tecnologias Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [html2canvas](https://html2canvas.hertzen.com/)
- CSS puro com responsividade

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- Banco de dados: [PostgreSQL via Neon](https://neon.tech/)
- Geração de QR Code com [node-qrcode](https://www.npmjs.com/package/qrcode)

## 📦 Instalação e Execução

### Requisitos
- Node.js 18+
- npm ou yarn
- Conta no [Neon](https://neon.tech/) e banco configurado

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Em outro Terminal execute esse comando para expor o backend

```bash
ngrok http Porta_do_Backend
```

Copie a URL gerada (ex: https://xxxx.ngrok-free.app) e atualize o valor da variável BASE_URL no seu .env:

```bash
BASE_URL=https://xxxx.ngrok-free.app
```
Essa URL é usada no QR Code para que o dispositivo do usuário consiga acessar e baixar a imagem.


## 🛠️ Painel Administrativo
O sistema conta com um painel administrativo acessível pela rota:

```bash
/admin
```


### Funcionalidades disponíveis:

* ✅ Visualização de todas as fotos capturadas
* ✅ Filtro por data de envio (campo `createdAt`)
* ✅ Link direto para download de cada imagem (`/download/:id`)

Esse painel é útil para monitorar os envios feitos pelo sistema.

> ⚠️ O painel atualmente **não possui autenticação**, portanto recomenda-se protegê-lo com login ou middleware de acesso em ambiente de produção.
