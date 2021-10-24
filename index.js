import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

import RestaurantsDAO from "./dao/restaurantsDAO.js";

dotenv.config();
const mongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

mongoClient
  .connect(process.env.RESTAURANTREVIEWS_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
