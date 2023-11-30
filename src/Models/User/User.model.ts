import { AddressModel } from '../Address';
import AdvenceModel from '../../Toolbox/Classes/AdvenceModel/AdvenceModel';

export default class User extends AdvenceModel {
  fullname?: string;
  firstname?: string;
  lastname?: string;
  age: number = 0;
  address = AddressModel;
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
