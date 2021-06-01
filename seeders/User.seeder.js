const userModel = require('../src/models/user.model');
const { Seeder } = require('mongoose-data-seed');

const data = [
  {
    _id: '60b4692859dd7f45e0c19119',
    Fname: 'default',
    Lname: 'default',
    Email: 'default@gmail.com',
    UserName: 'default123',
    Password: '1234',
    Age: 102,
    isActive: true,
    Group: ['60b51093f85b283d3cea6f75'],
  },
];

class UsersSeeder extends Seeder {
  async shouldRun() {
    const count = await userModel.UserModel.countDocuments().exec();

    return count === 0;
  }

  async run() {
    return userModel.UserModel.create(data);
  }
}

module.exports = UsersSeeder;
