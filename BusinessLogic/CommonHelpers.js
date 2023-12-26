export const getUpdatedArray = (array, updatedItem) => {
  let resultArray = null;

  const index = array.indexOf(updatedItem);
  if (index != -1) {
    const begin = array.slice(0, index);
    const end = array.slice(index + 1);

    resultArray = [...begin, updatedItem, ...end];
  } else {
    const newItems = array.filter((x) => x.id != updatedItem.id);
    resultArray = [...newItems, updatedItem];
  }

  return resultArray;
};

export const getNextId = (array) => {
  if (array.length == 0) return 1;

  const max = Math.max.apply(
    Math,
    array.map(function (o) {
      return o.id;
    })
  );

  return max;
};
