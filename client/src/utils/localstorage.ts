import { useEffect } from 'react';
import localforage from 'localforage';

export const  setLocalStorageData = async (key: string, value: any) => {
  try {
    await localforage.setItem(key, value);
  } catch (error) {
    console.error('Error setting data in local storage:', error);
  }
};

export const  getLocalStorageData = async (key: string) => {
  try {
    const data = await localforage.getItem(key);
    return data;
  } catch (error) {
    console.error('Error getting data from local storage:', error);
  }
};

export const clearLocalStorageData= ()=>{
  localforage.clear()
}
