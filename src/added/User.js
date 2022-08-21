class User{
  constructor (role, email) {
    this.role = role;
    this.email = email;
    this.createdDate = new Date();
  }

  register(password) {

  }

  login(password) {

  }

  getProfileInfo() {

  }

  changePassword(oldPassword, newPassword) {

  }

}

module.exports = { User }
