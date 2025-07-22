// backend/index.js
const express = require('express');
const cors = require('cors');
const pagamentoRoutes = require('./routes/pagamento');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pagamento', pagamentoRoutes);

app.listen(3001, () => {
  console.log('Servidor backend rodando em http://localhost:3001');
});
