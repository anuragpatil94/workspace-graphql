import { ApolloClient, HttpLink, InMemoryCache, gql } from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";

const endPointURL = " http://localhost:9000/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: endPointURL }),
  cache: new InMemoryCache(),
});

export async function loadJobs() {
  const query = gql`
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
  // const { jobs } = await graphqlRequest(query);
  const {
    data: { jobs },
  } = await client.query({ query });

  return jobs;
}

export async function loadJob(id) {
  const query = gql`
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
  const {
    data: { job },
  } = await client.query({ query, variables: { id } });
  // const { job } = await graphqlRequest(query, { id });
  return job;
}
export async function loadCompany(id) {
  const query = gql`
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
  const {
    data: { company },
  } = await client.query({ query, variables: { id } });
  // const { company } = await graphqlRequest(query, { id });
  return company;
}

export async function createJob(input) {
  const mutation = gql`
    mutation ($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;
  const {
    data: { job },
  } = await client.mutate({ mutation, variables: { input } });
  // const { job } = await graphqlRequest(mutation, { input });
  return job;
}

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
