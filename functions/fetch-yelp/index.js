const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  // add code here to fetch data from yelp API
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;
  try {
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${search}`,
      {
        headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
      }
    );
    const data = await resp.json();
    const json = JSON.stringify({ data });

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };
