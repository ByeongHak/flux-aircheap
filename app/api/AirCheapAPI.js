/**
 * 원격 JSON 파일에서 공항 데이터를 로드하고 성공이나 실패 액션을 발송하는
 * 액션 생성자를 호출한다. 브라우저에서 fetch를 지원하기 위해 'whatwg-fetch' npm
 * 모듈을 설치 및 임포트한다.
 */
import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
  fetchAirports() {
    return fetch('airports.json')
    .then((response) => response.json())
    .then((responseData) =>{
      // 구문 분석된 데이터를 전달하고 AirportActionCreators 성공 액션을 호출한다.
      AirportActionCreators.fetchAirportsSuccess(responseData);
    })
    .catch((error) => {
      // error 객체를 전달하고 AirportActionCreators 오류 액션을 호출한다.
      AirportActionCreators.fetchAirportsError(error);
    })
  }
};

export default AirCheapAPI;
