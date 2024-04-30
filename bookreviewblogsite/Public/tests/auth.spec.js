describe('Authentication Functions', () => {
    let authServiceMock;
  
    beforeEach(() => {
      authServiceMock = {
        login: jasmine.createSpy('login'),
        register: jasmine.createSpy('register'),
        logout: jasmine.createSpy('logout'),
        isAuth: jasmine.createSpy('isAuth').and.returnValue(false),
      };
  
      window.authService = authServiceMock;
    });
  
    it('should call authService.login with correct parameters for doLogin', async () => {
      const e = { preventDefault: jasmine.createSpy('preventDefault') };
      const username = 'testuser';
      const password = 'testpassword';
  
      document.getElementById = jasmine.createSpy('getElementById').and.returnValue({ value: username }, { value: password });
  
      await doLogin(e);
  
      expect(e.preventDefault).toHaveBeenCalled();
      expect(authServiceMock.login).toHaveBeenCalledWith({ username, password });
    });
  
    it('should call authService.register with correct parameters for doRegister', async () => {
      const e = { preventDefault: jasmine.createSpy('preventDefault') };
      const username = 'testuser';
      const email = 'test@example.com';
      const password = 'testpassword';
  
      document.getElementById = jasmine.createSpy('getElementById').and.returnValue(
        { value: username },
        { value: email },
        { value: password }
      );
  
      await doRegister(e);
  
      expect(e.preventDefault).toHaveBeenCalled();
      expect(authServiceMock.register).toHaveBeenCalledWith({ username, email, password });
    });
  
    it('should call authService.logout for doLogout', () => {
      const e = { preventDefault: jasmine.createSpy('preventDefault') };
  
      doLogout(e);
  
      expect(e.preventDefault).toHaveBeenCalled();
      expect(authServiceMock.logout).toHaveBeenCalled();
    });
  
    it('should hide login element if user is authenticated', () => {
      authServiceMock.isAuth.and.returnValue(true);
      const login = { style: { display: 'block' } };
      const logout = { style: { display: 'none' } };
  
      doLogout();
  
      expect(login.style.display).toBe('none');
      expect(logout.style.display).toBe('block');
    });
  
    it('should display login element if user is not authenticated', () => {
      authServiceMock.isAuth.and.returnValue(false);
      const login = { style: { display: 'none' } };
      const logout = { style: { display: 'block' } };
  
      doLogout();
  
      expect(login.style.display).toBe('block');
      expect(logout.style.display).toBe('none');
    });
  });