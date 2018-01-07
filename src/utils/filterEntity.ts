import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Config from '../Config';
import filterEntities from './filterEntities';

export default <E extends Entity>(config: Config<E>, id: string, filter: Filter<E>) => {
  const storedEntities = config.getEntities();
  const idFilter = { id } as Filter<E>;
  const fullFilter = { $and: [idFilter, filter] };
  const matchedEntities = filterEntities(storedEntities, fullFilter);
  if (matchedEntities.length === 0) {
    throw new MissingEntityError(config.entityName, id);
  }
  /* istanbul ignore next */
  if (matchedEntities.length > 1) {
    throw new ConflictingEntityError(config.entityName, id);
  }
  return matchedEntities[0];
};
