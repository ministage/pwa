import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from "jwt-decode";
import { ApolloLink } from "apollo-link";

import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import {ACCESS_TOKEN, REFRESH_TOKEN, API_URL} from "@/constants/settings";


const url = process.env.VUE_APP_GRAPHQL_HTTP || API_URL;
const httpLink = createHttpLink({
  uri: url + '/graphql',
  credentials: "include"
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(ACCESS_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

const getRefeshToken = () => localStorage.getItem(REFRESH_TOKEN);

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: "access_token",
  // Check if the current access token is valid
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token)
      return true;

    try{
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }

  },
  // Fetch new access token
  fetchAccessToken: () => {
    console.log(process.env.VUE_APP_API_URI + '/test');
    return fetch(url + '/auth/refresh', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh_token: getRefeshToken()
      })
    });
  },
  // Set new access token
  handleFetch: accessToken => {
    localStorage.setItem(ACCESS_TOKEN, accessToken)
  }
})

// Install the vue plugin
Vue.use(VueApollo)

// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...options,
    link: ApolloLink.from([refreshTokenLink, authLink, httpLink])
  })
  apolloClient.wsClient = wsClient
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler (error) {

      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}

// Manually call this when user log in
export async function onLogin (apolloClient, access_token, refresh_token) {
  if (typeof localStorage !== 'undefined' && access_token) {
    localStorage.setItem(ACCESS_TOKEN, access_token)
    localStorage.setItem(REFRESH_TOKEN, refresh_token)
  }
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
  }
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}

