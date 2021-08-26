import { createStore, persist } from 'easy-peasy';
import model from './indexmodal';

const store = createStore(persist(model));

store.persist.clear();

export default store;