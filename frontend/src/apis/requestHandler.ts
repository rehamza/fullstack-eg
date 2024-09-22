const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("Request failed", error);
    throw error;
  }
};

export default handleRequest;
