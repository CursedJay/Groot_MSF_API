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
