/**
 * 원격 JSON 파일에서 공항 데이터를 로드하고 성공이나 실패 액션을 발송하는
 * 액션 생성자를 호출한다. 브라우저에서 fetch를 지원하기 위해 'whatwg-fetch' npm
 * 모듈을 설치 및 임포트한다.
 */
import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
  fetchAirports() { //비행기(항공) 정보를 JSON 파일에서 fetch
    fetch('airports.json')
    .then((response) => response.json())
    .then((responseData) =>{
      // 구문 분석된 데이터를 전달하고 AirportActionCreators 성공 액션을 호출한다.
      AirportActionCreators.fetchAirportsSuccess(responseData);
    })
    .catch((error) => {
      // error 객체를 전달하고 AirportActionCreators 오류 액션을 호출한다.
      AirportActionCreators.fetchAirportsError(error);
    });
  },

  fetchTickets(origin, destination){ // 항공권 데이터를 가져오도록 함
    fetch('flights.json')
    .then((response) => response.json())
    .then((responseData) => {
      AirportActionCreators.fetchTicketsSuccess(responseData);
    })
    .catch((error) => {
      AirportActionCreators.fetchTicketsError(error);
    });
  }
};

export default AirCheapAPI;
