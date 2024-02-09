import localforage from 'localforage';

export const  setLocalStorageData = async (key: string, value: string) => {
  
  return localStorage.setItem(key, value)
};

export const  getLocalStorageData = async (key: string) => {
  return localStorage.getItem(key)
};

export const clearLocalStorageData= ()=>{
  localStorage.clear()
}
