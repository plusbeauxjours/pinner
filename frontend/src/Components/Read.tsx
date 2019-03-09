import React from "react";
import { RedDot } from "src/Icons";
import styled from "src/Styles/typed-components";

const Container = styled.div`
  position: absolute;
  svg {
    margin-left: 10px;
    fill: red;
  }
`;

interface IProps {
  isRead: boolean;
}

interface IState {
  isRead: boolean;
}

class Read extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isRead: props.isRead
    };
  }
  public render() {
    const { isRead } = this.state;

    return (
      <Container>
        {console.log(isRead)}
        {!isRead ? <RedDot /> : null}
      </Container>
    );
  }
  public toggleBtn = () => {
    this.setState(state => {
      return {
        isRead: true
      };
    });
    console.log(this.state);
  };
}

export default Read;