function getLocalizationFile(fileName) {
  let fileUrl = `/game/v1/localizations/${fileName}`;

  const response = MSF.callApi(fileUrl);

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      return result?.data;
    case 344:
      return false;
    default:
      return false;
  }
}
