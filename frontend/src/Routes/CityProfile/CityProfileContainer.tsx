import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCountries,
  NearCitiesVariables,
  NearCountriesVariables,
  GetCoffees,
  GetCoffeesVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import {
  CITY_PROFILE,
  NEAR_CITIES,
  NEAR_COUNTRIES
} from "./CityProfileQueries";
import { GET_COFFEES } from "../Feed/FeedQueries";
// import { getAqi, getWeather } from "../../../../Frontend/src/weatherHelper";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class NearCountriesQuery extends Query<NearCountries, NearCountriesVariables> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  lat: number;
  lng: number;
  nearCityList: any;
  nearCountryList: any;
  nearCityPage: number;
  nearCountryPage: number;
  nearCityModalOpen: boolean;
  nearCountryModalOpen: boolean;
  coffeeModalOpen: boolean;
  coffeeList: any;
  coffeePage: number;
  aqi: number;
  icon: string;
  humidity: number;
  temp: number;
  chill: number;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public coffeeFetchMore;
  public nearCitiesFetchMore;
  public nearCountriesFetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      lat: 0,
      lng: 0,
      nearCityList: null,
      nearCountryList: null,
      nearCityPage: 0,
      nearCountryPage: 0,
      nearCityModalOpen: false,
      nearCountryModalOpen: false,
      coffeeModalOpen: false,
      coffeeList: null,
      coffeePage: 0,
      aqi: 0,
      icon: null,
      humidity: 0,
      temp: 0,
      chill: 0
    };
  }
  public componentDidMount() {
    console.log("goodmorning");
  }
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const {
      page,
      nearCityList,
      nearCountryList,
      nearCityPage,
      nearCountryPage,
      nearCityModalOpen,
      nearCountryModalOpen,
      coffeeModalOpen,
      coffeeList,
      coffeePage,
      aqi,
      icon,
      humidity,
      temp,
      chill
    } = this.state;
    return (
      <GetCoffeesQuery query={GET_COFFEES} variables={{ cityName, coffeePage }}>
        {({
          data: coffeeData,
          loading: coffeeLoading,
          fetchMore: coffeeFetchMore
        }) => {
          this.coffeeFetchMore = coffeeFetchMore;
          return (
            <NearCitiesQuery
              query={NEAR_CITIES}
              variables={{ nearCityPage, cityName }}
            >
              {({
                data: nearCitiesData,
                loading: nearCitiesLoading,
                fetchMore: nearCitiesFetchMore
              }) => {
                this.nearCitiesFetchMore = nearCitiesFetchMore;
                return (
                  <NearCountriesQuery
                    query={NEAR_COUNTRIES}
                    variables={{ nearCountryPage, cityName }}
                  >
                    {({
                      data: nearCountriesData,
                      loading: nearCountriesLoading,
                      fetchMore: nearCountriesFetchMore
                    }) => {
                      this.nearCountriesFetchMore = nearCountriesFetchMore;
                      return (
                        <CityProfileQuery
                          query={CITY_PROFILE}
                          variables={{ page, cityName }}
                        >
                          {({ data: cityData, loading: cityLoading }) => {
                            return (
                              <CityProfilePresenter
                                cityData={cityData}
                                cityLoading={cityLoading}
                                nearCitiesData={nearCitiesData}
                                nearCitiesLoading={nearCitiesLoading}
                                nearCountriesData={nearCountriesData}
                                nearCountriesLoading={nearCountriesLoading}
                                coffeeData={coffeeData}
                                coffeeLoading={coffeeLoading}
                                nearCityList={nearCityList}
                                nearCountryList={nearCountryList}
                                nearCityModalOpen={nearCityModalOpen}
                                nearCountryModalOpen={nearCountryModalOpen}
                                toggleNearCityModal={this.toggleNearCityModal}
                                toggleNearCountryModal={
                                  this.toggleNearCountryModal
                                }
                                toggleNearCitySeeAll={this.toggleNearCitySeeAll}
                                toggleNearCountrySeeAll={
                                  this.toggleNearCountrySeeAll
                                }
                                coffeeModalOpen={coffeeModalOpen}
                                coffeeList={coffeeList}
                                toggleCoffeeModal={this.toggleCoffeeModal}
                                toggleCoffeeSeeAll={this.toggleCoffeeSeeAll}
                                aqi={aqi}
                                icon={icon}
                                humidity={humidity}
                                temp={temp}
                                chill={chill}
                                getAqi={this.getAqi}
                                getWeather={this.getWeather}
                              />
                            );
                          }}
                        </CityProfileQuery>
                      );
                    }}
                  </NearCountriesQuery>
                );
              }}
            </NearCitiesQuery>
          );
        }}
      </GetCoffeesQuery>
    );
  }
  public getAqi = async (lat: number, lng: number) => {
    // const aqi = await getAqi(lat, lng);
    // this.setState({ aqi });
    this.setState({ lat, lng });
    console.log(this.state);
  };
  public getWeather = async (lat: number, lng: number) => {
    // const { icon, humidity, temp, chill } = await getWeather(lat, lng);
    // this.setState({ icon, humidity, temp, chill });
    console.log(this.state);
  };
  public toggleNearCityModal = () => {
    const { nearCityModalOpen } = this.state;
    this.setState({
      nearCityModalOpen: !nearCityModalOpen
    } as any);
  };
  public toggleNearCountryModal = () => {
    const { nearCountryModalOpen } = this.state;
    this.setState({
      nearCountryModalOpen: !nearCountryModalOpen
    } as any);
  };
  public toggleNearCitySeeAll = () => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { nearCityModalOpen } = this.state;
    this.nearCitiesFetchMore({
      query: NEAR_CITIES,
      variables: { nearCityPage: 1, cityName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          nearCityList: [
            ...previousResult.nearCities.cities,
            ...fetchMoreResult.nearCities.cities
          ],
          nearCityModalOpen: !nearCityModalOpen
        });
      }
    });
  };
  public toggleNearCountrySeeAll = () => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { nearCountryModalOpen } = this.state;
    this.nearCountriesFetchMore({
      query: NEAR_COUNTRIES,
      variables: { nearCountryPage: 1, cityName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          nearCountryList: [
            ...previousResult.nearCountries.countries,
            ...fetchMoreResult.nearCountries.countries
          ],
          nearCountryModalOpen: !nearCountryModalOpen
        });
      }
    });
  };
  public toggleCoffeeModal = () => {
    const { coffeeModalOpen } = this.state;
    this.setState({
      coffeeModalOpen: !coffeeModalOpen
    } as any);
  };
  public toggleCoffeeSeeAll = () => {
    const { coffeeModalOpen } = this.state;
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    this.coffeeFetchMore({
      query: GET_COFFEES,
      variables: { coffeePage: 1, cityName },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          coffeeList: [
            ...previousResult.getCoffees.coffees,
            ...fetchMoreResult.getCoffees.coffees
          ],
          coffeeModalOpen: !coffeeModalOpen
        } as any);
      }
    });
  };
}

export default withRouter(CityProfileContainer);
