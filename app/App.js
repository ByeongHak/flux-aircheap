/**
 *  Autosuggest 실습을 위해 버전 하향 reart, react-DOM v.16 -> v. 15
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Container} from 'flux/utils';
import Autosuggest from 'react-autosuggest-legacy';
import AirportStore from './stores/AirportStore';
import AirportActionCreators from './actions/AirportActionCreators';
import RouteStore from './stores/RouteStore';
import TicketStore from './stores/TicketStore';
import TicketItem from './components/TicketItem';

class App extends Component {
  //공항자동완성 필드
  getSuggestions(input, callback) { // 사용자가 입력한 텍스트, 자동완성 리스트를 전달하고 호출할 콜백함수
    const escapedInput = input.trim().toLowerCase();  // 후행 공백 제거 및 모두 소문자 전환
    const airportMatchRegex = new RegExp('\\b' + escapedInput, 'i'); // 정규표현식을 이용해 도시명을 기준으로 공항의 리스트를 필터링
    const suggestions = this.state.airports 
      .filter(airport => airportMatchRegex.test(airport.city)) // 사용자가 입력한 내용과 일치하는 단어가
      .sort((airport1, airport2) => { //가장 먼저 표시되게 하고
        return airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput)
      })
      .slice(0, 7) // 최대 7개로 제한하며
      .map(airport => `${airport.city} - ${airport.country} (${airport.code})`); // "도시 이름 - 도시 약억(공항코드)" 포맷으로
    callback(null, suggestions); // 매핑하도록  수행한다.
  }

  componentDidMount(){
    AirportActionCreators.fetchAirports(); //초기 JSON 데이터를 fetch 한다.
  }
  // 사용자가 공항을 선택할 때마다 chooseAirport 액션 생성자가 호출하므로 결과적으로
  // ReduceStorer가 변경 이벤트를 발송하고 App 컴포넌트가 업데이트 된다.
  componentWillUpdate(nextProps, nextState){
    // fetchTickets 액션 생성자를 호출하기 전에 출발 공항과 도착 공항이 모두 선택되었는지,
    let originAndDestinationSelected = nextState.origin && nextState.destination;
    // 그리고 둘중 하나가 최근 업데이트 이후 변경됐는지 여부를 확인한다. (이미 가져온 데이터를 다시 가져오지 않기 위해) 
    let selectionHasChangedSinceLastUpdate = ( nextState.origin !== this.state.origin ) || ( nextState.destination !== this.state.destination );
    if(originAndDestinationSelected && selectionHasChangedSinceLastUpdate){
      console.log("------------------------fetchTickets---------------------------------")
      // 사용자가 출발 공항과 도착 공항을 모두 선택하면 fetchTickets 액션 생셩자를 호출한다.
      AirportActionCreators.fetchTickets(nextState.origin, nextState.destination);
    }
  }
  
  // 출발 공항과 도착 공항을 선택하면 choosAirport 액션 생성자를 호출한다. 
  handleSelect(target, suggestion, event){
    const airportCodeRegex = /\(([^)]+)\)/;
    let airportCode = airportCodeRegex.exec(suggestion)[1];
    AirportActionCreators.chooseAirport(target, airportCode);
  }

  render() {
    let ticketList = this.state.tickets.map((ticket)=>(
      <TicketItem key={ticket.id} ticket={ticket} />
    ));
    return (
      <div>
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35"/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>
          <div className="header-route">
          <Autosuggest id='origin'
                       suggestions={this.getSuggestions.bind(this)}
                       onSuggestionSelected={this.handleSelect.bind(this,'origin')} 
                       inputAttributes={{placeholder:'From'}} />

          <Autosuggest id='destination'
                       suggestions={this.getSuggestions.bind(this)}
                       onSuggestionSelected={this.handleSelect.bind(this,'destination')}
                       inputAttributes={{placeholder:'To'}} />
          </div>
        </header>
        <div>
          {ticketList}
        </div>
      </div>
    );
  }
}

// 컴포넌트가 두 스토어(RouteStore 및 TicketStore)의 업데이트를 수신하고 두 스토어의 상태를 이용해
// 자체 상태를 계산하도록 수정해야 한다. 
App.getStores = () => ([AirportStore, RouteStore, TicketStore]); 
App.calculateState = (prevState) => ({
  airports: AirportStore.getState(),
  origin: RouteStore.getState().get("origin"),
  destination: RouteStore.getState().get('destination'),
  tickets: TicketStore.getState()
});

const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('root'));
