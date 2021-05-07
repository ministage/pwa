import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from "jwt-decode";
import { ApolloLink } from "apollo-link";

import {ACCESS_TOKEN, REFRESH_TOKEN, API_URL} from "@/constants/settings";
import {createApolloClient} from "vue-cli-plugin-apollo/graphql-client";


const url = process.env.VUE_APP_GRAPHQL_HTTP || API_URL;


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

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'data',
  // Check if the current access token is valid
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token)
      return true;
    if(token === "false")
      return false;

    try{
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }

  },
  // Fetch new access token
  fetchAccessToken: () => {
    let token = getRefreshToken();
    let body = JSON.stringify({
      refresh_token: token
    });
    return fetch(url + '/auth/refresh', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });
  },

  handleResponse: () => { return function (response) {
    return response
        .text()
        .then(function (bodyText) {
          if (typeof bodyText !== 'string' || !bodyText.length) {
            return bodyText || '';
          }
          try {
            return JSON.parse(bodyText);
          } catch (err) {
            var parseError = err;
            parseError.response = response;
            parseError.statusCode = response.status;
            parseError.bodyText = bodyText;
            return Promise.reject(parseError);
          }
        })
        .then(function (parsedBody) {
          if (response.status >= 300) {
            this.throwServerError(response, parsedBody, "Response not successful: Received status code " + response.status);
          }
          return {
            data: parsedBody
          };
        });
    }
  },
  // Set new access token
  handleFetch: (tokens) => {
    const { access_token, refresh_token } = tokens;
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
  }
})

// Install the vue plugin
Vue.use(VueApollo)

const normalHttp = createHttpLink({
  uri: API_URL + '/graphql',
})

const systemHttp = createHttpLink({
  uri: API_URL + '/graphql/system',
})

// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client
  const normal = createApolloClient({
    ...options,
    link: ApolloLink.from([refreshTokenLink, authLink, normalHttp]),
    defaultHttpLink: false
  }).apolloClient;

  const system = createApolloClient({
    ...options,
    link: ApolloLink.from([refreshTokenLink, authLink, systemHttp]),
    defaultHttpLink: false,
  }).apolloClient;

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    clients: {
      normal,
      system
    },
    defaultClient: normal,
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

