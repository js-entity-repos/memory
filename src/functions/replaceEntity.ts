import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import ReplaceEntity from '@js-entity-repos/core/dist/signatures/ReplaceEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: Config<E>): ReplaceEntity<E> => {
  return async ({ id, entity, filter = {} }) => {
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

    const replacedEntities = matchedEntities.map(() => {
      return { ...entity as any, id } as E;
    });
    const unmatchedEntities = filterEntities(storedEntities, { $nor: [fullFilter] });
    config.setEntities([...unmatchedEntities, ...replacedEntities]);
    return { entity: replacedEntities[0] };
  };
};
