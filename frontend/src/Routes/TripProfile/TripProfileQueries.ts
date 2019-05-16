import gql from "graphql-tag";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const TRIP_PROFILE = gql`
  query TripProfile($cityName: String!, $startDate: Date!, $endDate: Date!) {
    tripProfile(cityName: $cityName, startDate: $startDate, endDate: $endDate) {
      usersBefore {
        actor {
          profile {
            id
            username
            avatar
            isFollowing
            isSelf
            currentCity {
              cityName
              country {
                countryName
              }
            }
          }
        }
      }
      userCount
      coffees {
        id
        target
        host {
          profile {
            avatar
          }
        }
      }
      city {
        latitude
        longitude
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
        }
        cardCount
        userCount
        userLogCount
      }
    }
  }
`;

export const GET_DURATION_CARDS = gql`
  query GetDurationCards(
    $page: Int
    $cityName: String!
    $startDate: Date!
    $endDate: Date!
  ) {
    getDurationCards(
      page: $page
      cityName: $cityName
      startDate: $startDate
      endDate: $endDate
    ) {
      hasNextPage
      cards {
        ...CardParts
      }
    }
  }
  ${CARD_FRAGMENT}
`;
