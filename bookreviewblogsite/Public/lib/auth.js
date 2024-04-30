const doLogin = async (e) => {
    e.preventDefault();

      // Check if the user is already logged in
      if (authService.isAuth()) {
        // User is already logged in, show prompt
        alert('You are already logged in.');
        return;
    }
  
    const username = document.getElementById('formInputUsername').value;
    const password = document.getElementById('formInputPassword').value;
  
    try {
      const res = await authService.login({ username, password });
    console.log(res,"user res..........");
      const { auth, expires_in, access_token, refresh_token , user_id} = res;
      const expiryDate = authService.setExpiration(expires_in);
  
      setStorage('isAuth', auth);
      setStorage('expires_in', expiryDate);
      setStorage('access_token', access_token);
      setStorage('refresh_token', refresh_token);
      setStorage('user_id', user_id);
  
      if (res) {
        window.location.href = 'reviews/reviews.html';
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Unauthorized (username or password incorrect)
        alert('Incorrect username or password. Please try again.');
      //alert('Failed to login. Please try again later.');
    }else {
      // Other error (e.g., network error)
      alert('Failed to login. Please try again later.');
  }
}
  };
  
  const doRegister = async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('formInputUsernameReg').value;
    const email = document.getElementById('formInputEmailReg').value;
    const password = document.getElementById('formInputPasswordReg').value;
   
    console.log(username);
    console.log(email);
    console.log(password);
   
    try {
      const res = await authService.register({
        username,
        email,
        password,
      });
      console.log(res.data);
      if (res) {
        window.location.href = '/';
      }
    } catch (err) {
      alert('Failed to register. Please try again later.');
      console.log(err);
    }
  };
  
  const doLogout = (e) => {
    e.preventDefault();
    authService.logout();
  };
  
  (() => {
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    if (!authService.isAuth()) {
      if (login) {
        login.style.display = 'block';
      } else {
        logout.style.display = 'none';
      }
    } else {
      if (login) {
        login.style.display = 'none';
      } else {
        logout.style.display = 'block';
      }
    }
  })();