import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import OverwriteEntity from '@js-entity-repos/core/dist/signatures/OverwriteEntity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Id, Entity extends Id>(config: Config<Entity>): OverwriteEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, id);
    if (matchedEntities.length === 0) {
      throw new MissingEntityError(config.entityName, id);
    }
    /* istanbul ignore next */
    if (matchedEntities.length > 1) {
      throw new ConflictingEntityError(config.entityName, id);
    }

    const overwrittenEntities = matchedEntities.map(() => {
      return { ...entity as any, ...id as any } as Entity;
    });
    const unmatchedEntities = filterEntities(storedEntities, { $nor: [id] });
    config.setEntities([...unmatchedEntities, ...overwrittenEntities]);
    return { entity: overwrittenEntities[0] };
  };
};
