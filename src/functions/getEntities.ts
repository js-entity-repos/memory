import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import createCursorFromEntity from '@js-entity-repos/core/dist/utils/createCursorFromEntity';
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import { first, last } from 'lodash';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';
import sortEntities from '../utils/sortEntities';

export default <E extends Entity>(config: Config<E>): GetEntities<E> => {
  const defaultPagination = {
    cursor: undefined,
    forward: true,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: true } as Sort<E>;
  return async ({ filter = {}, sort = defaultSort, pagination = defaultPagination }) => {
    const paginationFilter = createPaginationFilter(pagination, sort);
    const fullFilter = { $and: [filter, paginationFilter] };
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities({ entities: storedEntities, filter: fullFilter });
    const sortedEntities = sortEntities({ entities: matchedEntities, sort });
    const start = pagination.forward ? 0 : 0 - pagination.limit;
    const end = pagination.forward ? pagination.limit : undefined;
    const entities = sortedEntities.slice(start, end);
    const nextCursor = createCursorFromEntity(last(entities), sort);
    const previousCursor = createCursorFromEntity(first(entities), sort);
    return { entities, nextCursor, previousCursor };
  };
};
