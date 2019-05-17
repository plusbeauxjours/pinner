import React from "react";
import { withRouter } from "react-router-dom";
import HeaderPresenter from "./HeaderPresenter";
import { reverseGeoCode } from "../../mapHelpers";
import {
  cityThumbnail,
  countryThumbnail,
  continentThumbnail
} from "../../locationThumbnail";
import continents from "../../continents";
import { ReportLocation, ReportLocationVariables } from "../../types/api";
import { Mutation, MutationFn } from "react-apollo";
import { REPORT_LOCATION } from "../../Routes/Home/HomeQueries";

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

interface IState {
  currentLat: number;
  currentLng: number;
  currentCity: string;
  modalOpen: boolean;
  search: string;
}

class HeaderContainer extends React.Component<any, IState> {
  public ReportLocationFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      currentLat: 0,
      currentLng: 0,
      currentCity: null,
      modalOpen: false,
      search: "sa"
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      const location = localStorage.getItem("cityName");
      if (!location) {
        navigator.geolocation.getCurrentPosition(
          this.handleGeoSuccess,
          this.handleGeoError
        );
      }
    }
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    console.log("hader did mount");
  }
  public render() {
    const {
      currentLat,
      currentLng,
      currentCity,
      modalOpen,
      search
    } = this.state;
    return (
      <ReportLocationMutation mutation={REPORT_LOCATION}>
        {ReportLocationFn => {
          this.ReportLocationFn = ReportLocationFn;
          return (
            <HeaderPresenter
              currentLat={currentLat}
              currentLng={currentLng}
              currentCity={currentCity}
              modalOpen={modalOpen}
              search={search}
              toggleModal={this.toggleModal}
              onChange={this.onChange}
            />
          );
        }}
      </ReportLocationMutation>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
    console.log(this.state);
  };
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
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      this.setState({
        currentCity: address.storableLocation.city
      });
      localStorage.setItem("cityName", address.storableLocation.city);
      this.reportLocation(
        latitude,
        longitude,
        address.storableLocation.city,
        address.storableLocation.country,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    latitude: number,
    longitude: number,
    currentCity: string,
    currentCountry: string,
    currentCountryCode: string
  ) => {
    const cityPhotoURL = await cityThumbnail(currentCity);
    const countryPhotoURL = await countryThumbnail(currentCountry);
    const currentContinent = await continents[currentCountryCode];
    const continentPhotoURL = await continentThumbnail(currentContinent);
    this.ReportLocationFn({
      variables: {
        currentLat: latitude,
        currentLng: longitude,
        currentCity,
        currentCountry,
        currentCountryCode,
        currentContinent,
        cityPhotoURL,
        countryPhotoURL,
        continentPhotoURL
      }
    });
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(value);
    this.setState({
      search: value
    } as any);
  };
}

export default withRouter(HeaderContainer);
