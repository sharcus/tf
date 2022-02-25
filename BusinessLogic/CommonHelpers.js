export const getUpdatedArray = (array, updatedItem) => {

    let resultArray = null;

    const index = array.indexOf(updatedItem);
    if(index != -1) {
        const begin = array.slice(0, index);
        const end = array.slice(index + 1);

        resultArray = [...begin, updatedItem, ...end];
    }
    else {
        const newItems = array.filter(x => x.id != updatedItem.id);
        resultArray = [...newItems, activity]
    }

    return resultArray;
}