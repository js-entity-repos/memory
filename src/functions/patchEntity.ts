import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <E extends Entity>(config: Config<E>): PatchEntity<E> => {
  return async ({ id, patch, filter = {} }) => {
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

    const patchEntities = matchedEntities.map((matchedEntity: E) => {
      return { ...matchedEntity as any, ...patch as any } as E;
    });
    const unmatchedEntities = filterEntities(storedEntities, { $nor: [idFilter] });
    config.setEntities([...unmatchedEntities, ...patchEntities]);
    return { entity: patchEntities[0] };
  };
};
