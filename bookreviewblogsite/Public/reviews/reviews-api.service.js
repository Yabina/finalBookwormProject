const REVIEWS_API = `${BASE_API_URL}/reviews/createReview`; // http://localhost:3000/api/tasks/createTask
const GET_ALL_REVIEWS_API = `${BASE_API_URL}/reviews/getAllReview`; // http://localhost:3000/api/tasks/getAllTask
const DELETE_REVIEWS_API = `${BASE_API_URL}/reviews/deleteReview`; // http://localhost:3000/api/tasks/deleteTask
const UPDATE_REVIEWS_API = `${BASE_API_URL}/reviews/updateReview`; // http://localhost:3000/api/tasks/updateTask
const GET_BLOG_REVIEW_API = `${BASE_API_URL}/reviews/getBlogReview`;

class ReviewsService {
  getBlogReview = () => _get(`${GET_BLOG_REVIEW_API}`, OPTIONS_WITH_AUTH);

  getAllReviews = (userId) => _get(`${GET_ALL_REVIEWS_API}/${userId}`, OPTIONS_WITH_AUTH);

  getReviews = () => _get(REVIEWS_API, OPTIONS_WITH_AUTH);

  addReview = (formData) => _post(REVIEWS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  updateReview = (reviewId, formData) => _put(`${UPDATE_REVIEWS_API}/reviews/${reviewId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteReview = (userId, reviewId) => _delete(`${DELETE_REVIEWS_API}/${userId}/${reviewId}`, OPTIONS_WITH_AUTH);
}
