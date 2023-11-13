function getProfile() {
  const response = callApi_('/player/v1/card');

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      return result?.data;
    default:
      console.error(`Error: code ${responseCode}`);
      return false;
  }
}
