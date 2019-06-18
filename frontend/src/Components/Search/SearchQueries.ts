import gql from "graphql-tag";

export const CREATE_CITY = gql`
  mutation CreateCity(
    $cityId: String!
    $cityName: String!
    $cityLatitude: Float!
    $cityLongitude: Float!
    $countryCode: String!
  ) {
    createCity(
      cityId: $cityId
      cityName: $cityName
      cityLatitude: $cityLatitude
      cityLongitude: $cityLongitude
      countryCode: $countryCode
    ) {
      city {
        id
        latitude
        longitude
        cityId
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
          continent {
            continentCode
            continentName
          }
        }
        likeCount
        isLiked
        userCount
        userLogCount
        count
        diff
      }
    }
  }
`;

export const GET_CITY_PHOTO = gql`
  query GetCityPhoto($cityId: String) {
    getCityPhoto(cityId: $cityId) {
      photo
    }
  }
`;

export const GET_COUNTRY_PHOTO = gql`
  query GetCountryPhoto($countryCode: String) {
    getCountryPhoto(countryCode: $countryCode) {
      photo
    }
  }
`;
