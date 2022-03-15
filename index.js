const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const corsOptions = {
  origin: 'http://localhost:4001',
};
app.use(cors(corsOptions));

app.use(express.json());

const db = require('./app/models');

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'testing.' });
});

require('./app/routes/event.routes')(app);
require('./app/routes/user.routes')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
