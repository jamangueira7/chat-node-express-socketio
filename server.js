const express = require('express');

const app = express();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
