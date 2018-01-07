# memory
> A concrete implementation of js-entity-repos for memory.

### Usage
1. Install it with `npm i @js-entity-repos/memory`.
1. For each entity you will need to do the following.
    1. [Create Entity interface](#entity-interface).
    1. [Create a facade config](#facade-config).
    1. [Construct the facade](#calling-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

### Entity Interface

```ts
import Entity from '@js-entity-repos/core/dist/types/Entity';

export interface TodoEntity extends Entity {
  readonly description: string;
  readonly completed: boolean;
}
```

### Facade Config

```ts
import FacadeConfig from '@js-entity-repos/memory/dist/Config';

interface State {
  todos: TodoEntity[];
}

const state: State = { todos: [] };
const todoFacadeConfig: FacadeConfig = {
  defaultPaginationLimit: 100,
  entityName: 'todo',
  getEntities: () => state.todos,
  setEntities: (todos) => state.todos = todos,
};
```

### Construct the Facade

```ts
import facade from '@js-entity-repos/memory/dist/facade';

const todosFacade = facade<TodoEntity>(todoFacadeConfig);
```
