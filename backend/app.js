const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const { exec } = require('child_process');

app.use(express.json());
app.use('/api', routes);

// Définir le dossier statique pour servir les fichiers front-end
app.use(express.static(path.join(__dirname,'..', 'frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ouvrir automatiquement le navigateur
exec('start http://localhost:3000'); // Remplacez 3000 par le port de votre serveur si nécessaire