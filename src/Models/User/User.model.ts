import { AddressModel } from '../Address';
import AdvenceModel from '../../Toolbox/Classes/AdvenceModel/AdvenceModel';
import Role from '../Roles/RoleList.model';

export default class User extends AdvenceModel {
  fullname?: string;
  firstname?: string;
  lastname?: string;
  age: number = 0;
  address = AddressModel;
  roles = Role;
  parents?: [];
  #test: string;

  bbb = () => {
    return;
  };

  set aaa(test: string) {
    this.#test = test;
  }

  get aaa() {
    return this.#test;
  }

  addAge(n: number) {
    return (this.age += n);
  }

  getFullname() {
    return this.fullname || `${this.firstname} ${this.lastname}`;
  }
}
