import Sort from '@js-entity-repos/core/dist/types/Sort';
import { orderBy } from 'lodash';

export default <Entity>(entities: Entity[], sort: Sort<Entity>) => {
  const sortKeys = Object.keys(sort);
  const sortDirections = sortKeys.map((sortKey) => {
    const sortAscending = (sort as any)[sortKey] as boolean;
    return sortAscending ? 'asc' : 'desc';
  });
  return orderBy(entities, sortKeys, sortDirections);
};
