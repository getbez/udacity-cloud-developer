import passwordService from "../service/passwordService.js";

class UserService {
  
  async findByEmail(email) {
   
    const { hashedPassword, salt } = await passwordService.hashPassword('password')
    //hardcoding user as not wise to create RDS instance for this demo
    return {
        email: 'test@email.com',
        hashedPassword,
        salt
    }

  }
}

export default new UserService();
