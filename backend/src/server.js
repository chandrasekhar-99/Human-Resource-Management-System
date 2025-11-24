require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
const { info, error: logError } = require('./utils/logger');

const PORT = process.env.PORT || 5000;

(async function start() {
  try {
    await sequelize.authenticate();
    info('Database connected successfully!');

   
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      info('Database synced (development mode)');
    } else {
      await sequelize.sync(); // create tables in production
      info('Database synced (production mode)');
    }


    app.listen(PORT, () => info(` Server running at http://localhost:${PORT}`));
  } catch (err) {
    logError(' Failed to start server:', err);
    process.exit(1);
  }
})();
