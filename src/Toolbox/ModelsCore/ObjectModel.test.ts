import { describe, expect, test } from 'vitest';
import { UserModel } from './Example/User';
import { AddressModel } from './Example/Address';

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

describe('User', () => {
  test('should initialize without build', () => {
    const user = new UserModel();
    expect(user.fullname).toBeUndefined();
    expect(user.firstname).toBeUndefined();
    expect(user.lastname).toBeUndefined();
    expect(user.age).toBe(0);
    expect(user.address).toBe(AddressModel);
    expect(user.parents).toBeUndefined();
  });

  test('should initialize with build', () => {
    const user = UserModel.buildFromObj(objectTest);
    expect(user.fullname).toBeUndefined();
    expect(user.firstname).toBe(objectTest.firstname);
    expect(user.lastname).toBe(objectTest.lastname);
    expect(user.age).toBe(objectTest.age);
    expect(user.address).toStrictEqual(AddressModel.buildFromObj(objectTest.address));
    expect(user.parents).toBe(objectTest.parents);
  });

  test('Method exist and can be used', () => {
    const user = UserModel.buildFromObj(objectTest);
    expect(user.age).toBe(objectTest.age);
    expect(user.ageIsGt(17)).toBe(false);
    expect(user.addAge).toBeTypeOf('function');
    user.addAge(1);
    expect(user.age).toBe(objectTest.age + 1);
    expect(user.ageIsGt(17)).toBe(true)
  });
});