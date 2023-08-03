function getRoster(since = 'fresh') {
  const ROSTER_VERSION_CELL = getNamedRange('Roster_Since');

  const response = MSF.callApi(`/player/v1/roster?since=${since}`);

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      //const roster = {};

      ROSTER_VERSION_CELL.setValue(result?.meta?.asOf || '');

      //for (let i = 0; i < result?.data.length; i++) {
      //  const { item, quantity } = result?.data[i];
      //  inventory[item] = quantity || 0;
      //}
      return result;
    case 344:
      //STATUS_CELL.setValue('UNCHANGED');
      return false;
    default:
      //STATUS_CELL.setValue(`Error: code ${responseCode}`);
      return false;
  }
}

/** Get a list of the playable characters */
function getCharacterList() {
  const response = MSF.callApi(`/game/v1/characters?status=playable&charInfo=none`);

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
