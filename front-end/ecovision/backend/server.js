const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const verify2faRoute = require('./routes/verify2fa');
// --- 1. IMPORTE A ROTA DO DASHBOARD ---
const dashboardRoute = require('./routes/dashboardRoutes'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/verify-2fa', verify2faRoute);
// --- 2. USE A ROTA DO DASHBOARD ---
app.use('/api/dashboard', dashboardRoute);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});