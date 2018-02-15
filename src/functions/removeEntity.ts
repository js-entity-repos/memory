import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import RemoveEntity from '@js-entity-repos/core/dist/signatures/RemoveEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: Config<E>): RemoveEntity<E> => {
  return async ({ id, filter = {} }) => {
    const entities = config.getEntities();
    const idFilter = { id } as Filter<E>;
    const fullFilter = { $and: [idFilter, filter] };
    const removalFilter = { $nor: [fullFilter] };
    const unmatchedEntities = filterEntities({ entities, filter: removalFilter });
    if (unmatchedEntities.length === entities.length) {
      throw new MissingEntityError(config.entityName, id);
    }
    /* istanbul ignore next */
    if ((unmatchedEntities.length + 1) !== entities.length) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    config.setEntities(unmatchedEntities);
  };
};
