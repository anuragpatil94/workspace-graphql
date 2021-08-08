import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  ApolloLink,
} from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";

const endPointURL = " http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  // forward function allows us to chain multiple steps together
  return forward(operation);
});
/**
 * `authLink` is added before `HttpLink`. This means that `authLink` will be
 * executed before `HttpLink`
 */
const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endPointURL })]),
  cache: new InMemoryCache(),
});

// Queries
const loadCompanyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

const loadJobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

const loadJobsQuery = gql`
  {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

const createJobMutation = gql`
  mutation ($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export async function loadJobs() {
  // const { jobs } = await graphqlRequest(query);
  const {
    data: { jobs },
  } = await client.query({ query: loadJobsQuery, fetchPolicy: "no-cache" });

  return jobs;
}

export async function loadJob(id) {
  const {
    data: { job },
  } = await client.query({ query: loadJobQuery, variables: { id } });
  // const { job } = await graphqlRequest(query, { id });
  return job;
}

export async function loadCompany(id) {
  const {
    data: { company },
  } = await client.query({ query: loadCompanyQuery, variables: { id } });
  // const { company } = await graphqlRequest(query, { id });
  return company;
}

export async function createJob(input) {
  // update function lets you directly modify cache.
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, mutationResult) => {
      const { data } = mutationResult;
      cache.writeQuery({
        query: loadJobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  // const { job } = await graphqlRequest(mutation, { input });
  return job;
}

/**
 * NOTE: We are using apollo-client now, so this function will not be used.
 *
 * A Generic function that handles graphql requests
 * @param {String} query takes query as a string instead of gql tag function (object)
 * @param {object} variables list of variables that the query uses
 * @returns object
 */
// eslint-disable-next-line no-unused-vars
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };
  if (isLoggedIn()) {
    request.headers["authorization"] = `Bearer ${getAccessToken()}`;
  }
  const response = await fetch(endPointURL, request);

  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((err) => err.message).join("\n");
    throw new Error(message);
  }
  return responseBody.data;
}
