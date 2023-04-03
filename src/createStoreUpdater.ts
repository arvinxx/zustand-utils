import { useEffect } from 'react';
import { StoreApi } from 'zustand';

declare type WithoutCallSignature<T> = {
  [K in keyof T]: T[K];
};

// 定义一个函数，用于创建 Store 更新器
export const createStoreUpdater =
  <T>(storeApi: WithoutCallSignature<StoreApi<T>>) =>
  // 该函数接收三个参数：key，value 和 deps
  // key：需要更新的 Store 中的 key
  // value：需要更新的值
  // deps：依赖项数组，默认为 [value]
  // setStoreState：一个可选的回调函数，用于更新 Store 状态
  (key: keyof T, value: any, deps = [value], setStoreState?: (param: any) => void) => {
    // 获取 Store 更新函数
    const setState = setStoreState ?? storeApi.setState;
    // 使用 useEffect 监听依赖项变化
    useEffect(() => {
      // 如果 value 不为 undefined，就更新 Store 中的指定 key 的值
      if (typeof value !== 'undefined') {
        // @ts-ignore
        setState({ [key]: value });
      }
    }, deps);
  };
