# zustand-utils

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- gitpod url -->

[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
[gitpod-url]: https://gitpod.io/#https://github.com/arvinxx/zustand-utils

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/zustand-utils.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/zustand-utils
[npm-size]: https://img.shields.io/bundlephobia/minzip/zustand-utils?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=zustand-utils

<!-- coverage -->

[coverage]: https://codecov.io/gh/arvinxx/zustand-utils/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/arvinxx/zustand-utils/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/arvinxx/zustand-utils/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/arvinxx/zustand-utils/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/arvinxx/zustand-utils/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/arvinxx/zustand-utils/actions?query=workflow%3ARelease%20CI
[download-image]: https://img.shields.io/npm/dm/zustand-utils.svg?style=flat-square
[download-url]: https://npmjs.org/package/zustand-utils

## Introduction

Some utils for zustand

### createContext

A replacement createContext from zustand/context that is deprecated in v4 and will be removed in v5. (Discussion: [#1276](https://github.com/pmndrs/zustand/discussions/1276))

```tsx
import create from 'zustand'
import createContext from 'zustand/context'

const { Provider, useStore } = createContext()

const createStore = () => create(...)

const App = () => (
  <Provider createStore={createStore}>
    ...
  </Provider>
)

const Component = () => {
  const state = useStore()
  const slice = useStore(selector)
  ...
```

## Usage

### createContext

#### createContext usage in real components

> Migration from [zustand-v3-create-context.md](https://github.com/pmndrs/zustand/blob/b857d5e79f41e2e2c756448eca466ac31abdabc3/docs/previous-versions/zustand-v3-create-context.md)

```jsx
import create from "zustand";
import createContext from "zustand/context";

// Best practice: You can move the below createContext() and createStore to a separate file(store.js) and import the Provider, useStore here/wherever you need.

const { Provider, useStore } = createContext();

const createStore = () =>
  create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }));

const Button = () => {
  return (
      {/** store() - This will create a store for each time using the Button component instead of using one store for all components **/}
    <Provider createStore={createStore}>
      <ButtonChild />
    </Provider>
  );
};

const ButtonChild = () => {
  const state = useStore();
  return (
    <div>
      {state.bears}
      <button
        onClick={() => {
          state.increasePopulation();
        }}
      >
        +
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Button />
      <Button />
    </div>
  );
}
```

#### createContext usage with initialization from props

> Migration from [zustand-v3-create-context.md](https://github.com/pmndrs/zustand/blob/b857d5e79f41e2e2c756448eca466ac31abdabc3/docs/previous-versions/zustand-v3-create-context.md)

```tsx
import create from 'zustand';
import createContext from 'zustand/context';

const { Provider, useStore } = createContext();

export default function App({ initialBears }) {
  return (
    <Provider
      createStore={() =>
        create((set) => ({
          bears: initialBears,
          increase: () => set((state) => ({ bears: state.bears + 1 })),
        }))
      }
    >
      <Button />
    </Provider>
  );
}
```

#### Refactor app store to a component store with createContext

a most usage of createContext is refactoring an app to a component. Here's progress:

1. Create an App without context :

```ts
// store.ts
import create from 'zustand';

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

components in app use `useStore` to consume store:

```tsx
// Component.ts

import { useStore } from './store';

const ButtonChild = () => {
  const state = useStore();
  return (
    <div>
      {state.bears}
      <button
        onClick={() => {
          state.increasePopulation();
        }}
      >
        +
      </button>
    </div>
  );
};
export default ButtonChild;
```

2. Just wrapper the App with `createContext`, and don't need to refactor any code in children components.

It become a component, can be used in any other app.

```diff
// store.ts
import create from "zustand";

+ const createStore = ()=> create((set) => ({
- export const useStore =  create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }));

+ const { Provider, useStore } = createContext();

+ export { Provider, useStore ,  createStore }
```

```tsx
// Wrapper.tsx

import { createStore, Provider } from './store';

const Wrapper = () => {
  return (
    <Provider createStore={createStore}>
      <ButtonChild />
    </Provider>
  );
};
```

## License

[MIT](./LICENSE)
