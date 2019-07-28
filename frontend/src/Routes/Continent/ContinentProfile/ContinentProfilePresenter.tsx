import React from "react";
import styled from "../../../Styles/typed-components";
import { Link } from "react-router-dom";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import UserBox from "src/Components/UserBox";
import CoffeeBox from "src/Components/CoffeeBox";
import LocationBox from "src/Components/LocationBox";
import { List } from "../../../Icons";
import { keyframes } from "styled-components";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  @media screen and (max-width: 935px) {
    margin: 0 10px 0 10px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(128, 128, 128, 0.5);
  }
  &:not(:last-child) {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 700px) {
    margin-right: 0px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  background-color: ${props => props.theme.darkModeBgColor};
  padding: 5px;
  color: white;
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    text-align: right;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationName = styled.span`
  font-size: 30px;
  font-weight: 300;
  margin: 5px 5px 5px 0;
  text-transform: uppercase;
`;

const NameContainer = styled.span`
  width: 100%;
  margin: 0px auto;
  padding: 55px 15px 0 15px;
  max-width: 935px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ListIcon = styled.span`
  display: flex;
  flex-direction: row;
  display: flex;
  cursor: pointer;
  margin-top: 7px;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
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

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
`;

const ModalLink = styled.div`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  }
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(128, 128, 128, 0.5);
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  data?: any;
  loading: boolean;
  coffeeData?: any;
  coffeeLoading: boolean;
  continentCode: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  countryList: any;

  currentCityId: string;
  reportModalOpen: boolean;
  toggleReportModal: () => void;
  slackReportLocations: (targetLocationId: string, payload: string) => void;
}

const ContinentProfilePresenter: React.FunctionComponent<IProps> = ({
  data: {
    continentProfile: {
      continent = null,
      countries = null,
      usersNow = null,
      usersBefore = null,
      continents = null
    } = {}
  } = {},
  loading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  continentCode,
  onChange,
  search,
  countryList,

  currentCityId,
  reportModalOpen,
  toggleReportModal,
  slackReportLocations
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && continent) {
    return (
      <>
        {reportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleReportModal} />
            <Modal>
              <ModalLink
                onClick={() =>
                  slackReportLocations(continent.continentCode, "PHOTO")
                }
              >
                Inappropriate Photos
              </ModalLink>
              <ModalLink
                onClick={() =>
                  slackReportLocations(continent.continentCode, "LOCATION")
                }
              >
                Wrong Location
              </ModalLink>

              <ModalLink
                onClick={() =>
                  slackReportLocations(continent.continentCode, "OTHER")
                }
              >
                Other
              </ModalLink>
              <ModalLink onClick={toggleReportModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar size="lg" url={continent.continentPhoto} city={true} />
              <NameContainer>
                <LocationName>{continent.continentName}</LocationName>
                <ListIcon onClick={toggleReportModal}>
                  <List />
                </ListIcon>
              </NameContainer>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <SText
                  text={continent.countryCount === 1 ? `COUNTRY` : `COUNTRIES`}
                />
                <Input
                  placeholder="Search user who is in this continent"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {countryList.length !== 0 &&
                countryList.map(country => (
                  <UserRow key={country.id}>
                    <Link
                      to={{
                        pathname: `/country/${country.countryCode}`,
                        state: { countryName: country.countryName }
                      }}
                    >
                      <Header>
                        <SAvatar
                          size={"sm"}
                          url={country.countryPhoto}
                          city={true}
                        />
                        <HeaderColumn>
                          <HeaderText text={country.countryName} />
                          <Location>{country.continent.continentName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                  </UserRow>
                ))}
              {countryList.length === 0 &&
                !search &&
                countries &&
                countries.map(country => (
                  <UserRow key={country.id}>
                    <Link
                      to={{
                        pathname: `/country/${country.countryCode}`,
                        state: { countryName: country.countryName }
                      }}
                    >
                      <Header>
                        <SAvatar
                          size={"sm"}
                          url={country.countryPhoto}
                          city={true}
                        />
                        <HeaderColumn>
                          <HeaderText text={country.countryName} />
                          <Location>{country.continent.continentName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                  </UserRow>
                ))}
            </UserContainer>
          </PHeader>
          {usersNow && usersNow.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersNow}
                currentContinentCode={continentCode}
                type={"usersNow"}
              />
            </>
          ) : null}
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersBefore}
                currentContinentCode={continentCode}
                type={"usersBefore"}
              />
            </>
          ) : null}
          <CoffeeBox
            coffees={coffees}
            coffeeLoading={coffeeLoading}
            cityId={currentCityId}
            currentContinentCode={continentCode}
          />
          <LocationBox
            continents={continents}
            continentCode={continentCode}
            title={"CONTINENTS"}
            loading={loading}
          />
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default ContinentProfilePresenter;
