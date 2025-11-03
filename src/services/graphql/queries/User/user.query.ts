import { gql } from "@apollo/client";
import { USER_FIELDS_WITH_VALID_EMAILS } from "./user.fragment";

export const GET_CURRENT_USER = gql`
  ${USER_FIELDS_WITH_VALID_EMAILS}
  query getCurrentUser {
    getCurrentUser {
      ...UserFieldsWithValidEmails
    }
  }
`;
