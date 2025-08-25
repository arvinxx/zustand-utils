import isEqual from 'fast-deep-equal';
import { useEffect } from 'react';
import { StoreApi } from 'zustand';

declare type WithoutCallSignature<T> = {
  [K in keyof T]: T[K];
};

/**
 * 该函数接收四个参数：key，value 、 deps setStoreState
 * @param {key}：需要更新的 Store 中的 key
 *  @param  value：需要更新的值
 *  @param  deps：依赖项数组，默认为 [value]
 *  @param  setStoreState：一个可选的回调函数，用于更新 Store 状态
 */
export type UseStoreUpdater<T> = <Key extends keyof T>(
  key: Key,
  value: T[Key],
  deps?: any[],
  setStateFn?: StoreApi<T>['setState'],
) => void;

// 定义一个函数，用于创建 Store 更新器
export const createStoreUpdater =
  <T>(storeApi: WithoutCallSignature<StoreApi<T>>): UseStoreUpdater<T> =>
  <Key extends keyof T>(
    key: Key,
    value: T[Key],
    deps = [value],
    setStateFn?: StoreApi<T>['setState'],
  ) => {
    // 获取 Store 更新函数
    const setState = setStateFn ?? storeApi.setState;
    // 使用 useEffect 监听依赖项变化
    useEffect(() => {
      // 如果 value 不为 undefined，就更新 Store 中的指定 key 的值
      if (typeof value !== 'undefined') {
        const state = storeApi.getState?.();
        if (isEqual(state?.[key], value)) return;

        // @ts-ignore
        setState({ [key]: value }, false, {
          type: `💭 useStoreUpdater / ${key.toString()}`,
          payload: value,
        });
      }
    }, deps);
  };
