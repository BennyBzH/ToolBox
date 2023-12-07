import ObjectModel from '../../ObjectModel';
import { AddressModel } from '../Address';
import Role from '../Roles/RoleList.model';

export default class User extends ObjectModel {
  fullname?: string;
  firstname?: string;
  lastname?: string;
  age: number = 0;
  address = AddressModel;
  roles = Role;
  parents?: [];
  
  addAge(n: number) {
    return (this.age += n)
  }

  ageIsGt(moreThan: number) {
    return (this.age > moreThan);
  }

  getFullname() {
    return this.fullname || `${this.firstname} ${this.lastname}`;
  }
}
