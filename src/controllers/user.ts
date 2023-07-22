import axios from 'axios';

export async function createUser(token: string): Promise<string> {
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      email: 'gavin@hooli.com',
      mobile: '+61410888666',
      firstName: 'Joe',
      lastName: 'Bloggs',
    },
    url: 'users',
  };

  try {
    const response = await axios(config);
    return response.data.id;
  } catch (err) {
    console.error(err.response.data.data);
  }
}

export async function connectUser(
  token: string,
  userId: string
): Promise<string> {
  const params = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `/users/${userId}/connections`,
    data: {
      loginId: 'gavinBelson',
      password: 'hooli2016',
      institution: {
        id: 'AU00000',
      },
    },
  };
  try {
    const response = await axios(params);
    return response.data.id;
  } catch (err) {
    console.error(err.response.data.data);
  }
}
