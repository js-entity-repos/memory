import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Id, Entity>(config: Config<Entity>): PatchEntity<Id, Entity> => {
  return async ({ id, patch }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, id);
    if (matchedEntities.length === 0) {
      throw new MissingEntityError(config.entityName, id);
    }
    /* istanbul ignore next */
    if (matchedEntities.length > 1) {
      throw new ConflictingEntityError(config.entityName, id);
    }

    const patchEntities = matchedEntities.map((matchedEntity) => {
      return { ...matchedEntity as any, ...patch as any } as Entity;
    });
    const unmatchedEntities = filterEntities(storedEntities, { $not: id });
    config.setEntities([...unmatchedEntities, ...patchEntities]);
    return { entity: patchEntities[0] };
  };
};
