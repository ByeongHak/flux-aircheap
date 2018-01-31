/**
 * 모든 비동기 작업은 
 *   1) 비동기 작업 요청  2) 성공  3) 실패
 * dispatchAsync 메서드는 (1)promise 매개변수와
 * (2)비동기 작업의 단계를 나타내는 상수(request, success, failure)
 * (3)promise 확인 결과에 따라 자동으로 액션을 발송.
 * Object.assing 을 사용해야 하므로 npm install --save babel-polifill 설치 및 추가
 */
import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher{
  dispatch(action = {}) {
    console.log("Dispatched", action.type);
    super.dispatch(action);
  }
  /**
   * promise가 나타내는 비동기 작업에 대한 세 가지 액션을 발송
   */
   dispatchAsync(promise, types, payload){
     const { request, success, failure } = types;
     this.dispatch({type: request, payload: Object.assign({}, payload)});
     promise.then(
       response => this.dispatch({
         type: success,
         payload: Object.assign({}, payload, {response})
       }),
       error => this.dispatch({
         type: failure,
         payload: Object.assign({}, payload, {error})
       }),
     );
   }
}

export default new AppDispatcher();