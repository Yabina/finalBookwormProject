describe('ToReview Class', () => {
    let reviewsServiceMock;
    let toReview;
  
    beforeEach(() => {
      reviewsServiceMock = {
        getAllReviews: jasmine.createSpy('getAllReviews').and.returnValue([]),
        addReview: jasmine.createSpy('addReview'),
        deleteReview: jasmine.createSpy('deleteReview'),
      };
  
      toReview = new ToReview(reviewsServiceMock);
    });
  
    it('should initialize correctly', () => {
      spyOn(toReview, 'render');
      toReview.init();
      expect(toReview.render).toHaveBeenCalled();
    });
  
    it('should render a list row item correctly', () => {
      const review = {
        review_id: 1,
        book_title: 'Test Book',
        author_name: 'Test Author',
        rating: 5,
        description: 'Test Description',
        reviewed_by: 'Test Reviewer',
      };
  
      const listRowItem = toReview._renderListRowItem(review);
      expect(listRowItem.tagName).toEqual('LI');
      expect(listRowItem.childNodes.length).toEqual(6);
    });
  
    it('should render a list correctly', () => {
      spyOn(toReview, '_renderListRowItem');
      const reviews = [
        { review_id: 1, book_title: 'Book 1', author_name: 'Author 1', rating: 5, description: 'Description 1', reviewed_by: 'Reviewer 1' },
        { review_id: 2, book_title: 'Book 2', author_name: 'Author 2', rating: 4, description: 'Description 2', reviewed_by: 'Reviewer 2' },
      ];
      toReview.reviews = reviews;
      toReview._renderList();
      expect(toReview._renderListRowItem).toHaveBeenCalledTimes(reviews.length);
    });
  
    it('should render a message when there are no reviews', () => {
      spyOn(toReview, '_createMsgElement').and.returnValue(document.createElement('div'));
      toReview._renderMsg();
      expect(toReview._createMsgElement).toHaveBeenCalled();
    });
  
    it('should add a review correctly', async () => {
      const newReview = {
        book_title: 'New Book',
        author_name: 'New Author',
        rating: 5,
        description: 'New Description',
        reviewed_by: 'New Reviewer',
      };
  
      await toReview.addReview(newReview);
      expect(reviewsServiceMock.addReview).toHaveBeenCalledWith(newReview);
      expect(toReview.reviews.length).toEqual(1);
    });
  
    it('should delete a review correctly', async () => {
      const reviewId = 1;
      spyOn(toReview, '_renderMsg');
      toReview.reviews = [{ review_id: reviewId }];
      await toReview.deleteReview(reviewId);
      expect(reviewsServiceMock.deleteReview).toHaveBeenCalledWith('', reviewId);
      expect(toReview.reviews.length).toEqual(0);
      expect(toReview._renderMsg).toHaveBeenCalled();
    });
  
    it('should create a message element correctly', () => {
      const msg = 'Test Message';
      const msgElement = toReview._createMsgElement(msg);
      expect(msgElement.tagName).toEqual('DIV');
      expect(msgElement.id).toEqual('user-message');
      expect(msgElement.textContent).toEqual(msg);
    });
  
    it('should render correctly', async () => {
      spyOn(toReview, '_renderList');
      spyOn(toReview, '_renderMsg');
      spyOn(window, 'storageHasData').and.returnValue(false);
      await toReview.render();
      expect(reviewsServiceMock.getAllReviews).toHaveBeenCalledWith('');
      expect(toReview._renderMsg).toHaveBeenCalled();
      expect(toReview._renderList).not.toHaveBeenCalled();
    });
  });
