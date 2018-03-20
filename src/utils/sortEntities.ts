import Entity from '@js-entity-repos/core/dist/types/Entity';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import SortOrder, { asc } from '@js-entity-repos/core/dist/types/SortOrder';
import { orderBy } from 'lodash';

export interface Opts<E extends Entity> {
  readonly entities: E[];
  readonly sort: Sort<E>;
}

export default <E extends Entity>({ entities, sort }: Opts<E>) => {
  const sortKeys = Object.keys(sort);
  const sortDirections = sortKeys.map((sortKey) => {
    const sortOrder = (sort as any)[sortKey] as SortOrder;
    return sortOrder === asc ? 'asc' : 'desc';
  });
  return orderBy(entities, sortKeys, sortDirections);
};
