import gql from "graphql-tag";

export const projectQuery = gql`
  query projectQuery {
    projects {
      data {
        id
        attributes {
          Prompt
          Title
          Summary
        }
      }
    }
  }
`;
