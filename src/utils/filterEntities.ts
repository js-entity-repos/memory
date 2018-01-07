import Entity from '@js-entity-repos/core/dist/types/Entity';
// tslint:disable-next-line:no-unused import-spacing
import { ConditionFilter, Filter, PropFilter } from '@js-entity-repos/core/dist/types/Filter';
import sift from 'sift';

export default <E extends Entity>(entities: E[], filter: Filter<E>) => {
  const sifter = sift(filter as any);
  return entities.filter(sifter);
};
