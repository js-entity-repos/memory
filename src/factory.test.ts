import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import factory from './factory';

interface State {
  // tslint:disable-next-line:readonly-keyword
  entities: TestEntity[];
}

const state: State = { entities: [] };

facadeTest(factory({
  defaultPaginationLimit: 100,
  entityName: 'Test Entity',
  getEntities: () => state.entities,
  setEntities: (entities) => state.entities = entities,
}));
