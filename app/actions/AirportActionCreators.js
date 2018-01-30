/**
 * 액션은 앱에서 어떤 일이 일어나는지 알리기 위해 모든 스토어로 발송된다.
 * 즉, 메시지와 같은 역할을 하므로 비지니스 논리나 계산은 포함하지 않는다.
 */
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

let AirportActionCreators = {
  fetchAirports() {
    AirCheapAPI.fetchAirports(); // 1) 초기 JSON 데이터를 읽어 온 후,
    AppDispatcher.dispatch({ // 2) 액션 발생
      type: constants.FETCH_AIRPORTS,
    })
  },

  fetchAirportsSuccess(response) {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_SUCCESS, // 3) JSON FETCH 성공일 경우
      payload: {response} //4)  JSON 값을 스토어에 전달
    });
  },

  fetchAirportsError(error){
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: {error}
    })
  }


};

export default AirportActionCreators;
