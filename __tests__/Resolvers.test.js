const { createTestClient } = require('apollo-server-testing');

const { query, mutate } = createTestClient(server);

query({
  query: GET_EVENT,
  variables: { id: "ck8qd0ecb000v07523uvv7sah" }
});

mutate({
  mutation: UPDATE_EVENT,
  variables: { id: "ck8qd0ecb000v07523uvv7sah", event_name  }
})