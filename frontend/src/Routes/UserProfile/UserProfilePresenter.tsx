import React from "react";
import { Link } from "react-router-dom";
import { Gear } from "../../Icons";
import styled, { keyframes } from "../../Styles/typed-components";
import { UserProfile, TopCountries, FrequentVisits } from "../../types/api";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import CardGrid from "../../Components/CardGrid";
import FollowBtn from "../../Components/FollowBtn";
import Input from "../../Components/Input";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 280px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const NameContainer = styled.span`
  display: flex;
`;

const PBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  justify-content: center;
  background: ${props => props.theme.bgColor};
  border-bottom: 1px solid grey;
`;

const PRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid grey;
  margin: 20px 10px 20px 10px;
`;

const RowText = styled.span`
  display: flex;
  position: absolute;
  margin-bottom: 10px;
`;

const CityPhoto = styled.img`
  margin-bottom: 10px;
  display: flex;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const CityName = styled(Bold)`
  position: absolute;
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  pointer-events: none;
`;

const CountryName = styled(CityName)`
  font-size: 20px;
  margin-top: 20px;
  pointer-events: none;
`;

const CityContainer = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 300px;
  margin-right: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 10px;
  height: 200px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const InfoInlineContainer = styled(InfoContainer)`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfInfo = styled(Info)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  height: 100px;
  display: flex;
  margin-bottom: 0;
  padding-bottom: 30px;
`;

const InfoRow = styled.span``;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 10px;
`;

const Follow = styled.div`
  flex: 1;
  margin-bottom: 10px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const Fullname = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
  font-weight: 500;
`;

const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
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

