import { gql } from "apollo-boost";
import { DETAIL_CARD_FRAGMENT } from "../../sharedQueries";

export const GET_FEED = gql`
  query Feed($page: Int!, $cityname: String!) {
    feed(page: $page, cityname: $cityname) {
      cards {
        ...DetailParts
      }
    }
  }
  ${DETAIL_CARD_FRAGMENT}
`;
