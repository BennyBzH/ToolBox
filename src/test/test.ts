import { UserListModel, UserModel } from '../Models/User';
import data from './user.data.json';

const user1 = data[0];

const pickUser = UserModel.buildFromObj(user1, () => ({}));

console.log({ pickUser, fullname: pickUser.getFullname() });
