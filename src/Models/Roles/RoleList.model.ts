import ListModel from '../../Toolbox/ModelsCore/ListModel'

export default class RoleList extends ListModel {
  constructor () {
    super((arg) => arg)
  }

  static ROLE_ADMIN = 'ROLE_ADMIN'
  static ROLE_NORMAL = 'ROLE_NORMAL'

  isAdmin (): boolean {
    return this.includes(RoleList.ROLE_ADMIN)
  }
}
