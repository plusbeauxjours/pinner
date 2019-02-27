import React from "react";
import Helmet from "react-helmet";
import countries from "../../countries";
import Input from "../../Components/Input";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import Wrapper from "src/Components/Wrapper";

const Container = styled.div`
  margin-top: 10px;
  padding: 20px 10px;
`;

const CountrySelect = styled.select`
  font-size: 20px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
`;

const CountryOption = styled.option``;

const Form = styled.form``;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 110%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
	`;

const Modal = styled.div`
  background-color: white;
  border-radius: 12px;
  max-width: 935px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  countryCode: string;
  phoneNumber: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  back: any;
}

const PhoneLoginPresenter: React.SFC<IProps> = ({
  countryCode,
  phoneNumber,
  onInputChange,
  onSubmit,
  loading,
  back
}) => (
  <ModalContainer>
    <ModalOverlay onClick={back} />
    <Modal>
      <Wrapper>
        <Container>
          <Helmet>
            <title>Phone Login . Pinner </title>
          </Helmet>
          <CountrySelect
            value={countryCode}
            name={"countryCode"}
            onChange={onInputChange}
          >
            {countries.map((country, index) => (
              <CountryOption key={index} value={country.dial_code}>
                {country.flag} {country.name} ({country.dial_code})
              </CountryOption>
            ))}
          </CountrySelect>
          <Form onSubmit={onSubmit}>
            <Input
              placeholder={"080 383 2506"}
              value={phoneNumber}
              name={"phoneNumber"}
              onChange={onInputChange}
            />
          </Form>
        </Container>
      </Wrapper>
    </Modal>
  </ModalContainer>
);

export default PhoneLoginPresenter;
