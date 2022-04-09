const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.static('public'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(express.json());
app.use(bodyParser.json());
require('dotenv').config();
app.use(cors(corsOptions));

const db = require('./app/models');

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'testing.' });
});

require('./app/routes/event.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/company.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/logical.routes')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
