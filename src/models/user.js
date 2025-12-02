const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nom: { type: String },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "manager"], default: "user" },  // role: ykoun ya user ya manager, par défaut user
  date_de_creation: { type: Date, default: Date.now }
});
//  kbal ma ysir save lel user fil base, ncryptyw el mot de passe
userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

//  méthode bech n9arnou el password elli yektebo user  m3a el mot de passe crypté li mawjouda fil base
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema); //  na3mlou export lel modèle User
