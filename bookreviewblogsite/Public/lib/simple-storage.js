const setStorage = (key, data) => {
  const dataAsString = JSON.stringify(data);
  const encodedData = btoa(dataAsString);
  localStorage.setItem(key, encodedData);
  console.log(`Stored item with key: ${key}`);
};

const getStorage = (key) => {
  const encodedData = localStorage.getItem(key);
  console.log(`Retrieved item with key: ${key}`);
  if (!encodedData) {
    return null;
  }
  const decodedData = atob(encodedData);
  console.log(`decodedData item with key: ${decodedData}`);
  return JSON.parse(decodedData);
};

const clearStorage = (key) => {
  localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;
  