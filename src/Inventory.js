function getInventory(since = 'fresh') {
  const INVENTORY_VERSION_CELL = getNamedRange('Inventory_Since');
  const STATUS_CELL = getNamedRange('Inventory_Status');

  STATUS_CELL.setValue('🔴🔴🔴');

  const response = MSF.callApi(`/player/v1/inventory?itemType=GEAR&since=${since}`);

  if (!response) {
    STATUS_CELL.setValue('waiting for access');
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      const inventory = {};

      INVENTORY_VERSION_CELL.setValue(result?.meta?.asOf || '');
      STATUS_CELL.setValue('');

      for (let i = 0; i < result?.data.length; i++) {
        const { item, quantity } = result?.data[i];
        inventory[item] = quantity || 0;
      }
      return inventory;
    case 344:
      STATUS_CELL.setValue('UNCHANGED');
      return false;
    default:
      STATUS_CELL.setValue(`Error: code ${responseCode}`);
      return false;
  }
}
