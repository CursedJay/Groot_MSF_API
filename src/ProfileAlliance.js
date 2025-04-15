function getAllianceProfile() {
  const response = callApi_('/player/v1/alliance/card');

  if (!response) return false;

  const responseCode = response.getResponseCode();
  switch (responseCode) {
    case 200: {
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      return result?.data;
    }
    default:
      console.error(`Error: code ${responseCode}`);
      return false;
  }
}

function getAllianceMembers() {
  const response = callApi_('/player/v1/alliance/members');

  if (!response) return false;

  const responseCode = response.getResponseCode();
  switch (responseCode) {
    case 200: {
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      return result?.data;
    }
    default:
      console.error(`Error: code ${responseCode}`);
      return false;
  }
}
