import { create } from 'zustand';
import { optionalDevtools } from 'zustand-utils';

it('optionalDevtools', () => {
  const middleware = optionalDevtools(false);
  const middlewareFalse = optionalDevtools(true);

  create<{ x: string }>()(middleware(() => ({ x: '1' })));
  create<{ x: string }>()(middlewareFalse(() => ({ x: '1' })));
});
