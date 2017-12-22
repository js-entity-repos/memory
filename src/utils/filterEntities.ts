// tslint:disable-next-line:no-unused
import { AndFilter, Filter, NotFilter, OrFilter } from '@js-entity-repos/core/dist/types/Filter';
import sift from 'sift';

export default <Entity>(entities: Entity[], filter: Filter<Entity>) => {
  const sifter = sift(filter as any);
  return entities.filter(sifter);
};
