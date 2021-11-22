// src/components/PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
      list: [],
      onRemove: () => console.warn('onRemove not defined'),
      onUpdate: () => console.warn('onUpdate not defined'),
    }

  //배열을 렌더링 하게 될 때에는 꼭 고유값을 key 로 사용해야 한다는 것 입니다. 
  // 그리고, 불변성 유지를 위하여 데이터를 조작 할 때에는 기존의 배열을 건들이지 않는 방식으로 해야 함.

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo 
          key={info.id} 
          info={info}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)
    );
    // 가끔씩은 데이터에 고유 값이 없을 수 도 있다. 
    // 그럴 때에는 만약에 key 값을 빼먹으면 렌더링이 되긴 하지만 개발자도구 콘솔에서 경고창이 뜨게 된다. 
    // 만약에 그 경고가 보고싶지 않다면 다음과 같이 작업 할 수 있습니다. index설정
    // const list = data.map(
    //     (info, index) => (<PhoneInfo key={index} info={info}/>)
    // );

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;