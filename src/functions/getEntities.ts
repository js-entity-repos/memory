import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import createCursorFromEntity from '@js-entity-repos/core/dist/utils/createCursorFromEntity';
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import { first, last } from 'lodash';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';
import sortEntities from '../utils/sortEntities';

export default <Entity>(config: Config<Entity>): GetEntities<Entity> => {
  return async ({ filter, sort, pagination }) => {
    const paginationFilter = createPaginationFilter(pagination, sort);
    const fullFilter = { $and: [filter, paginationFilter] };
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, fullFilter);
    const sortedEntities = sortEntities(matchedEntities, sort);
    const start = pagination.forward ? 0 : 0 - pagination.limit;
    const end = pagination.forward ? pagination.limit : undefined;
    const entities = sortedEntities.slice(start, end);
    const nextCursor = createCursorFromEntity(last(entities), sort);
    const previousCursor = createCursorFromEntity(first(entities), sort);
    return { entities, nextCursor, previousCursor };
  };
};
