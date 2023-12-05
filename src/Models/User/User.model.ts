import { AddressModel } from '../Address';
import ObjectModel from '../../Toolbox/ModelsCore/ObjectModel';
import Role from '../Roles/RoleList.model';

export default class User extends ObjectModel {
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
    return (this.age += n)
  }

  getFullname() {
    return this.fullname || `${this.firstname} ${this.lastname}`;
  }
}
