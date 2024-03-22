const express = require('express');
const router = express.Router();
const Chef = require('../Chef/Chef.js');

router.get('/all', async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.post('/add', async (req, res) => {
  chefModel = mongoose.model('Chef' ,authorSchema, 'BaseD');
    chefModel.insertMany([
    {nom: "Lamia", specialite:"Amghar"},
    {nom: "ikram", specialite:"ghiouan"},
    
    ]).then((docs) => {
    console.log("Inserted chef");
    console.log(docs);
    }).catch((e)=>{console.log(e)})
});

router.put('/update/:name', async (req, res) => {
 
  const chef = req.params.name;
  const updatedchef = req.body;

  chefModel.updateOne({nom:`${chef}`},{specialite:"fdgnh"},function(err, res){
      console.log(`Modified ${res.n} document`);
      });
      res.json(updatedchef); 
    });

router.delete('/delete/:name', async (req, res) => {
  try {
    const name = req.params.name;

    await Chef.findOneAndDelete({ nom });

    res.json({ message: "Chef supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
