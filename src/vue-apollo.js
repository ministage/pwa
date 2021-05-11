import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
//import { TokenRefreshLink } from 'apollo-link-token-refresh';
//import jwtDecode from "jwt-decode";
import { ApolloLink } from "apollo-link";

import {API_URL} from "@/constants/settings";
import {createApolloClient} from "vue-cli-plugin-apollo/graphql-client";
import {directus} from "@/main";


const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  await directus.auth.refresh();
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

export const getAccessToken = () => directus.auth.token;
export const loggedIn = () => directus.auth.token;

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
    link: ApolloLink.from([authLink, normalHttp]),
    defaultHttpLink: false
  }).apolloClient;

  const system = createApolloClient({
    ...options,
    link: ApolloLink.from([authLink, systemHttp]),
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
export async function onLogin (apolloClient) {
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}

