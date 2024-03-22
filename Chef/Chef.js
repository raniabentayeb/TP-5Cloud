const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  nom: String,
  specialite: String
});

chefModel = mongoose.model('Chef', chefSchema);
module.exports=chefModel;  
