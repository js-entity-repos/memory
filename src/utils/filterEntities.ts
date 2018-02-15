import Entity from '@js-entity-repos/core/dist/types/Entity';
// tslint:disable-next-line:no-unused import-spacing
import { ConditionFilter, Filter, PropFilter } from '@js-entity-repos/core/dist/types/Filter';
import sift from 'sift';

export interface Opts<E extends Entity> {
  readonly entities: E[];
  readonly filter: Filter<E>;
}

export default <E extends Entity>({ entities, filter }: Opts<E>) => {
  const sifter = sift(filter as any);
  return entities.filter(sifter);
};
