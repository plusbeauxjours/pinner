import { gql } from "apollo-boost";
import {
  CITY_FRAGMENT,
  USER_FRAGMENT,
  COFFEE_FRAGMENT
} from "src/sharedQueries";

export const MATCH = gql`
  mutation Match($coffeeId: Int!) {
    match(coffeeId: $coffeeId) {
      ok
      coffeeId
      match {
        id
        naturalTime
        city {
          ...CityParts
        }
        host {
          ...UserParts
        }
        guest {
          ...UserParts
        }
        coffee {
          id
        }
        status
        isHost
        isGuest
        isMatching
      }
    }
  }
  ${USER_FRAGMENT}
  ${CITY_FRAGMENT}
`;

export const UNMATCH = gql`
  mutation UnMatch($matchId: Int!) {
    unMatch(matchId: $matchId) {
      ok
      matchId
      coffee {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
