import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_LISTS_KEY = `@lists`;

export const clearAllData = () => {
  AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
};

/*
 * The following wrap around AsyncStorage methods to:
 * - Augment success/failures with console logging messages
 * - Enforce correct type on arguments
 */

export const getFromStorage = (key: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    AsyncStorage.getItem(key)
      .then((res: any) => {
        console.log(
          `Got value in key ${key} from Async Storage:${JSON.stringify(res)}`,
        );
        resolve(JSON.parse(res));
      })
      .catch((err: any) => {
        console.log(`Failed to retrieve data from Async Storage for ${key}`);
        reject(err);
      });
  });
};

export const setInStorage = (key: string, value: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    AsyncStorage.setItem(key, value)
      .then(() => {
        resolve();
      })
      .catch((err: any) => {
        console.log(
          `Failed to set data for Async Storage for ${key} with value: ${value}`,
        );
        reject(err);
      });
  });
};

export const mergeInStorage = (key: string, value: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    AsyncStorage.mergeItem(key, value)
      .then(() => {
        resolve();
      })
      .catch((err: any) => {
        console.log(
          `Failed to merge data for Async Storage for ${key} with value: ${value}`,
        );
        reject(err);
      });
  });
};

export const addList = (listID: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    const newItemObj = {
      [listID]: {
        items: {
        },
      },
    };
    const newItemStr = JSON.stringify(newItemObj);
    getFromStorage(STORAGE_LISTS_KEY)
      .then(async (lists: any) => {
        // If key is already defined in the storage, use the mergeItem API
        // otherwise, use setItem
        if (lists) {
          mergeInStorage(`@lists`, newItemStr)
            // AsyncStorage.mergeItem API docs says that the promise is supposed to return the new
            // merged value for the given key, but it doesn't appear to work. Instead, requery
            // the storage for the value @lists and forward it with next
            .then(() => {
              getFromStorage(STORAGE_LISTS_KEY).then((listsData: any) =>
                resolve(listsData),
              );
            })
            .catch((err: any) => reject(err));
        } else {
          setInStorage(`@lists`, newItemStr)
            .then(() => resolve(newItemObj))
            .catch((err: any) => reject(err));
        }
      })
      .catch((err: any) => reject(err));
  });
};

export const addItemToList = (listID: string, item: any): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    const newItemObj = {
      [listID]: {
        items: {
          [item.id]: {
            item: item.item,
          },
        },
      },
    };
    const newItemStr = JSON.stringify(newItemObj);
    getFromStorage(STORAGE_LISTS_KEY)
      .then(async (lists: any) => {
        // If key is already defined in the storage, use the mergeItem API
        // otherwise, use setItem
        if (lists) {
          mergeInStorage(`@lists`, newItemStr)
            // AsyncStorage.mergeItem API docs says that the promise is supposed to return the new
            // merged value for the given key, but it doesn't appear to work. Instead, requery
            // the storage for the value @lists and forward it with next
            .then(() => {
              getFromStorage(STORAGE_LISTS_KEY).then((listsData: any) =>
                resolve(listsData),
              );
            })
            .catch((err: any) => reject(err));
        } else {
          setInStorage(`@lists`, newItemStr)
            .then(() => resolve(newItemObj))
            .catch((err: any) => reject(err));
        }
      })
      .catch((err: any) => reject(err));
  });
};

export const deleteItemFromStorage = (
  listID: string,
  itemID: string,
): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    getFromStorage(STORAGE_LISTS_KEY)
      .then((lists: any) => {
        if (lists) {
          const newLists = {...lists};
          delete newLists[listID].items[itemID];
          setInStorage(STORAGE_LISTS_KEY, JSON.stringify(newLists))
            .then(() => resolve(newLists))
            .catch((err: any) => reject(err));
        }
      })
      .catch((err: any) => reject(err));
  });
};
