# memory
> A concrete implementation of js-entity-repos for memory.

### Usage
1. Install it with `npm i @js-entity-repos/memory`.
1. For each entity you will need to do the following.
    1. [Create Entity interface](#entity-interface).
    1. [Create a factory config](#factory-config).
    1. [Construct the facade](#construct-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

### Entity Interface

```ts
import Entity from '@js-entity-repos/core/dist/types/Entity';

export interface TodoEntity extends Entity {
  readonly description: string;
  readonly completed: boolean;
}
```

### Factory Config

```ts
import FactoryConfig from '@js-entity-repos/memory/dist/Config';

interface State {
  todos: TodoEntity[];
}

const state: State = { todos: [] };
const todoFactoryConfig: FactoryConfig = {
  defaultPaginationLimit: 100,
  entityName: 'todo',
  getEntities: () => state.todos,
  setEntities: (todos) => state.todos = todos,
};
```

### Construct the Facade

```ts
import factory from '@js-entity-repos/memory/dist/factory';

const todosFacade = factory(todoFactoryConfig);
```
