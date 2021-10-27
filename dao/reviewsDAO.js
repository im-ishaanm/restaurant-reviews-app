import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.RESTAURANTREVIEWS_NS)
        .collection("reviews");
    } catch (err) {
      console.log(error);
    }
  }
  static async addReview(restaurantId, review, user, date) {
    try {
      const reviewDocument = {
        name: user.name,
        user_id: user._id,
        text: review,
        date: date,
        restaurant_id: ObjectId(restaurantId),
      };
      return await reviews.insertOne(reviewDocument);
    } catch (err) {
      console.error(err);
      return {
        error: err,
      };
    }
  }
  static async updateReview(reviewId, text, date, userId) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id: userId,
          _id: ObjectId(reviewId),
        },
        {
          $set: { text: text, date: date },
        }
      );
      return updateResponse;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
}
