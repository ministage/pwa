import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        auth_login(email: $email, password: $password){
            access_token
            refresh_token
        }
    }
`;