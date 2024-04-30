describe('API Functions', () => {
    let fetchSpy;
  
    beforeEach(() => {
      fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        })
      );
    });
  
    afterEach(() => {
      fetchSpy.and.callThrough();
    });
  
    it('should call fetch with correct parameters for _get', async () => {
      const url = 'https://example.com';
      await _get(url);
  
      expect(fetchSpy).toHaveBeenCalledWith(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer `,
          'Content-Type': 'application/json',
        },
      });
    });
  
    it('should call fetch with correct parameters for _post', async () => {
      const url = 'https://example.com';
      const data = { key: 'value' };
      await _post(url, data);
  
      expect(fetchSpy).toHaveBeenCalledWith(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    });
  
    it('should call fetch with correct parameters for _put', async () => {
      const url = 'https://example.com';
      const data = { key: 'value' };
      await _put(url, data);
  
      expect(fetchSpy).toHaveBeenCalledWith(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer `,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    });
  
    it('should call fetch with correct parameters for _delete', async () => {
      const url = 'https://example.com';
      await _delete(url);
  
      expect(fetchSpy).toHaveBeenCalledWith(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer `,
          'Content-Type': 'application/json',
        },
      });
    });
  });