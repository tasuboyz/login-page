// import {URL} from '../setup/config';

interface Post {
  title: string;
  description: string;
  tag: string;
  dateTime: string;
  userId: number | null;
}

interface Login {
  userId: number | null;
  account: string;
  wif: string;
}

interface Upload {
  userId: number | null;
  imageBase64: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function apiCall<T>(endpoint: string, method: string, data?: string): Promise<ApiResponse<T>> {
  // const URL = await fetchAssetsUrl();
  const headers = {
    "accept": "application/json",
    "authorization": "Bearer my-secret",
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(`https://32f4-2-36-107-169.ngrok-free.app${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your credentials');
      }
      if (response.status === 399) {
        throw new Error('Error: the date is behind');
      }
      throw new Error('API call failed');
    }

    const responseData: T = await response.json();
    return { data: responseData };
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('API call error:', errorMessage);
    return { data: {} as T, error: errorMessage };
  }
}

// API methods
export const postAPI = {
  submit: async (post: Post): Promise<ApiResponse<string>> => {    
    return apiCall('/post', 'POST', JSON.stringify(post));
  },

  searchCommunity: async (communityname: string): Promise<ApiResponse<Array<{ id: string, name: string }>>> => {
    return apiCall('/community', 'POST', JSON.stringify({ community: communityname }));
  },

  uploadImage: async (upload: Upload): Promise<ApiResponse<string>> => {
    return apiCall('/image', 'POST', JSON.stringify(upload));
  },

  login: async (login: Login): Promise<ApiResponse<string>> => {
    return apiCall('/login', 'POST', JSON.stringify(login));
  },
};

