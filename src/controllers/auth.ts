import axios from 'axios';

export async function authenticate(): Promise<string> {
  console.log('[INFO] Authenticating...');
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.API_KEY}`,
      'basiq-version': '2.1',
    },
    url: 'token',
  };

  try {
    const response = await axios(config);
    console.log('[SUCCESS] Authentication successful!');
    return response.data.access_token;
  } catch (err) {
    console.error(err.response.data.data);
  }
}
