/** Get a list of the playable characters */
function getCharacterList() {
  const response = callApi_(`/game/v1/characters?status=playable&charInfo=none`);

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);

      const characterList = result.data.map(({ id }) => id);

      return characterList;
    case 344:
      return false;
    default:
      return false;
  }
}
