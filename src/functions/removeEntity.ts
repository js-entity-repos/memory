import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import RemoveEntity from '@js-entity-repos/core/dist/signatures/RemoveEntity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Id, Entity>(config: Config<Entity>): RemoveEntity<Id> => {
  return async ({ id }) => {
    const storedEntities = config.getEntities();
    const unmatchedEntities = filterEntities(storedEntities, { $not: id });
    if (unmatchedEntities.length === storedEntities.length) {
      throw new MissingEntityError(config.entityName, id);
    }
    if ((unmatchedEntities.length + 1) !== storedEntities.length) {
      throw new ConflictingEntityError(config.entityName, id);
    }
    config.setEntities(unmatchedEntities);
  };
};
