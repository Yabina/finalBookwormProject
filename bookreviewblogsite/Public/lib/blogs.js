// Function to fetch all reviews from the API endpoint
const fetchReviews = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/reviews/getAllReview');
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
};

// Function to display reviews as paragraphs on the page
const displayReviews = async () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviews = await fetchReviews();

    // Clear previous content
    reviewsContainer.innerHTML = '';

    // Check if there are any reviews
    if (reviews.length === 0) {
        const noReviewsMessage = document.createElement('p');
        noReviewsMessage.textContent = 'No reviews available.';
        reviewsContainer.appendChild(noReviewsMessage);
        return;
    }

    // Loop through the reviews and create paragraphs for each review
    reviews.forEach(review => {
        const reviewParagraph = document.createElement('p');
        reviewParagraph.textContent = `Book Title: ${review.book_title}, Author Name: ${review.author_name}, Rating: ${review.rating}, Description: ${review.description}, Reviewed By: ${review.reviewed_by}, Review Date: ${new Date(review.created_date).toLocaleDateString()}`;
        reviewsContainer.appendChild(reviewParagraph);
    });
};

// Call the function to display reviews when the page loads
window.onload = displayReviews;