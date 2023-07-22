import axios from 'axios';

export async function checkJob(token: string, jobId: string): Promise<any> {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `jobs/${jobId}`,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(err.response.data.data);
  }
}
