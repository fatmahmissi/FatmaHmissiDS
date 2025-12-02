const mongoose = require('mongoose'); // hne aamlna importaation l mongoose bech norobto b nodejs


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // nist3mlo mongoose.connect w na7tou fiha l-URI elli jay mel .env
    console.log(" MongoDB database connected"); //  ken kol chy cava fy connexion , yjili  msj li mongo connecta aala bd
  } catch (err) {
    console.error("MongoDB connection failed:", err); //  ken fama mochkla fel connexion, yokhrjli  error 
    process.exit(1); //  taamel exit lel app, hedhi bech ma ykammilch yemchi w howa ma howsh connecté
  }
};

module.exports = connectDB;// hné na3mlou export lel function connectDB bech najmou nist3mlouha fel app kol
