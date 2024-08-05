// utils/indexedDB.js
import { encryptData, decryptData } from "./encryption";

const dbName = "myAppDB";
const storeName = "myStore";

const openDB = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });

// Save encrypted data to IndexedDB
export const saveToDB = async (key, value) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  const encryptedValue = encryptData(value);

  store.put({ id: key, value: encryptedValue });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

// Retrieve and decrypt data from IndexedDB
export const getFromDB = async (key) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const result = event.target.result;
      if (result) {
        resolve(decryptData(result.value));
      } else {
        resolve(null);
      }
    };
    request.onerror = (event) => reject(event.target.error);
  });
};

// Delete data from IndexedDB
export const deleteFromDB = async (key) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.delete(key);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};
