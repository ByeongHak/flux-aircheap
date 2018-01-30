/**
 * 사용자가 선택한 출발 공항과 도착 공항을 포함한다.
 */
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

class RouteStore extends ReduceStore {
  getInitialState(){
    return Immutable.Map();
  }
  reduce(state, action){
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
        // action.target은 "origin"이나 "destination" 일 수 있다.
        // action.code 선택된 공항 코드를 포함한다.
        return state.set(action.target, action.code);
      default:
        return state;
    }
  }
}
export default new RouteStore(AppDispatcher);