const GearContainer = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  z-index: 5;
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
  background-color: #2d3a41;
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
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

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 20px;
`;

interface IProps {
  userProfileData: UserProfile;
  topCountriesData?: TopCountries;
  frequentVisitsData?: FrequentVisits;
  loading: boolean;
  modalOpen: boolean;
  confirmModalOpen: boolean;
  editMode: boolean;
  openEditMode: () => void;
  toggleModal: () => void;
  toggleConfirmModal: () => void;
  logUserOutFn: () => void;
  confirmDeleteProfile: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  userName: string;
  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
}

const UserProfilePresenter: React.SFC<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} },
  topCountriesData: { topCountries: { footprints: topCountries = null } = {} },
  frequentVisitsData: {
    frequentVisits: { footprints: frequentCities = null } = {}
  },
  loading,
  modalOpen,
  confirmModalOpen,
  editMode,
  toggleModal,
  toggleConfirmModal,
  openEditMode,
  logUserOutFn,
  confirmDeleteProfile,
  onInputChange,
  onKeyUp,
  userName,
  bio,
  gender,
  firstName,
  lastName
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && user && topCountries && frequentCities) {
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={openEditMode}>Edit Profile</ModalLink>
              <ModalLink onClick={toggleConfirmModal}>Delete Profile</ModalLink>
              <ModalLink onClick={logUserOutFn}>Log Out</ModalLink>
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
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
        <PHeader>
          <PAvatar size="lg" url={user.profile.avatar} />
          {editMode ? (
            <ExtendedInput
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
          <NameContainer>
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
            <Link to={`/${user.username}/footprint`}>
              <GearContainer>
                <Gear />
              </GearContainer>
            </Link>
          </NameContainer>
        </PHeader>
        <SWrapper>
          <PBody>
            <CityContainer>
              <Link to={`/city/${user.profile.currentCity.cityName}`}>
                <CityPhoto src={user.profile.currentCity.cityPhoto} />
              </Link>

              <CityName text={user.profile.currentCity.cityName} />
              <CountryName
                text={user.profile.currentCity.country.countryName}
              />
            </CityContainer>
            <InfoContainer>
              <Info>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with....
                {editMode ? (
                  <>
                    <ExtendedInput
                      onChange={onInputChange}
                      type={"text"}
                      value={firstName}
                      placeholder={user.firstName || "First Name"}
                      name={"firstName"}
                      onKeyUp={onKeyUp}
                    />
                    <ExtendedInput
                      onChange={onInputChange}
                      type={"text"}
                      value={lastName}
                      placeholder={user.lastName || "Last Name"}
                      name={"lastName"}
                      onKeyUp={onKeyUp}
                    />
                  </>
                ) : (
                  <Fullname>{`${user.firstName} ${user.lastName}`}</Fullname>
                )}
              </Info>
              <InfoInlineContainer>
                <HalfInfo>
                  <InfoRow>
                    <SBold text={String(user.profile.postCount)} />
                    POSTS
                  </InfoRow>
                  <InfoRow>
                    <SBold text={String(user.profile.postCount)} />
                    KM
                  </InfoRow>
                  <InfoRow>
                    <SBold text={String(user.profile.tripCount)} />
                    TRIPS
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    CITIES
                    <SBold text={String(user.profile.cityCount)} />
                  </InfoRow>

                  <InfoRow>
                    COUNTRIES
                    <SBold text={String(user.profile.cityCount)} />
                  </InfoRow>

                  <InfoRow>
                    CONTINENT
                    <SBold text={String(user.profile.cityCount)} />
                  </InfoRow>
                </HalfInfo>

                {user.profile.bio &&
                  (editMode ? (
                    <ExtendedInput
                      onChange={onInputChange}
                      type={"text"}
                      value={bio}
                      placeholder={user.profile.bio || "Bio"}
                      name={"bio"}
                      onKeyUp={onKeyUp}
                    />
                  ) : (
                    <Bio>{`${user.profile.bio}`}</Bio>
                  ))}
              </InfoInlineContainer>
            </InfoContainer>
            <FollowContainer>
              <Follow>
                FOLLOWERS
                <SBold text={String(user.profile.followersCount)} />
                <AvatarGrid>
                  {user.profile.followers &&
                    user.profile.followers.map(follower => (
                      <Link to={`/${follower.user.username}`}>
                        <Avatar
                          size={"sm"}
                          key={follower.id}
                          url={follower.user.profile.avatar}
                        />
                      </Link>
                    ))}
                </AvatarGrid>
              </Follow>
              <Follow>
                FOLLOWINGS
                <SBold text={String(user.profile.followingCount)} />
                <AvatarGrid>
                  {user.profile.followings &&
                    user.profile.followings.map(following => (
                      <Link to={`/${following.user.username}`}>
                        <Avatar
                          size={"sm"}
                          key={following.id}
                          url={following.user.profile.avatar}
                        />
                      </Link>
                    ))}
                </AvatarGrid>
              </Follow>
            </FollowContainer>
          </PBody>
          <PRow>TRIP LOG</PRow>
          <PRow>
            <RowText>TOP COUNTRIES</RowText>
            {topCountries &&
              topCountries.map(topCountry => (
                <CityContainer>
                  <Link
                    to={`/country/${topCountry.toCity.country.countryName}`}
                  >
                    <CityPhoto
                      key={topCountry.id}
                      src={topCountry.toCity.country.countryPhoto}
                    />
                  </Link>

                  <CityName text={topCountry.toCity.country.countryName} />
                </CityContainer>
              ))}
          </PRow>
          <PRow>
            <RowText>FREQUENTVISITS</RowText>
            {frequentCities &&
              frequentCities.map(frequentCity => (
                <CityContainer>
                  <Link to={`/city/${frequentCity.toCity.cityName}`}>
                    <CityPhoto
                      key={frequentCity.id}
                      src={frequentCity.toCity.cityPhoto}
                    />
                  </Link>

                  <CityName text={frequentCity.toCity.cityName} />
                  <CountryName text={frequentCity.toCity.country.countryName} />
                </CityContainer>
              ))}
          </PRow>
          {user.cards && user.cards.length !== 0 && (
            <CardGrid cards={user.cards} />
          )}
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;