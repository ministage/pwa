import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        auth_login(email: $email, password: $password){
            access_token
            refresh_token
        }
    }
`;

export const CREATE_BOOKING_MUTATION = gql`
    mutation($date: Date!, $from: String!, $to: String!, $description: String!, $user: String!, $room: String!){
        create_bookings_item(data: {date: $date, from: $from, to: $to, description: $description, user: $user, room: $room}){
            id
        }
    }
`

export const EDIT_BOOKING_MUTATION = gql`
    mutation($date: Date!, $from: String!, $to: String!, $description: String!, $user: String!, $room: String!, $id: ID!){
        update_bookings_item(id: $id, data: {date: $date, from: $from, to: $to, description: $description, user: $user, room: $room}){
            id
        }
    }
`

export const DELETE_BOOKING_MUTATION = gql`
    mutation($id: ID!){
        delete_bookings_item(id: $id) {
            id
        }
    }
`