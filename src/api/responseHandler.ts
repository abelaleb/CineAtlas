export const handleResponse = (response: any) => {
    if (!response || !response.data) {
      throw new Error('Failed to fetch data. Please try again later.');
    }
    return response.data;
  };
  