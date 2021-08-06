const endPointURL = " http://localhost:9000/graphql";
export async function loadJobs() {
  const res = await fetch(endPointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
        {
          jobs{
            id
            title
            company{
              name
            }
          }
        }
      `,
    }),
  });

  const responseBody = await res.json();
  return responseBody.data.jobs;
}
