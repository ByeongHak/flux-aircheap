/**
 * 원격 JSON 파일에서 공항 데이터를 로드하고 성공이나 실패 액션을 발송하는
 * 액션 생성자를 호출한다. 브라우저에서 fetch를 지원하기 위해 'whatwg-fetch' npm
 * 모듈을 설치 및 임포트한다.
 */
import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
  fetchAirports() { //비행기(항공) 정보를 JSON 파일에서 fetch => promise로 전달
    return fetch('airports.json').then((response) => response.json());
  },

  fetchTickets(origin, destination){ // 항공권 데이터를 가져오도록 함 => promise로 전달
    return fetch('flights.json').then((response) => response.json());
  }
};

export default AirCheapAPI;
