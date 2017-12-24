# memory
> A concrete implementation of js-entity-repos for memory.

### Usage
1. Install it with `npm i @js-entity-repos/memory`.
1. For each entity you will need to do the following.
    1. [Create Id and Entity interfaces](#id-and-entity-interface).
    1. [Create a facade config](#facade-config).
    1. [Construct the facade with the config and interfaces](#calling-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

### Id and Entity Interface

```ts
export interface TodoId {
  readonly id: string;
}

export interface TodoEntity extends TodoId {
  readonly description: string;
  readonly completed: boolean;
}
```

### Facade Config

```ts
interface State {
  todos: TodoEntity[];
}

const state = { todos: [] };
const todoFacadeConfig = {
  getEntities: () => state.todos,
  setEntities: (todos) => state.todos = todos,
  entityName: 'todo',
};
```

### Construct the Facade

```ts
import facade from '@js-entity-repos/memory/dist/facade';

const todosFacade = facade<TodoId, TodoEntity>(todoFacadeConfig);
```
