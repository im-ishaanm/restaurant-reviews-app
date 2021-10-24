let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTAURANTREVIEWS_NS)
        .collection("restaurants");
    } catch (err) {
      console.log(`Error communicating with database : ${err}`);
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (err) {
      console.log(`Unable to find requested documents : ${err}`);
      return { restaurantsList: [], restaurantCount: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const restaurantCount = await restaurants.countDocuments(query);
    } catch (err) {
      console.log(
        `Error occured converting cursor to array or counting documents : ${err}`
      );
      return { restaurantsList: [], restaurantCount: 0 };
    }
  }
}
