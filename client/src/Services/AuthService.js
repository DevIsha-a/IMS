import AppInstance from "../Config/global.axios";

export class AuthService {
  // USER SIGN IN
  async SignIn(user) {
    const response = await AppInstance({
      url: '/auth/sign-in',
      method: 'POST',
      data: user
    });
    console.log(response.data.message);
    return response;
  }

  // USER SIGN UP

  async SignUp(user) {
    const response = await AppInstance({
      url: '/auth/sign-up',
      method: 'POST',
      data: user
    });
    console.log(response.data.message);
    return response;
  }
}