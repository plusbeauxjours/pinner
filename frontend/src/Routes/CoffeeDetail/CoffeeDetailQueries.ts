import gql from "graphql-tag";

export const COFFEE_DETAIL = gql`
  query CoffeeDetail($coffeeId: Int!) {
    coffeeDetail(coffeeId: $coffeeId) {
      coffee {
        id
        expires
        naturalTime
        status
        target
        host {
          id
          username
          profile {
            avatar
            gender
            currentCity {
              cityName
              country {
                countryName
              }
            }
            isFollowing
            nationality {
              countryName
            }
            followersCount
            followingCount
            tripCount
          }
        }
      }
    }
  }
`;