import { useEffect } from 'react';
import { StoreApi } from 'zustand';

export const createStoreUpdater =
  <T>(storeApi: StoreApi<T>) =>
  (key: keyof T, value: any, deps = [value], setStoreState?: (param: any) => void) => {
    const setState = setStoreState ?? storeApi.setState;
    useEffect(() => {
      if (typeof value !== 'undefined') {
        // @ts-ignore
        setState({ [key]: value });
      }
    }, deps);
  };
