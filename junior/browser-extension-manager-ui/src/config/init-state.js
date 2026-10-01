export let extensionsListData = null;

export function setExtensionsListData({ newValue, field, action }) {
  if (action === "set") {
    extensionsListData = newValue;
    return;
  }

  if (action === "change")
    for (const element of extensionsListData) {
      if (element.name === field) {
        element.isActive = newValue;
      }
    }

  if (action === "delete") {
    extensionsListData = extensionsListData.filter(
      (item) => item.name !== field,
    );
  }
}
