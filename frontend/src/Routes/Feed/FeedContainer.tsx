import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import {
  ReportLocation,
  ReportLocationVariables,
  Feed,
  FeedVariables
} from "../../types/api";
import { RouteComponentProps } from "react-router";
import { REPORT_LOCATION } from "../Home/HomeQueries";
import { reverseGeoCode } from "../../mapHelpers";
import { GET_FEED } from "./FeedQueries";
import { locationThumbs } from "../../locationThumbs";
import continents from "../../continents";

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

class FeedQuery extends Query<Feed, FeedVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
  currentContinent: string;
  cityPhotoURL: any;
}

class FeedContainer extends React.Component<IProps, IState> {
  public ReportLocationFn: MutationFn;
  public state = {
    page: 0,
    currentLat: 0,
    currentLng: 0,
    currentCity: "",
    currentCountry: "",
    currentCountryCode: "",
    currentContinent: "",
    cityPhotoURL: ""
  };
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    console.log("goodmorning");
  }
  public render() {
    const {
      page,
      currentLat,
      currentLng,
      currentCity,
      currentCountry,
      currentCountryCode,
      currentContinent,
      cityPhotoURL
    } = this.state;
    return (
      <FeedQuery
        query={GET_FEED}
        variables={{
          page,
          cityName: currentCity
        }}
      >
        {({ data, loading }) => (
          <ReportLocationMutation
            mutation={REPORT_LOCATION}
            variables={{
              currentLat,
              currentLng,
              currentCity,
              currentCountry,
              currentCountryCode,
              currentContinent,
              cityPhotoURL
            }}
          >
            {ReportLocationFn => {
              this.ReportLocationFn = ReportLocationFn;
              return (
                <FeedPresenter
                  loading={loading}
                  data={data}
                  currentCity={currentCity}
                />
              );
            }}
          </ReportLocationMutation>
        )}
      </FeedQuery>
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      currentLat: latitude,
      currentLng: longitude
    });
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        currentCity: address.storableLocation.city,
        currentCountry: address.storableLocation.country,
        currentCountryCode: address.storableLocation.countryCode
      });
      this.reportLocation(
        lat,
        lng,
        address.storableLocation.city,
        address.storableLocation.country,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    lat: number,
    lng: number,
    lastCity: string,
    lastCountry: string,
    currentCountryCode: string
  ) => {
    const cityPhotoURL = await locationThumbs(lastCity);
    const currentContinent = await continents[currentCountryCode];
    console.log(currentContinent);
    this.setState({ cityPhotoURL, currentContinent });
    this.ReportLocationFn({
      variables: {
        lastLat: lat,
        lastLng: lng,
        lastCity,
        lastCountry,
        currentCountryCode,
        currentContinent,
        cityPhotoURL
      }
    });
    console.log(this.state);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
}

export default FeedContainer;
