  
import users, { UsersModel } from './Users';

export interface StoreModel {
  users: UsersModel;
}

const model: StoreModel = {
  users
};

export default model;