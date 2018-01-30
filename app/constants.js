export default {
  FETCH_AIRPORTS: 'fetch airports', // 모든 공항을 가져올 때 발송할 액션
  FETCH_AIRPORTS_SUCCESS: 'fetch airports success', // 성공 (비동기)
  FETCH_AIRPORTS_ERROR: 'fetch airports error', // 실패 (비동기)
  CHOOSE_AIRPORT: 'choose airport', // 사용자의 공항 선택(출발 공항 또는 도착 공항)을 나타내는 동기 액션
  FETCH_TICKETS: 'fetch tickets', // 출발 공항과 도착 공항을 모두 선택했을 때 발송하는 액션
  FETCH_TICKETS_SUCCESS: 'fetch tickets success', // 성공 (비동기)
  FETCH_TICKETS_ERROR: 'fetch tickets error' // 실패 (비동기)
};
