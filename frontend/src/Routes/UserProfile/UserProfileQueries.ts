import { gql } from "apollo-boost";
import { CARD_FRAGMENT } from "src/sharedQueries";

export const GET_USER = gql`
  query UserProfile($username: String!) {
    userProfile(username: $username) {
      user {
        id
        username
        firstName
        lastName
        profile {
          bio
          gender
          avatar
          website
          postCount
          followersCount
          followingCount
          followings {
            user {
              username
              profile {
                avatar
              }
            }
          }
          followers {
            user {
              username
              profile {
                avatar
              }
            }
          }
          isFollowing
          isSelf
          cityCount
          currentCity {
            cityName
            cityPhoto
            country {
              countryName
              countryCode
            }
          }
        }
        cards {
          ...CardParts
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $userName: String
    $bio: String
    $gender: String
    $avatar: String
    $firstName: String
    $lastName: String
  ) {
    editProfile(
      username: $userName
      bio: $bio
      gender: $gender
      avatar: $avatar
      firstName: $firstName
      lastName: $lastName
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
          avatar
        }
      }
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation DeleteProfile {
    deleteProfile {
      ok
    }
  }
`;

// export const GET_TOP_COUNTRIES = gql`
//   query TopCountries {
//     topCountries {
//       countries {
//         countryName
//         countryCode
//         countryPhoto
//       }
//     }
//   }
// `;
