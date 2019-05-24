import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Gear, List } from "../../Icons";
import styled, { keyframes } from "../../Styles/typed-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { Upload } from "../../Icons";
import { countries } from "../../countryData";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import FollowBtn from "../../Components/FollowBtn";
import AvatarGrid from "../../Components/AvatarGrid";
import GetCards from "../../Components/GetCards";
import Weather from "../../Components/Weather";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 300px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px 0 20px 0;
`;

const NameContainer = styled.span`
  margin-bottom: 20px;
`;

const GearContainer = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 200px;
  width: 200px;
  margin-right: 20px;
  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 600px) {
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

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const TripOverlay = styled.div`
  z-index: 1;
  opacity: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.3s ease-in-out;
    &:hover {
      fill: red;
    }
  }
  transition: opacity 0.3s ease-in-out;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 3fr 1fr 1fr 1fr 0.2fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  &:hover {
    ${TripOverlay} {
      opacity: 1;
    }
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const TripRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  padding: 0 5px 0 5px;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const TripHeader = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const THeader = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityPhoto = styled.img<ITheme>`
  display: flex;
  width: ${props => {
    if (props.size === "md") {
      return "200px";
    } else if (props.size === "sm") {
      return "50px";
    } else {
      return "200px";
    }
  }};
  height: ${props => {
    if (props.size === "md") {
      return "200px";
    } else if (props.size === "sm") {
      return "50px";
    } else {
      return "200px";
    }
  }};
  background-size: cover;
  border-radius: 3px;
  object-fit: cover;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 70px 0 70px;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

const TripIcon = styled(Icon)`
  align-self: center;
  justify-self: center;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
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

const Row = styled.div`
  display: flex;
  padding: 5px;
`;

const UBold = styled(Bold)`
  display: flex;
  align-self: flex-end;
  font-weight: 100;
  font-size: 7px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
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

const TripModal = styled.div`
  z-index: 10;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  animation: ${ModalAnimation} 0.1s linear;
`;

const DateRangePickerContainer = styled.div`
  display: flex;
  align-self: center;
  z-index: 10;
`;

const TripModalContainer = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Modal = styled.div`
  background-color: #2d3a41;
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
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
    border-bottom: 1px solid #efefef;
  }
`;

const Input = styled.input`
  z-index: 10;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: white;
  background-color: transparent;
  font-size: 12px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
  animation: ${ModalAnimation} 0.1s linear;
`;

const TripInputContainer = styled.div`
  z-index: 10;
  top: 30%;
  width: 30%;
  border: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const SearchCitiesInput = styled(Input)`
  margin-top: 20px;
  font-size: 34px;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const TripBox = styled.div`
  width: 905px;
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  margin: 0 10px 25px 0;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-position: cover;
  background-size: 100%;
`;

const SSText = styled(Bold)`
  font-size: 12px;
  font-weight: 100;
`;

const SmallTitle = styled(Title)`
  flex-direction: column;
  align-items: center;
`;

const SmallGreyLine = styled(GreyLine)`
  width: 40%;
`;

const GreyText = styled(Bold)`
  color: #999;
`;

const TripInput = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 12px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const Select = styled.select`
  font-size: 12px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #2d3a41;
  border: 0;
  margin-bottom: 20px;
  width: 90%;
