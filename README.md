# 🌿 EcoVision Web App – Sistema de Monitoramento Ambiental Industrial
O EcoVision é uma evolução do projeto FireVision: uma plataforma web que combina visão computacional, dados ambientais públicos e tecnologias de nuvem para monitorar riscos ambientais industriais no Brasil. Inicialmente desenvolvido para detectar incêndios em tempo real pela câmera do usuário, o sistema foi aprimorado para incorporar APIs do IBAMA, INPE e análise preditiva com aprendizado de máquina.

--- 

## 🎯 Objetivos do Projeto
- Utilizar IA, ML e visão computacional para monitorar riscos ambientais.
- Integrar APIs públicas como INPE e IBAMA para análise em tempo real.
- Prover um painel interativo e preditivo para análise de indústrias.
- Hospedar todo o sistema em nuvem com escalabilidade automática (Render).
- Promover ações de fiscalização, transparência e educação ambiental.

---

## 🚀 Funcionalidades
- 🔐 Login com autenticação segura
- 📍 Mapa com localização das indústrias monitoradas
- 🔥 Detecção de fogo com webcam
- 📊 Dashboard com gráficos (dados do INPE e IBAMA)
- 🧠 Predição de risco ambiental (Machine Learning)
- 📨 Notificações e geração de relatórios (PDF)
- ☁️ Deploy completo via Render (front e back)

---

## 🧪 Tecnologias Utilizadas
### Front-End:
- React.js
- Vite
- CSS Modules
- Recharts
- getUserMedia()

### Back-End:
- Node.js + Express
- Flask/FastAPI (caso use ML em Python)
- JWT Auth

### Dados:
- APIs do IBAMA e INPE
- PostgreSQL (Render)

### Deploy:
- Cloud Render para front-end, back-end e banco

---

## 📁 Estrutura do Projeto
eco-vision/
├── backend/
│   └── index.js
├── ml-models/
│   └── modelo_treinado.ipynb
├── src/
│   ├── pages/
│   ├── components/
│   └── App.jsx
├── public/
└── README.md

---

## ☁️ API e Rotas

| Método | Rota           | Descrição                             |
|--------|----------------|----------------------------------------|
| GET    | /detections    | Lista os eventos detectados           |
| POST   | /detections    | Envia novo evento detectado           |
| GET    | /industries    | Lista de indústrias monitoradas       |
| GET    | /violations    | Histórico de autuações (IBAMA)        |
| POST   | /register      | Registra novo usuário                  |
| POST   | /login         | Login do usuário                       |

---

## 📦 Hospedagem em Nuvem - Render
- Backend + Frontend com deploy contínuo via GitHub
- PostgreSQL gratuito para persistência
- Worker opcional para atualizar dados diariamente

---

## 💾 Guia de Instalação

### 🔧 Instruções de setup

Clone the repository:
git clone https://github.com/yourusername/firevision-webapp.git

Entre na pasta:
cd firevision-webapp

Instale as dependências:
npm install

Run front-end:
npm run dev


## 🌍 Licença
Este projeto foi desenvolvido para fins educacionais e está aberto para colaboração.
Você pode adaptá-lo para soluções reais de monitoramento ambiental e fiscalização.
