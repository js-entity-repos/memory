import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import facade from './facade';

interface State {
  // tslint:disable-next-line:readonly-keyword
  entities: TestEntity[];
}

const state: State = { entities: [] };

facadeTest(facade<TestEntity>({
  defaultPaginationLimit: 100,
  entityName: 'Test Entity',
  getEntities: () => state.entities,
  setEntities: (entities) => state.entities = entities,
}));
