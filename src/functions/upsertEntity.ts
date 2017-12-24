import UpsertEntity from '@js-entity-repos/core/dist/signatures/UpsertEntity';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';
import createEntity from './createEntity';
import overwriteEntity from './overwriteEntity';

export default <Id, Entity extends Id>(config: Config<Entity>): UpsertEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const storedEntities = config.getEntities();
    const matchedEntities = filterEntities(storedEntities, id);
    if (matchedEntities.length === 0) {
      return createEntity(config)({ id, entity });
    } else {
      return overwriteEntity(config)({ id, entity });
    }
  };
};
