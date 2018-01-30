/**
 *  Autosuggest 실습을 위해 버전 하향 reart, react-DOM v.16 -> v. 15
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Container} from 'flux/utils';
import Autosuggest from 'react-autosuggest-legacy';
import AirportStore from './stores/AirportStore';
import AirportActionCreators from './actions/AirportActionCreators';

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

  render() {
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
                       inputAttributes={{placeholder:'From'}} />

          <Autosuggest id='destination'
                       suggestions={this.getSuggestions.bind(this)}
                       inputAttributes={{placeholder:'To'}} />
          </div>
        </header>
      </div>
    );
  }
}

App.getStores = () => ([AirportStore]);
App.calculateState = (prevState) => ({
  airports: AirportStore.getState(),
});

const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('root'));
