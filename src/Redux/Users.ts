import { action, Action } from 'easy-peasy'
import Idata from '../components/interfaces'
export interface UsersModel {
  items: Idata[];
  userDetails: Idata;
  createUser: Action<UsersModel, Idata>;
  setUserInfo: Action<UsersModel, Idata>;
  removeUser: Action<UsersModel, number | string>;
  updateUser: Action<UsersModel, Idata>;
}

const users: UsersModel = {
  items: [],
  userDetails: {
    userId: '',
    userName: '',
    userEmail: '',
    userAge: 0

  },
  createUser: action((state, payload) => {
    state.items.push(payload);
  }),
  removeUser: action((state, payload) => {
    state.items = state.items.filter((user) => user.userId !== payload);
  }),
  updateUser: action((state, payload) => {
    const userUpdateIndex = state.items.findIndex((user) => {
      return user.userId === payload.userId
    });
      if(userUpdateIndex !== undefined){
        state.items[userUpdateIndex].userName = payload.userName
        state.items[userUpdateIndex].userEmail = payload.userEmail
        state.items[userUpdateIndex].userAge = payload.userAge
      }
  }),
  setUserInfo: action((state, payload) => {
    const userDetailsOnFind = state.items.find(val => val.userId === payload.userId);
    if(userDetailsOnFind?.userId === payload.userId)
    {
      state.userDetails.userId = userDetailsOnFind.userId
      state.userDetails.userName = userDetailsOnFind.userName;
      state.userDetails.userEmail = userDetailsOnFind.userEmail;
      state.userDetails.userAge = userDetailsOnFind.userAge;
    }
  }),
};

export default users;