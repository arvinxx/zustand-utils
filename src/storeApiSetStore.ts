import { StoreApi } from 'zustand';

export type WithoutCallSignature<T> = {
  [K in keyof T]: T[K];
};

export const storeApiSetState = <T = any>(
  storeApi: WithoutCallSignature<StoreApi<T>>,
  state: Partial<T>,
  replace: boolean,
  action: any,
) => {
  (storeApi.setState as any)(state, false, action);
};
