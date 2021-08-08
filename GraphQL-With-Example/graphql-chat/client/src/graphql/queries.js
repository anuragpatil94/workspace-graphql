import gql from "graphql-tag";
import client from "./client";

const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;

const addMessageMutation = gql`
  mutation AddMessageMutation($input: MessageInput!) {
    message: addMessage(input: $input) {
      id
      from
      text
    }
  }
`;

const messageAddedSubscription = gql`
  subscription {
    messageAdded {
      id
      from
      text
    }
  }
`;

export async function onMessageAdded(handleMessage) {
  // Start subscription. initiates graphql subscription with the server
  const observable = client.subscribe({ query: messageAddedSubscription });

  // This is to dispatch messages to components (to different part of client app)
  return observable.subscribe((result) =>
    handleMessage(result.data.messageAdded)
  );
}

export async function addMessage(text) {
  const { data } = await client.mutate({
    mutation: addMessageMutation,
    variables: { input: { text } },
  });
  return data.message;
}

export async function getMessages() {
  const { data } = await client.query({ query: messagesQuery });
  return data.messages;
}
