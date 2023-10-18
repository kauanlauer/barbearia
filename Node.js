const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('path/to/your/serviceAccountKey.json'); // Substitua pelo caminho do seu arquivo de chave do serviço Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Substitua pelo URL do seu banco de dados Firebase
});

app.get('/api/getUserByEmail', (req, res) => {
  const email = req.query.email; // Recupere o endereço de e-mail da consulta

  admin.auth().getUserByEmail(email)
    .then((userRecord) => {
      // Aqui, você pode retornar os dados do usuário para a página HTML
      res.json(userRecord);
    })
    .catch((error) => {
      console.error('Erro ao recuperar usuário:', error);
      res.status(500).send('Erro ao recuperar usuário');
    });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
