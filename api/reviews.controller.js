import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.review_body;
      const userData = {
        name: req.body.user_name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        review,
        userData,
        date
      );
      res.json({ status: "Review added successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }

  static async apiUpdateReview(req, res, next) {
    const reviewId = req.body.review_id;
    const updated_review_text = req.body.review_body;
    const date = new Date();
    const user_id = req.body.user_id;

    const reviewResponse = await ReviewsDAO.updateReview(
      reviewId,
      updated_review_text,
      date,
      user_id
    );

    let { error } = reviewResponse;
    if (error) {
      res.status(400).json({ error: "Incorrect credentials / data" });
    }

    if (reviewResponse.modifiedCount == 0) {
      throw new Error("Unable to update review");
    }

    res.json({ status: "Review updated successfully " });
  }
  catch(err) {
    res.status(500).json({ error: err });
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "Success" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
