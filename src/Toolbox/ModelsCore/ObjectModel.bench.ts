import { describe, bench } from 'vitest';
import { UserModel } from './Example/User';

const objectTest = {
    "lastname": "Moore",
    "firstname": "May",
    "age": 17,
    "address": {
        "street": "0326 Dakota Knoll",
        "city": "Protaras"
    },
    "parents": [4, 5],
    "roles": ["ROLE_NORMAL"]
}

describe('building ObjectModel', () => {
    bench('v1', () => {
        UserModel.OLD_buildFromObj(objectTest);
    });

    bench('v2', () => {
        UserModel.buildFromObj(objectTest);
    });
});
