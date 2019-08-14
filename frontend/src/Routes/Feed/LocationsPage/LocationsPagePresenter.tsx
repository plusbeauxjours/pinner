import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import Bold from "../../../Components/Bold";
import Avatar from "../../../Components/Avatar";
import CityLikeBtn from "../../../Components/CityLikeBtn";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 4fr 1fr 1fr;
  padding: 0 5px 0 5px;
  margin: 0 15px 0 15px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 5px;
  color: ${props => props.theme.color};
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 935px) {
    margin: 10px 15px 10px 15px;
  }
`;

const Text = styled.p`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

interface IProps {
  recommendLocationsData: any;
  recommendLocationsLoading: boolean;
  search: string;
  recommendLocationList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const PeoplePagePresenter: React.FunctionComponent<IProps> = ({
  recommendLocationsData: {
    recommendLocations: { cities = null, hasNextPage = null } = {}
  } = {},
  recommendLocationsLoading,
  search,
  recommendLocationList,
  onChange,
  loadMore
}) => {
  return (
    <>
      <SWrapper>
        {console.log}
        <UserContainer>
          <Title>
            <SText text={"RECOMMEND LOCATIONS"} />
            <Input
              placeholder="Search locations who is recommended"
              value={search}
              onChange={onChange}
            />
          </Title>
          {recommendLocationsLoading && <Loader />}
          {!recommendLocationsLoading && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
            >
              {recommendLocationList.length !== 0 &&
                recommendLocationList.map(city => {
                  return (
                    <UserRow key={city.id}>
                      <Link to={`/city/${city.cityId}`}>
                        <Header>
                          <SAvatar
                            size={"sm"}
                            url={city.cityPhoto}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{city.country.countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={city.isLiked}
                        cityId={city.id}
                        likeCount={city.likeCount}
                        type={"row"}
                      />
                      <Link to={`/city/${city.cityId}`}>
                        <Text>{city.distance}km</Text>
                      </Link>
                    </UserRow>
                  );
                })}
              {console.log("hasNextPage:  ", hasNextPage)}
              {recommendLocationList.length === 0 &&
                !search &&
                cities &&
                cities.map(city => {
                  return (
                    <UserRow key={city.id}>
                      <Link to={`/city/${city.cityId}`}>
                        <Header>
                          <SAvatar
                            size={"sm"}
                            url={city.cityPhoto}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{city.country.countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={city.isLiked}
                        cityId={city.id}
                        likeCount={city.likeCount}
                        type={"row"}
                      />
                      <Link to={`/city/${city.cityId}`}>
                        <Text>{city.distance}km</Text>
                      </Link>
                    </UserRow>
                  );
                })}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default PeoplePagePresenter;
