/**
 * 액션은 앱에서 어떤 일이 일어나는지 알리기 위해 모든 스토어로 발송된다.
 * 즉, 메시지와 같은 역할을 하므로 비지니스 논리나 계산은 포함하지 않는다.
 */
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

let AirportActionCreators = {

  fetchAirports(origin, destination) {
    AppDispatcher.dispatchAsync(AirCheapAPI.fetchAirports(), {
      request: constants.FETCH_AIRPORTS,
      success: constants.FETCH_AIRPORTS_SUCCESS,
      failure: constants.FETCH_AIRPORTS_ERROR
    });
  },

  chooseAirport(target, code){
    AppDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT,
      target,
      code
    });
  },

  fetchTickets(origin, destination){
    AppDispatcher.dispatchAsync(AirCheapAPI.fetchTickets(origin, destination), {
      request: constants.FETCH_TICKETS,
      success: constants.FETCH_TICKETS_SUCCESS,
      failure: constants.FETCH_TICKETS_SUCCESSETS,
    }) 
  }

};

export default AirportActionCreators;
