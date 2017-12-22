import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import CreateEntity from '@js-entity-repos/core/dist/signatures/CreateEntity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Id, Entity>(config: Config<Entity>): CreateEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, id);
    if (matchedEntities.length > 0) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    config.setEntities([...config.getEntities(), entity]);
    return { entity };
  };
};
