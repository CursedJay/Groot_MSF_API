function getGearInventory(since = 'fresh') {
  const response = MSF.callApi(`/player/v1/inventory?itemType=GEAR&since=${since}`);

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      const inventory = {};
      inventory.gear = {};
      inventory.since = result?.meta?.asOf ?? '';

      for (let i = 0; i < result?.data.length; i++) {
        const { item, quantity } = result?.data[i];
        inventory.gear[item] = quantity || 0;
      }
      return inventory;
    case 344:
      return false;
    default:
      return false;
  }
}

// Get inventory by type of item. Can only get all types or by single type. Cannot get by multiple types
function getInventoryByType(itemType = undefined, since = 'fresh') {
  let inventoryUrl = `/player/v1/inventory?since=${since}`;

  if (itemType) {
    inventoryUrl += `&itemType=${itemType}`;
  }

  const response = MSF.callApi(inventoryUrl);

  if (!response) {
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);

      const inventory = {
        items: {}, // TODO: Remove this property after all sheets are upgraded to latest version that gets everything
        gear: {},
        isoitem: {},
        shard: {},
        rs: {},
        costume: {},
        consumable: {},
        ability_material: {},
        since: result?.meta?.asOf ?? ''
      };

      if (result?.data?.length < 1) {
        return inventory;
      }

      for (const element of result.data) {
        const { item, quantity } = element;
        inventory.items[item] = quantity || 0;

        const prefix = item.substring(0, item.indexOf('_'));
        switch (prefix) {
          case 'GEAR':
            inventory.gear[item] = quantity || 0;
            break;
          case 'ISOITEM':
            inventory.isoitem[item] = quantity || 0;
            break;
          case 'SHARD':
            inventory.shard[item] = quantity || 0;
            break;
          case 'RS':
            inventory.rs[item] = quantity || 0;
            break;
          case 'COSTUME':
            inventory.costume[item] = quantity || 0;
            break;
          case 'CONSUMABLE':
            inventory.consumable[item] = quantity || 0;
            break;
          case 'ABILITY':
            inventory.ability_material[item] = quantity || 0;
            break;
        }
      }

      return inventory;
    case 344:
      return false;
    default:
      return false;
  }
}

function getFullInventory(since = 'fresh') {
  const response = MSF.callApi(`/player/v1/inventory?itemFormat=object&since=${since}`);

  if (!response) {
    //STATUS_CELL.setValue('waiting for access');
    return false;
  }

  const responseCode = response.getResponseCode();

  switch (responseCode) {
    case 200:
      const responseText = response.getContentText();
      const result = JSON.parse(responseText);
      return result;
    case 344:
      //STATUS_CELL.setValue('UNCHANGED');
      return false;
    default:
      //STATUS_CELL.setValue(`Error: code ${responseCode}`);
      return false;
  }
}
