import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Id, Entity>(config: Config<Entity>): GetEntity<Id, Entity> => {
  return async ({ id }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, id);
    if (matchedEntities.length === 0) {
      throw new MissingEntityError(config.entityName, id);
    }
    if (matchedEntities.length > 1) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    const entity = matchedEntities[0];
    return { entity };
  };
};
