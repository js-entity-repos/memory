import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Pagination from '@js-entity-repos/core/dist/types/Pagination';
import { forward } from '@js-entity-repos/core/dist/types/PaginationDirection';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import { asc } from '@js-entity-repos/core/dist/types/SortOrder';
import createGetEntitiesResult from '@js-entity-repos/core/dist/utils/createGetEntitiesResult';
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import FacadeConfig from '../FacadeConfig';
import filterEntities from '../utils/filterEntities';
import sortEntities from '../utils/sortEntities';

export default <E extends Entity>(config: FacadeConfig<E>): GetEntities<E> => {
  const defaultPagination: Pagination = {
    cursor: undefined,
    direction: forward,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: asc } as Sort<E>;
  return async ({ filter = {}, sort = defaultSort, pagination = defaultPagination }) => {
    const paginationFilter = createPaginationFilter(pagination, sort);
    const fullFilter = { $and: [filter, paginationFilter] };
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities({ entities: storedEntities, filter: fullFilter });
    const sortedEntities = sortEntities({ entities: matchedEntities, sort });
    const sliceStart = pagination.direction === forward ? 0 : 0 - pagination.limit;
    const sliceEnd = pagination.direction === forward ? pagination.limit : undefined;
    const entities = sortedEntities.slice(sliceStart, sliceEnd);
    const isEnd = sortedEntities.length <= pagination.limit;
    return createGetEntitiesResult({ entities, isEnd, pagination, sort });
  };
};
