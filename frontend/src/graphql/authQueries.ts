import { gql } from '@apollo/client';

// Query: Get User by ID
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      createdAt
    }
  }
`;

// Mutation: Sign In
export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

// Mutation: Sign Up
export const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
        createdAt
      }
      token
    }
  }
`;

// Mutation: Refresh Token
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token)
  }
`;
