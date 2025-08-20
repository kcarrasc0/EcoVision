# 🌿 EcoVision Web App – Sistema de Monitoramento Ambiental de Queimadas
O EcoVision é uma evolução do projeto FireVision: uma plataforma web que combina visão computacional, dados ambientais públicos e tecnologias de nuvem para monitorar riscos ambientais industriais no Brasil. Inicialmente desenvolvido para detectar incêndios em tempo real pela câmera do usuário, o sistema foi aprimorado para incorporar APIs do IBAMA, INPE e análise preditiva com aprendizado de máquina. O EcoVision é uma plataforma web robusta que utiliza dados em tempo real, visão computacional e aprendizado de máquina para o monitoramento inteligente de riscos ambientais associados à atividade industrial no Brasil. O sistema integra múltiplas fontes de dados, incluindo arquivos do INPE e APIs públicas, para fornecer um dashboard analítico e preditivo.

Este projeto destaca-se pela sua arquitetura moderna, com um backend em Node.js/Express e um frontend em React, e um fluxo de autenticação seguro em duas etapas (2FA) com JWT.

--- 

## 🎯 Objetivos do Projeto
- Utilizar IA, ML e visão computacional para monitorar riscos ambientais.
- Integrar APIs públicas como INPE e IBAMA para análise em tempo real.
- Prover um painel interativo e preditivo para análise de indústrias.
- Hospedar todo o sistema em nuvem com escalabilidade automática (Render).
- Promover ações de fiscalização, transparência e educação ambiental.

---

## 🖼️ Protótipo no Figma

> Link para o design no Figma:  
📌 [seu link aqui]

---

## ✏️ Documentação

> Link para a documentação no Google Docs
📌 [Seu link aqui]

---

## 🚀 Funcionalidades Principais
- 🔐 Autenticação Segura:
Cadastro e Login de usuários com senhas criptografadas (bcrypt).
Autenticação de Dois Fatores (2FA) com código de uso único e tempo de expiração.
Gerenciamento de sessão segura via JSON Web Tokens (JWT), com dados do usuário inclusos no payload.
- 📊 Dashboard Interativo:
Visualização de focos de queimadas em gráficos dinâmicos.
Filtros interativos por Bioma e Estado.
Exportação dos dados filtrados para o formato .csv.
- 👁️ Visão Computacional (em desenvolvimento):
Detecção de focos de incêndio em tempo real através da webcam do usuário.
- 🗺️ Mapa de Monitoramento (planejado):
Geolocalização de indústrias e sobreposição com dados de autuações do IBAMA.
- 🧠 Análise Preditiva (planejado):
Uso de Machine Learning para prever riscos ambientais com base em dados históricos.

---

## 🧪 Tecnologias e Dependências
&lt;details>
&lt;summary>&lt;strong>Frontend&lt;/strong>&lt;/summary>

React.js: Biblioteca principal para a construção da interface.
Vite: Ferramenta de build extremamente rápida para desenvolvimento.
CSS Modules: Para estilização escopada por componente.
ECharts for React: Para a criação de gráficos dinâmicos e interativos.
jwt-decode: Para decodificar tokens JWT no lado do cliente e extrair informações do usuário.
getUserMedia(): API do navegador para acesso à webcam.
&lt;/details>

&lt;details>
&lt;summary>&lt;strong>Backend&lt;/strong>&lt;/summary>

Node.js + Express: Ambiente de execução e framework para a construção da API REST.
jsonwebtoken: Geração e verificação de tokens de acesso (JWT).
bcrypt: Criptografia segura de senhas de usuários.
cors: Habilita o compartilhamento de recursos entre origens (Cross-Origin Resource Sharing).
dotenv: Gerenciamento de variáveis de ambiente.
csv-parser: Para processamento e leitura de arquivos de dados em formato CSV.
Nodemon: (Desenvolvimento) Reinicia o servidor automaticamente a cada alteração no código.
&lt;/details>

&lt;details>
&lt;summary>&lt;strong>Banco de Dados&lt;/strong>&lt;/summary>

SQLite: Banco de dados local utilizado para desenvolvimento e testes rápidos.
PostgreSQL: (Planejado para produção) Banco de dados relacional robusto para o ambiente de deploy.
&lt;/details>

---

## 📁 Estrutura do Projeto
eco-vision/
├── backend/
│   ├── data/
│   │   ├── amazonia.csv
│   │   └── ... (outros 5 arquivos de biomas)
│   ├── src/
│   │   ├── database/
│   │   │   └── connect.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── user.routes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── charts/
    │   │   └── layout/
    │   ├── pages/
    │   │   ├── DashboardPage/
    │   │   └── LoginPage/
    │   └── App.jsx
    └── package.json

---

## ☁️ API e Rotas

| Método  | Rota             | Descrição                                   |
|---------|------------------|---------------------------------------------|
| POST    | /auth/register   | Registra um novo usuário.                   |
| POST    | /auth/login      | Autentica o usuário e gera um código 2FA.   |
| POST    | /auth/verify-2fa | Valida o código 2FA e retorna um token JWT. |

| Dashboard | Rota                      | Descrição                                           |
|-----------|---------------------------|-----------------------------------------------------|
| GET       | /dashboard/filtros        | Retorna a lista de Biomas e Estados para os filtros.|
| GET       | /dashboard/focos          | Retorna os dados agregados para os gráficos.        |
| GET       | /dashboard/focos/download | Baixa os dados filtrados em formato .csv.           |

---

## 📦 Hospedagem em Nuvem - Render
- Backend + Frontend com deploy contínuo via GitHub
- PostgreSQL gratuito para persistência
- Worker opcional para atualizar dados diariamente

---

## 💾 Guia de Instalação e Execução
Para executar o projeto localmente, siga os passos para o backend e o frontend em terminais separados.

### 🔧 Instruções de setup

Clone the repository:
git clone https://github.com...

🔧 Backend
Navegue até a pasta do backend:
Bash

cd backend
Instale as dependências:
Bash

npm install
Crie um arquivo .env na raiz da pasta backend/ e adicione as seguintes variáveis:
Snippet de código

PORT=3001
JWT_SECRET=seu_segredo_super_secreto_aqui
Inicie o servidor em modo de desenvolvimento:
Bash

npm run dev
# (assumindo que você tenha um script "dev": "nodemon src/server.js" no seu package.json)
O servidor estará rodando em http://localhost:3001.
🔧 Frontend
Navegue até a pasta do frontend (em um novo terminal):
Bash

cd frontend
Instale as dependências:
Bash

npm install
Inicie a aplicação de desenvolvimento:
Bash

cd backend: no terminal "node server.js"
cd src: no terminal "npm run dev"

## 🌍 Licença
Este projeto foi desenvolvido para fins educacionais e está aberto para colaboração.
Você pode adaptá-lo para soluções reais de monitoramento ambiental e fiscalização.
