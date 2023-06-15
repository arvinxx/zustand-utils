import { renderHook } from '@testing-library/react';
import { useEffect } from 'react';
import { vi } from 'vitest';
import { StoreApi } from 'zustand';
import { createStoreUpdater } from 'zustand-utils';

// mock react 和 zustand
vi.mock('react', () => ({
  useEffect: vi.fn(),
}));
vi.mock('zustand', () => ({
  create: vi.fn(),
}));

describe('createStoreUpdater', () => {
  const setState = vi.fn();
  const storeApi = {
    setState,
  } as unknown as StoreApi<any>;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update store state correctly', () => {
    const key = 'foo';
    const value = 'bar';

    const { result } = renderHook(() =>
      createStoreUpdater(storeApi)(key, value, [value], setState),
    );

    // 检查 useEffect 是否被正确调用
    expect(useEffect).toHaveBeenCalledTimes(1);
    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [value]);

    // 手动触发 useEffect 中的回调函数
    const [callback] = (useEffect as any).mock.calls[0];
    callback();

    // 检查 setState 是否被正确调用
    expect(setState).toHaveBeenCalledTimes(1);

    expect(setState).toHaveBeenCalledWith({ foo: 'bar' }, false, {
      type: '💭 useStoreUpdater / foo',
      payload: 'bar',
    });

    // 检查返回值是否为 undefined
    expect(result.current).toBeUndefined();
  });

  it('should not update store state if value is undefined', () => {
    const key = 'foo';
    const value = undefined;

    const { result } = renderHook(() =>
      createStoreUpdater(storeApi)(key, value, [value], setState),
    );

    // 检查 useEffect 是否被正确调用
    expect(useEffect).toHaveBeenCalledTimes(1);
    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [value]);

    // 手动触发 useEffect 中的回调函数
    const [callback] = (useEffect as any).mock.calls[0];
    callback();

    // 检查 setState 是否被正确调用
    expect(setState).not.toHaveBeenCalled();

    // 检查返回值是否为 undefined
    expect(result.current).toBeUndefined();
  });
});