`;

const Option = styled.option``;

interface ITheme {
  size?: string;
}

interface IProps {
  userProfileData: any;
  userProfileLoading: boolean;

  getTripsData?: any;
  getTipsLoading: boolean;

  knowingFollowersData: any;
  knowingFollowersLoading: boolean;

  coffeeData?: any;
  coffeeLoading: boolean;

  modalOpen: boolean;
  confirmModalOpen: boolean;

  searchTripCitiesData: any;
  searchTripCitiesLoading: boolean;

  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  requestModalOpen: boolean;
  coffeeModalOpen: boolean;
  requestingCoffeeModalOpen: boolean;
  coffeeReportModalOpen: boolean;
  profilFormModalOpen: boolean;

  editMode: boolean;
  openEditMode: () => void;

  userName: string;
  bio: string;
  gender: string;
  avatar: string;
  nationality: string;
  email: string;
  firstName: string;
  lastName: string;
  cityName: string;
  cityPhoto: string;
  countryName: string;

  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  tripStartDate: moment.Moment | null;
  tripEndDate: moment.Moment | null;
  focusedInput: "startDate" | "endDate" | null;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  onFocusChange: (arg: "startDate" | "endDate" | null) => void;

  toggleModal: () => void;
  toggleConfirmModal: () => void;

  toggleTripModal: any;
  toggleTripConfirmModal: () => void;
  toggleAddTripModal: () => void;
  toggleEditTripModal: () => void;

  toggleRequestModal: () => void;
  toggleCoffeeModal: () => void;
  toggleRequestingCoffeeModal: () => void;
  toggleCoffeeReportModal: () => void;
  toggleProfileFormModal: () => void;

  logUserOutFn: () => void;

  confirmDeleteProfile: () => void;
  addTrip: () => void;
  editTrip: () => void;
  deleteTrip: () => void;
  gotoTrip: (
    cityName: string,
    cityPhoto: string,
    countryName: string,
    tripStartDate: moment.Moment | null,
    tripEndDate: moment.Moment | null
  ) => void;

  submitCoffee: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;

  deleteCoffee: () => void;
  getCoffeeId: any;
  getRequestingCoffeeId: any;
  username: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  tripList: any;
  isDayBlocked: any;
}

const UserProfilePresenter: React.SFC<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} } = {},
  userProfileLoading,

  getTripsData: { getTrips: { trip: getTrips = null } = {} } = {},
  getTipsLoading,

  knowingFollowersData: {
    getKnowingFollowers: {
      count = null,
      profiles: knowingFollowers = null
    } = {}
  } = {},
  knowingFollowersLoading,

  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,

  searchTripCitiesData: { searchTripCities: { cities = null } = {} } = {},
  searchTripCitiesLoading,

  modalOpen,
  tripModalOpen,
  confirmModalOpen,
  tripConfirmModalOpen,
  tripAddModalOpen,
  tripEditModalOpen,

  requestModalOpen,
  coffeeModalOpen,
  requestingCoffeeModalOpen,
  coffeeReportModalOpen,
  profilFormModalOpen,

  editMode,

  toggleModal,
  toggleConfirmModal,
  toggleTripModal,
  toggleTripConfirmModal,
  toggleAddTripModal,
  toggleEditTripModal,

  toggleRequestModal,
  toggleCoffeeModal,
  toggleRequestingCoffeeModal,
  toggleCoffeeReportModal,
  toggleProfileFormModal,
  openEditMode,
  logUserOutFn,
  confirmDeleteProfile,
  addTrip,
  editTrip,
  deleteTrip,
  gotoTrip,
  onInputChange,
  onSelectChange,
  onKeyUp,
  userName,
  bio,
  gender,
  firstName,
  lastName,
  avatar,
  nationality,
  email,
  cityName,
  cityPhoto,
  countryName,
  startDate,
  endDate,
  tripStartDate,
  tripEndDate,
  focusedInput,
  onDatesChange,
  onFocusChange,
  submitCoffee,
  deleteCoffee,
  getCoffeeId,
  getRequestingCoffeeId,
  username,
  search,
  onChange,
  tripList,
  isDayBlocked
}) => {
  if (userProfileLoading) {
    return <Loader />;
  } else if (user) {
    return (
      <>
        {(!user.profile.nationality ||
          !user.profile.gender ||
          !user.profile.email) &&
          profilFormModalOpen &&
          user.profile.isSelf && (
            <ModalContainer>
              <ModalOverlay onClick={toggleProfileFormModal} />
              <Modal>
                <ModalLink>
                  <Input
                    onChange={onInputChange}
                    type={"text"}
                    value={username}
                    placeholder={user.username}
                    name={"userName"}
                    onKeyUp={onKeyUp}
                    autoComplete={"off"}
                  />
                </ModalLink>
                <ModalLink>
                  <Input
                    onChange={onInputChange}
                    type={"text"}
                    value={avatar}
                    placeholder={user.profile.avatar}
                    name={"avatar"}
                    onKeyUp={onKeyUp}
                    autoComplete={"off"}
                  />
                </ModalLink>
                <ModalLink>
                  <Input
                    onChange={onInputChange}
                    type={"text"}
                    value={bio}
                    placeholder={"bio"}
                    name={"bio"}
                    onKeyUp={onKeyUp}
                    autoComplete={"off"}
                  />
                </ModalLink>
                {!user.profile.nationality ? (
                  <ModalLink>
                    <Select
                      value={nationality}
                      name={"nationality"}
                      onChange={onSelectChange}
                    >
                      {countries.map((country, index) => (
                        <Option key={index} value={country.code}>
                          {country.emoji} {country.name}
                        </Option>
                      ))}
                    </Select>
                  </ModalLink>
                ) : null}
                {!user.profile.gender ? (
                  <ModalLink>
                    <Select
                      value={gender}
                      name={"gender"}
                      onChange={onSelectChange}
                    >
                      <Option value={""}>-</Option>
                      <Option value={"M"}>Masculine</Option>
                      <Option value={"F"}>Feminine</Option>
                      <Option value={"GQ"}>Genderqueer</Option>
                    </Select>
                  </ModalLink>
                ) : null}
                {!user.profile.email ? (
                  <ModalLink>
                    <Input
                      onChange={onInputChange}
                      type={"text"}
                      value={email}
                      placeholder={"email"}
                      name={"email"}
                      onKeyUp={onKeyUp}
                    />
                  </ModalLink>
                ) : null}
              </Modal>
            </ModalContainer>
          )}
        {requestingCoffeeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestingCoffeeModal} />
            <Modal>
              <ModalLink onClick={() => console.log("COFFEE DETAIL")}>
                COFFEE DETAIL
              </ModalLink>
              <ModalLink onClick={() => console.log("EDIT COFFEE")}>
                EDIT COFFEE
              </ModalLink>
              <ModalLink onClick={() => deleteCoffee()}>
                CANCEL COFFEE
              </ModalLink>
              <ModalLink onClick={toggleRequestingCoffeeModal}>
                CANCEL
              </ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeModal} />
            <Modal>
              <ModalLink onClick={() => console.log("COFFEE DETAIL")}>
                COFFEE DETAIL
              </ModalLink>
              <ModalLink onClick={() => deleteCoffee()}>
                DELETE COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {coffeeReportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCoffeeReportModal} />
            <Modal>
              <ModalLink onClick={() => console.log("REPORT COFFEE")}>
                REPORT COFFEE
              </ModalLink>
              <ModalLink onClick={toggleCoffeeReportModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {requestModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestModal} />
            <Modal>
              <ModalLink onClick={() => submitCoffee("everyone")}>
                EVERYONE
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("nationality")}>
                NATIONALITY
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("gender")}>
                GENDER
              </ModalLink>
              <ModalLink onClick={() => submitCoffee("followers")}>
                FOLLOWERS
              </ModalLink>
              <ModalLink onClick={toggleRequestModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={openEditMode}>Edit Profile</ModalLink>
              <ModalLink onClick={toggleConfirmModal}>Delete Profile</ModalLink>
              <ModalLink onClick={logUserOutFn}>Log Out</ModalLink>
              <ModalLink onClick={toggleModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {confirmModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleConfirmModal} />
            <Modal>
              <ModalLink onClick={confirmDeleteProfile}>Yes</ModalLink>
              <ModalLink onClick={toggleConfirmModal}>No</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTripModal} />
            <Modal>
              <ModalLink
                onClick={() =>
                  gotoTrip(
                    cityName,
                    cityPhoto,
                    countryName,
                    tripStartDate,
                    tripEndDate
                  )
                }
              >
                Goto Trip
              </ModalLink>
              <ModalLink onClick={toggleAddTripModal}>Add Trip</ModalLink>
              <ModalLink onClick={toggleEditTripModal}>Edit Trip</ModalLink>
              <ModalLink onClick={toggleTripConfirmModal}>
                Delete Trip
              </ModalLink>
              <ModalLink onClick={toggleTripModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripConfirmModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTripConfirmModal} />
            <Modal>
              <ModalLink onClick={deleteTrip}>Yes</ModalLink>
              <ModalLink onClick={toggleTripConfirmModal}>No</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripAddModalOpen && (
          <TripModalContainer>
            <ModalOverlay onClick={addTrip} />
            <TripInputContainer>
              <DateRangePickerContainer>
                <DateRangePicker
                  startDateId="startDate"
                  endDateId="endDate"
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  focusedInput={focusedInput}
                  isOutsideRange={() => false}
                  withPortal={true}
                  isDayBlocked={isDayBlocked()}
                />
              </DateRangePickerContainer>
              <SearchCitiesInput
                autoFocus={true}
                placeholder={"Search a City"}
                onChange={onInputChange}
                name={"cityName"}
                autoComplete={"off"}
              />
              <TripModal>
                {!searchTripCitiesLoading &&
                  cities &&
                  cities.map(city => (
                    <TripRow key={city.id}>
                      <Link to={`/city/${city.cityName}`}>
                        <TripHeader>
                          <SAvatar size={"sm"} url={city.cityPhoto} />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{city.country.countryName}</Location>
                          </HeaderColumn>
                        </TripHeader>
                      </Link>
                    </TripRow>
                  ))}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {tripEditModalOpen && (
          <TripModalContainer>
            <ModalOverlay onClick={editTrip} />
            <TripInputContainer>
              <DateRangePickerContainer>
                <DateRangePicker
                  startDateId="startDate"
                  endDateId="endDate"
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  focusedInput={focusedInput}
                  isOutsideRange={() => false}
                  withPortal={true}
                  isDayBlocked={isDayBlocked()}
                />
              </DateRangePickerContainer>
              <SearchCitiesInput
                autoFocus={true}
                placeholder={cityName || "cityName"}
                value={cityName}
                onChange={onInputChange}
                name={"cityName"}
                autoComplete={"off"}
              />
              <TripModal>
                {!searchTripCitiesLoading &&
                  cities &&
                  cities.map(city => (
                    <TripRow key={city.id}>
                      <Link to={`/city/${city.cityName}`}>
                        <TripHeader>
                          <SAvatar size={"sm"} url={city.cityPhoto} />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{city.country.countryName}</Location>
                          </HeaderColumn>
                        </TripHeader>
                      </Link>
                    </TripRow>
                  ))}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {/* 
        ////////////// HEADER //////////////
        */}
        <Header>
          <PAvatar size="lg" url={user.profile.avatar} />
          <NameContainer>
            {editMode ? (
              <Input
                onChange={onInputChange}
                type={"text"}
                value={userName}
                placeholder={user.username}
                name={"userName"}
                onKeyUp={onKeyUp}
              />
            ) : (
              <Username>{user.username}</Username>
            )}
            {user.profile.isSelf ? (
              <GearContainer onClick={toggleModal}>
                <Gear />
              </GearContainer>
            ) : (
              <FollowBtn
                isFollowing={user.profile.isFollowing}
                userId={user.id}
              />
            )}
          </NameContainer>
        </Header>
        {/* 
        ////////////// BODY //////////////
        */}
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <Link to={`/city/${user.profile.currentCity.cityName}`}>
                <CAvatar size="lg" url={user.profile.currentCity.cityPhoto} />
              </Link>
              {editMode ? (
                <>
                  <Input
                    onChange={onInputChange}
                    type={"text"}
                    value={firstName}
                    placeholder={user.firstName || "First Name"}
                    name={"firstName"}
                    onKeyUp={onKeyUp}
                  />
                  <Input
                    onChange={onInputChange}
                    type={"text"}
                    value={lastName}
                    placeholder={user.lastName || "Last Name"}
                    name={"lastName"}
                    onKeyUp={onKeyUp}
                  />
                </>
              ) : (
                <p>
                  {user.firstName} {user.lastName}
                </p>
              )}
              {editMode ? (
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={bio}
                  placeholder={user.profile.bio || "Bio"}
                  name={"bio"}
                  onKeyUp={onKeyUp}
                />
              ) : (
                <Bio>{`${user.profile.bio}`}</Bio>
              )}
              <SText text={String(user.profile.countryCount.userCount)} />
              <SText text={String(user.profile.cityCount.cardCount)} />
              <Row>
                <UBold text={String(user.profile.postCount)} />
                <UBold text={" how many POSTS - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.postCount)} />
                <UBold text={" how many KM"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.tripCount)} />
                <UBold text={" how many TRIPS - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.cityCount)} />
                <UBold text={" how many CITIES - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.countryCount)} />
                <UBold text={" how many COUNTRIES - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.continentCount)} />
                <UBold text={" how many  CONTINENT - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.gender)} />
                <UBold text={" gender - done"} />
              </Row>
              <Row>
                <UBold text={String(user.profile.nationality)} />
                <UBold text={" nationality - done"} />
              </Row>

              <Weather
                latitude={user.profile.currentCity.latitude}
                longitude={user.profile.currentCity.longitude}
              />
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>TRIPS</Username>
                <TripInput
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {user.profile.isSelf && (
                <TripIcon onClick={toggleAddTripModal}>
                  <Upload />
                </TripIcon>
              )}
              {tripList.length !== 0 &&
                tripList.map(trip => (
                  <UserRow key={trip.id}>
                    <Link to={`/city/${trip.city.cityName}`}>
                      <THeader>
                        <SAvatar size={"sm"} url={trip.city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={trip.city.cityName} />
                          <Location>{trip.city.country.countryName}</Location>
                        </HeaderColumn>
                      </THeader>
                    </Link>
                    <GreyText text={trip.startDate} />
                    <GreyText text={trip.endDate} />
                    <GreyText text={`${trip.diffDays} Days`} />
                    <TripOverlay
                      onClick={() => {
                        user.profile.isSelf
                          ? toggleTripModal(
                              trip.id,
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            )
                          : gotoTrip(
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            );
                      }}
                    >
                      <List />
                    </TripOverlay>
                  </UserRow>
                ))}
              {tripList.length === 0 &&
                !search &&
                getTrips &&
                getTrips.map(trip => (
                  <UserRow key={trip.id}>
                    <Link to={`/city/${trip.city.cityName}`}>
                      <THeader>
                        <SAvatar size={"sm"} url={trip.city.cityPhoto} />
                        <HeaderColumn>
                          <HeaderText text={trip.city.cityName} />
                          <Location>{trip.city.country.countryName}</Location>
                        </HeaderColumn>
                      </THeader>
                    </Link>
                    <GreyText text={trip.startDate} />
                    <GreyText text={trip.endDate} />
                    <GreyText text={`${trip.diffDays} Days`} />
                    <TripOverlay
                      onClick={() => {
                        user.profile.isSelf
                          ? toggleTripModal(
                              trip.id,
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            )
                          : gotoTrip(
                              trip.city.cityName,
                              trip.city.cityPhoto,
                              trip.city.country.countryName,
                              trip.startDate,
                              trip.endDate
                            );
                      }}
                    >
                      <List />
                    </TripOverlay>
                  </UserRow>
                ))}
            </UserContainer>
          </PHeader>
          {!user.profile.isSelf &&
          knowingFollowers &&
          knowingFollowers.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"FOLLOWINGS TOGETHER"} />
              </SmallTitle>
              <AvatarGrid knowingFollowers={knowingFollowers} />
            </>
          ) : null}
          {!coffeeLoading && coffees.length !== 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEE NOW"} />
              </SmallTitle>
              <AvatarGrid coffees={coffees} />
            </>
          ) : null}
          {user.profile.isSelf && !coffeeLoading && coffees.length === 0 ? (
            <>
              <SmallTitle>
                <SmallGreyLine />
                <SSText text={"COFFEE NOW"} />
              </SmallTitle>
              <AvatarGrid toggleRequestModal={toggleRequestModal} />
            </>
          ) : null}
          <GreyLine />
          {/* 
          ////////////// LOCATIONS //////////////
          */}
          <Title>
            <SText text={`ABOUT ${username}`} />
          </Title>
          <Container>
            <TripBox>
              <ScrollContainer>
                <Link to={`/${username}/followers`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={"http://localhost:8000/media/28_ix0X7LD.jpg "}
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              <ScrollContainer>
                <Link to={`/${username}/followings`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={"http://localhost:8000/media/281.jpg"}
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              <ScrollContainer>
                <Link to={`/${username}/cities`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={
                          "https://image.fmkorea.com/files/attach/images/3842645/451/442/046/5b8bcef55357387016a4a5d5343249ea.jpg"
                        }
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              <ScrollContainer>
                <Link to={`/${username}/countries`}>
                  <CityContainer>
                    <Square>
                      <CityPhoto
                        src={
                          "http://playwares.com/files/attach/images/23503529/733/482/043/c64e3f04515122d1aee2879590ee250c.jpg"
                        }
                        size={"md"}
                      />
                    </Square>
                  </CityContainer>
                </Link>
              </ScrollContainer>
              {user.profile.isSelf && (
                <ScrollContainer>
                  <Link to={`/${username}/coffees`}>
                    <CityContainer>
                      <Square>
                        <CityPhoto
                          src={
                            "https://media.hojunara.com/wp-content/uploads/2015/01/%EC%BD%94%EC%95%8C%EB%9D%BC.jpg"
                          }
                          size={"md"}
                        />
                      </Square>
                    </CityContainer>
                  </Link>
                </ScrollContainer>
              )}
            </TripBox>
          </Container>
          <GetCards
            upload={user.profile.isSelf ? true : false}
            location={"user"}
            userName={username}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;
