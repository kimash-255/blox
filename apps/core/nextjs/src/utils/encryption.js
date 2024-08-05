// utils/encryption.js
import CryptoJS from "crypto-js";

// Define your secret key
const SECRET_KEY = "#bp*FlP,Apy:V%JmI,SsmL/);BOV7->p";

export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
