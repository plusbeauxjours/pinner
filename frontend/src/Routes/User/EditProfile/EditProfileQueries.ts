import { gql } from "apollo-boost";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $username: String
    $bio: String
    $gender: String
    $firstName: String
    $lastName: String
    $nationality: String
    $residence: String
  ) {
    editProfile(
      username: $username
      bio: $bio
      gender: $gender
      firstName: $firstName
      lastName: $lastName
      nationality: $nationality
      residence: $residence
    ) {
      ok
      user {
        id
        username
        firstName
        lastName
        profile {
          bio
          gender
          avatarUrl
          website
          email
          nationality {
            countryEmoji
            ...CountryParts
          }
          residence {
            countryEmoji
            ...CountryParts
          }
          postCount
          tripCount
          cityCount
          countryCount
          continentCount
          isSelf
          isDarkMode
          isHideTrips
          isHideCoffees
          isHideCities
          isHideCountries
          isHideContinents
          isAutoLocationReport
          currentCity {
            latitude
            longitude
            cityId
            cityName
            cityPhoto
            country {
              countryName
              countryCode
            }
          }
        }
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const DELETE_PROFILE = gql`
  mutation DeleteProfile {
    deleteProfile {
      ok
    }
  }
`;
