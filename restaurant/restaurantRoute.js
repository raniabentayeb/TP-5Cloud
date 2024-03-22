
const express = require('express');
const router = express.Router();
const Restaurant = require('../Restaurant/Restaurant.js');
const Chef = require('../Chef/Chef.js');
const Recette = require('../Recette/Recette.js');

router.get('/all', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.get('/chefs/:restaurantname', async (req, res) => {
  try {
    const restaurantName = req.params.restaurantname;
    const chefs = await Chef.find({ restaurant: restaurantName });
    res.json(chefs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.get('/recettes/:restaurantname', async (req, res) => {
  try {
    const restaurantName = req.params.restaurantname;
    const recettes = await Recette.find({ restaurant: restaurantName });
    res.json(recettes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.post('/add', async (req, res) => {
  try {
    const { nom, chef_id, recette_id } = req.body;

    const restaurant = new Restaurant({ nom, chef_id, recette_id });
    await restaurant.save();

    res.status(201).json({ message: "Restaurant ajouté avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.put('/update/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const { nom, chef_id, recette_id } = req.body;

    await Restaurant.findOneAndUpdate({ nom }, { $set: { nom, chef_id, recette_id } });

    res.json({ message: "Informations du restaurant mises à jour avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.delete('/delete/:name', async (req, res) => {
  try {
    const name = req.params.name;

    await Restaurant.findOneAndDelete({ nom });

    res.json({ message: "Restaurant supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
