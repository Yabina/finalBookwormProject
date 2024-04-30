class ToReview {
  reviews = [];
  reviewsService;

  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }

  async init() {
    this.render();
  }

  /**
   * DOM renderer for building the review paragraph.
   */

  _renderReviewParagraph = (review) => {
    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'review-container';
    reviewContainer.style.border = '2px solid transparent'; // Add border to container
    reviewContainer.style.padding = '25px';
    reviewContainer.style.borderColor = 'white';
    reviewContainer.style.backgroundColor = 'rgb(85, 51, 51)';
    reviewContainer.style.color = 'white';
  
    const labels = ['Book Title', 'Author Name', 'Reviewed By', 'Rating', 'Description'];
  
    labels.forEach(label => {
      const labelElem = document.createElement('span');
      labelElem.textContent = `${label}: `;
      labelElem.style.fontWeight = 'bold'; // Make labels bold
      reviewContainer.appendChild(labelElem);
  
      const valueElem = document.createElement('span');
    valueElem.textContent = review[label.replace(' ', '_').toLowerCase()]; // Dynamically access review properties
    reviewContainer.appendChild(valueElem);
  
      reviewContainer.appendChild(document.createElement('br')); // Line break after each label-value pair
    });
  
    // Display Review Date
    const reviewDateLabel = document.createElement('span');
    reviewDateLabel.textContent = 'Review Date: ';
    reviewDateLabel.style.fontWeight = 'bold';
    reviewContainer.appendChild(reviewDateLabel);
  
    const reviewDateValue = document.createElement('span');
    reviewDateValue.textContent = new Date(review.created_date).toLocaleDateString(); // Format date
    reviewContainer.appendChild(reviewDateValue);
  
    reviewContainer.appendChild(document.createElement('br')); // Line break after review date
  
    return reviewContainer;
  };
  /**
   * DOM renderer for appending the review paragraph to the container.
   */
  _appendToContainer = (reviewParagraph) => {
    const container = document.createElement('div'); // Create a new container for each review
    container.className = 'review-container';
    container.style.border = '1px solid black'; // Add border to container
    container.appendChild(reviewParagraph);

    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.appendChild(container);
  };

  /**
   * Pure function for adding a review.
   */
  addReview = async (newReview) => {
    try {
      const {
          book_title,
          author_name,
          rating,
          description,
          reviewed_by
      } = newReview;


      const user_id = storageHasData() ? getStorage('user_id') : '';
      
      await this.reviewsService.addReview({
          book_title,
          author_name,
          rating,
          description,
          reviewed_by,
          user_id
      }); // we just want the name and status
      this.reviews.push(newReview); // push task with all it parts
    } catch (err) {
      console.log(err);
      alert('Unable to add task. Please try again later.');
    }
  };

  // async (newReview) => {
  //   try {
  //     const user_id = storageHasData() ? getStorage('user_id') : '';
  //     await this.reviewsService.addReview({ ...newReview, user_id });
  //     this.reviews.push(newReview);
  //   } catch (err) {
  //     console.log(err);
  //     alert('Unable to add review. Please try again later.');
  //   }
  // };

  /**
   * DOM Event handler helper for adding a review to the DOM.
   */
  _addReviewEventHandler = () => {
    const bookTitleInput = document.getElementById('formInputBookTitle');
    const book_title = bookTitleInput.value;
    const authorNameInput = document.getElementById('formInputAuthorName');
    const author_name = authorNameInput.value;
    const ratingInput = document.getElementById('formInputRating');
    const rating = ratingInput.value;
    const descriptionInput = document.getElementById('formInputDescription');
    const description = descriptionInput.value;
    const reviewedByInput = document.getElementById('formInputReviewedBy');
    const reviewed_by = reviewedByInput.value;

    const review = {
      book_title: bookTitleInput.value,
      author_name: authorNameInput.value,
      rating: ratingInput.value,
      description: descriptionInput.value,
      reviewed_by: reviewedByInput.value,
      created_date: new Date().toISOString(),
    };


    const reviewParagraph = this._renderReviewParagraph(review);
    this._appendToContainer(reviewParagraph);

    this.addReview(review);

    // Clear form inputs
    bookTitleInput.value = '';
    authorNameInput.value = '';
    ratingInput.value = '';
    descriptionInput.value = '';
    reviewedByInput.value = '';
  };

  render = async () => {
    const user_id = storageHasData() ? getStorage('user_id') : '';

    try {
      const reviews = await this.reviewsService.getAllReviews(user_id);
      if (reviews.length) {
        this.reviews = reviews;
        reviews.forEach((review) => {
          const { book_title, author_name, rating, description, reviewed_by, created_date } = review;
          const reviewParagraph = this._renderReviewParagraph({ book_title, author_name, rating, description, reviewed_by, created_date });
          this._appendToContainer(reviewParagraph);
        });
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}
