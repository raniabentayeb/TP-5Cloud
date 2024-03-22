const express = require('express');
const router = express.Router();
const Recette = require('../Recette/Recette.js');

router.get('/all', async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.post('/add', async (req, res) => {
  try {
    const { libelle } = req.body;

    const recette = new Recette({ libelle });
    await recette.save();

    res.status(201).json({ message: "Recette ajoutée avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.put('/update/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const { libelle } = req.body;

    await Recette.findOneAndUpdate({ libelle: name }, { $set: { libelle } });

    res.json({ message: "Informations de la recette mises à jour avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.delete('/delete/:name', async (req, res) => {
  try {
    const name = req.params.name;

    await Recette.findOneAndDelete({ libelle: name });

    res.json({ message: "Recette supprimée avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
