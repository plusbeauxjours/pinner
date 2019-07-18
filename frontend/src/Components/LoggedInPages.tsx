import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import CityProfile from "../Routes/City/CityProfile";
import CountryProfile from "../Routes/Country/CountryProfile";
import ContinentProfile from "../Routes/Continent/ContinentProfile";
import TripProfile from "../Routes/TripProfile";
import CoffeeDetail from "../Routes/Detail/CoffeeDetail";
import Match from "../Routes/Match";

import UserProfile from "../Routes/User/UserProfile";
import EditProfile from "../Routes/User/EditProfile";
import ToggleSettings from "../Routes/User/ToggleSettings";
import UserAvatarDetail from "../Routes/User/UserAvatarDetail";
import Coffees from "../Routes/User/Coffees";
import Cities from "../Routes/User/Cities";
import Countries from "../Routes/User/Countries";
import Continents from "../Routes/User/Continents";

import PeoplePage from "../Routes/Feed/PeoplePage";
import CoffeesPage from "../Routes/Feed/CoffeesPage";

import CityUsersNow from "../Routes/City/CityUsersNow";
import CityUsersBefore from "../Routes/City/CityUsersBefore";
import NearCities from "../Routes/City/NearCities";

import ContinentUsersNow from "../Routes/Continent/ContinentUsersNow";
import ContinentUsersBefore from "../Routes/Continent/ContinentUsersBefore";

import CountryUsersNow from "../Routes/Country/CountryUsersNow";
import CountryUsersBefore from "../Routes/Country/CountryUsersBefore";

import Header from "./Header";
import { RouteComponentProps, withRouter } from "react-router-dom";

const Wrapper = styled.div`
  padding-top: 45px;
  min-height: 80vh;
  min-height: 50vh;
`;

interface IProps extends RouteComponentProps<any> {}

class LoggedInPages extends React.Component<IProps> {
  public previousLocation = this.props.location;

  public componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state ||
        !location.state.coffeeModalOpen ||
        !location.state.avatarModalOpen ||
        !location.state.cityModalOpen ||
        !location.state.countryModalOpen ||
        !location.state.continentModalOpen)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  public render() {
    const { location } = this.props;
    const coffeeModalOpen = !!(
      location.state &&
      location.state.coffeeModalOpen &&
      this.previousLocation !== location
    );
    const avatarModalOpen = !!(
      location.state &&
      location.state.avatarModalOpen &&
      this.previousLocation !== location
    );
    const cityModalOpen = !!(
      location.state &&
      location.state.cityModalOpen &&
      this.previousLocation !== location
    );
    const countryModalOpen = !!(
      location.state &&
      location.state.countryModalOpen &&
      this.previousLocation !== location
    );
    const continentModalOpen = !!(
      location.state &&
      location.state.continentModalOpen &&
      this.previousLocation !== location
    );
    return (
      <Wrapper>
        <Header />
        {coffeeModalOpen && <Route path="/c/:uuid" component={CoffeeDetail} />}
        {avatarModalOpen && (
          <Route path="/:username/:uuid" component={UserAvatarDetail} />
        )}
        {cityModalOpen && <Route path="/:username/cities" component={Cities} />}
        {countryModalOpen && (
          <Route path="/:username/countries" component={Countries} />
        )}
        {continentModalOpen && (
          <Route path="/:username/continents" component={Continents} />
        )}

        <Switch
          location={
            coffeeModalOpen ||
            avatarModalOpen ||
            cityModalOpen ||
            countryModalOpen ||
            continentModalOpen
              ? this.previousLocation
              : location
          }
        >
          <Route path="/people" exact={true} component={PeoplePage} />
          <Route path="/coffees" exact={true} component={CoffeesPage} />
          <Route path="/" exact={true} component={Match} />

          {/* CONTINENT */}
          <Route
            path="/continent/:continentCode/coffees"
            component={CoffeesPage}
          />
          <Route
            path="/continent/:continentCode/usersNow"
            component={ContinentUsersNow}
          />
          <Route
            path="/continent/:continentCode/usersBefore"
            component={ContinentUsersBefore}
          />
          <Route
            path="/continent/:continentCode"
            component={ContinentProfile}
          />

          {/* COUNTRY */}
          <Route path="/country/:countryCode/coffees" component={CoffeesPage} />
          <Route
            path="/country/:countryCode/usersNow"
            component={CountryUsersNow}
          />
          <Route
            path="/country/:countryCode/usersBefore"
            component={CountryUsersBefore}
          />
          <Route path="/country/:countryCode" component={CountryProfile} />

          {/* CITY */}
          <Route path="/city/:cityId/coffees" component={CoffeesPage} />
          <Route path="/city/:cityId/nearCities" component={NearCities} />
          <Route path="/city/:cityId/usersNow" component={CityUsersNow} />
          <Route path="/city/:cityId/usersBefore" component={CityUsersBefore} />
          <Route path="/city/:cityId/:duration" component={TripProfile} />
          <Route path="/city/:cityId" component={CityProfile} />
          <Route path="/account/edit" component={EditProfile} />
          <Route path="/account/settings" component={ToggleSettings} />

          {/* USER */}
          <Route path="/:username/coffees" component={Coffees} />
          <Route path="/:username/edit" component={EditProfile} />
          <Route path="/:username" exact={true} component={UserProfile} />
          <Redirect from="*" to="/" />
        </Switch>
      </Wrapper>
    );
  }
}

export default withRouter(LoggedInPages);
