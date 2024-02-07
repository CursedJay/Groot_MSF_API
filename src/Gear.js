/** Get character data trimmed to just gear in a flattened material structure */
function getGearByCharacterId(charId) {
  const inventoryUrl = `/game/v1/characters/${charId}?charInfo=false&costumes=none&abilityKits=none&gearTiers=full&pieceInfo=none&pieceFlatCost=full&subPieceInfo=none`;

  const response = callApi_(inventoryUrl);

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200: {
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      return result.data;
    }
    case 344:
      return false;
    default:
      return false;
  }
}
