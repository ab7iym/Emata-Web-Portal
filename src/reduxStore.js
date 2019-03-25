import {createStore, combineReducers} from 'redux';

let myState={id : 0, name: 'bruno'}
const reducer =(state=myState,action)=>{
  if(action.type==='setInfo'){
    state = action.payload;
  }
  return state;
};
const reducer2 =(state={no1: 0, no2: 1},action)=>{
  if(action.type==='add'){
    state = action.payload.no1+action.payload.no2;
  }
  return state;
};
const store = createStore(combineReducers({reducer,reducer2}));
store.subscribe(()=>{});

store.dispatch({type:"add",payload:{no1: 30.35, no2: 91}});
store.dispatch({type:"setInfo",payload:{id : 1, name: 'alvin'}});