import ListModel from '../../ListModel';
import UserModel from './User.model';

export default class UserList extends ListModel {
  constructor() {
    super(UserModel);
  }

  getByAgeGt(gtAge: number) {
    return this.filter((item) => item.age > gtAge);
  }

  getByName(nameToSeach: string) {
    return this.filter(
      (item) =>
        item.firstname === nameToSeach ||
        item.lastname === nameToSeach ||
        item.getFullname() === nameToSeach
    );
  }

  first() {
    return this.at(0) || false;
  }
}
