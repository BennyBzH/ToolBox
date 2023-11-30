import ListModel from '../../Toolbox/Classes/ListModel/ListModel';
import { AddressModel } from '../../Models/Address';

export default class AddressList extends ListModel {
  constructor() {
    super(AddressModel);
  }
}
