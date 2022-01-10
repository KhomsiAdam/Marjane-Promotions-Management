// dotenv
require('dotenv').config();
const path = require('path');

// Express
const express = require('express');
const bodyParser = require('body-parser');

// Database
const db = require('./config/database');

// Bcrypt
const bcrypt = require('bcryptjs');

// Models
const SuperAdmin = require('./models/SuperAdmin');
const Admin = require('./models/Admin');
const Manager = require('./models/Manager');
const Center = require('./models/Center');
const Product = require('./models/Product');
const Promotion = require('./models/Promotion');

// Routes
const superRoutes = require('./routes/superRoutes');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const isAdmin = require('./middleware/isAdmin');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
});

// Endpoints
app.use('/super', superRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Relations
Admin.belongsTo(Center);
Manager.belongsTo(Center);
Promotion.belongsTo(Product);
Promotion.belongsTo(Center);

app.use(express.static(path.resolve(__dirname, "public", "src")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//* Uncomment to drop tables and migrate fresh
// db.sync({ force: true })
//   .then(result => {
//     bcrypt.hash('superadmin', 12).then(hashed => {
//       SuperAdmin.create({ email: 'superadmin@marjane.com', password: hashed });
//     })
//     Center.bulkCreate([
//       { name: 'MARJANE DERB SULTAN', city: 'Casablanca', address: 'Bd Mohammed VI Angle Bd Abou Bouchaib Doukkali, Casablanca, Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE AIN SEBAA', city: 'Casablanca', address: 'Quartier Ain Sebaa, Casablanca 20400, Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE TANGER II', city: 'Tanger', address: 'Km 7, Route de Tétouan Tanger, Tanger , Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE TANGER MEDINA', city: 'Tanger', address: 'Route de Rabat, Tangier 90060, Tanger 90060, Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE Hay Riad', city: 'Rabat', address: 'Rabat Hay Ryad. Autoroute de Rabat/Tanger Rabat, Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE BOUREGR', city: 'Rabat', address: 'R401, Rabat, Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE MENARA', city: 'Marrakech', address: 'Marjane Rte De Casa, Marrakech, Maroc', phone: '+212 80-2022050' },
//       { name: 'MARJANE MARRA. MASSIRA', city: 'Marrakech', address: "Route d'Agadir Massira Marrakech, Marrakech , Maroc", phone: '+212 80-2022050' },
//       { name: 'MARJANE SAFI', city: 'Safi', address: 'Route de Marrakech, Safi , Maroc', phone: '+212 80-2022050' }
//     ])
//     Product.bulkCreate([
//       { name: 'Camera', category: 'Multimedia', price: 4000, quantity: 80 },
//       { name: 'TV', category: 'Multimedia', price: 8000, quantity: 20 },
//       { name: 'Monitor', category: 'Multimedia', price: 6000, quantity: 40 },
//       { name: 'M&Ms', category: 'Candy', price: 60, quantity: 80 },
//       { name: 'Snickers', category: 'Candy', price: 40, quantity: 20 },
//       { name: 'Mars', category: 'Candy', price: 30, quantity: 40 }
//     ])
//   })
db.sync()
  .then(result => {
    app.listen(process.env.PORT || 4000, () => console.log('Server running'));
  })
  .catch(err => {
    console.log(err);
  })
