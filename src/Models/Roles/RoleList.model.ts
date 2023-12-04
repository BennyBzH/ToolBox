import ListModel from "../../Toolbox/Classes/ListModel/ListModel";

export default class RoleList extends ListModel {
    constructor() {
        super(String);
    }

    static ROLE_ADMIN = 'ROLE_ADMIN';
    static ROLE_NORMAL = 'ROLE_NORMAL';

    isAdmin() {
        return this.includes(RoleList.ROLE_ADMIN);
    }
}
