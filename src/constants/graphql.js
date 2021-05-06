import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        auth_login(email: $email, password: $password){
            access_token
            refresh_token
        }
    }
`;

export const PRESENCE_MUTATUTION = gql`
    mutation($userid: ID!, $presence: Boolean){
        update_users_item(id: $userid, data: { is_present: $presence }){
            is_present
        }
    }
`;