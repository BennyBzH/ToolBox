import ListModel from '../../Toolbox/ModelsCore/ListModel';
import { AddressModel } from '../../Models/Address';

export default class AddressList extends ListModel {
  constructor() {
    super(AddressModel);
  }
}
