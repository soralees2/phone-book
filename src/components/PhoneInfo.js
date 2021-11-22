// file: src/components/PhoneInfo.js
import React, { Component } from 'react';

class PhoneInfo extends Component {
  // info값을 전달해 주는것을 잊었을 경우 
  // info가 undefined일때 비구조화 할당을 통해 받아올수 없기 때문에
  // defaultProps로 값 초기화 해줌.
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    editing: false, // 수정버튼을 누르면 true로 설정
    // 유동적인 input의 값을 담기위해 각 필드값 설정
    name:'',
    phone:''
  }
  
  handelRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove에 id넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  // editing 값을 반전시켜주는 함수
  handelToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  // input에서 onChange이벤트 발생시 호출
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  // editing 값이 바뀔때 처리되는 로직
  componentDidUpdate(prevProps, prevState){
    const {info, onUpdate } = this.props;

    // 수정을 눌렀을땐 기존값이 input에 나타나고,
    // 수정을 적용할땐 input의 값을 부모에게 전달.

    if(!prevState.editing && this.state.editing){
      // editing 값이 false -> true로 전환될 때 info의 값을 state에 넣어줌
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if(prevState.editing && !this.state.editing){
      // editing값이 true-> false로 전환될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;
    // 수정모드
    if(editing){
      return(
        <div style={style}>
          <div>
              <input
                value={this.state.name}
                name="name"
                placeholder="이름"
                onChange={this.handleChange}
              />
          </div>
          <div>
            <input 
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handelToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      )
    }

    // 일반모드
    const { name, phone, id } = this.props.info;
    return (
      <div style={style}>
        <div><em>{id}</em></div>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handelToggleEdit}>수정</button>
        <button onClick={this.handelRemove}>삭제</button>
      </div>
    );
  }
}
export default PhoneInfo;