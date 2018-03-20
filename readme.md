# memory
> A concrete implementation of js-entity-repos for memory.

### Usage
1. Install it with `npm i @js-entity-repos/memory`.
1. For each entity you will need to do the following.
    1. [Create Entity interface](#entity-interface).
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

### Construct the Facade

```ts
import factory from '@js-entity-repos/memory/dist/factory';

interface State { todos: TodoEntity[]; }
const state: State = { todos: [] };

const todosFacade = factory({
  // Optional property. Defaults to 10.
  defaultPaginationLimit: 10,
  entityName: 'todo',
  // Optional property. Defaults to using entities stored locally in the factory.
  getEntities: () => state.todos,
  // Optional property. Defaults to using entities stored locally in the factory.
  setEntities: (todos) => state.todos = todos,
});
```
