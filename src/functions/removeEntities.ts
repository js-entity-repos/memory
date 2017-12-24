import RemoveEntities from '@js-entity-repos/core/dist/signatures/RemoveEntities';
import Config from '../Config';
import filterEntities from '../utils/filterEntities';

export default <Entity>(config: Config<Entity>): RemoveEntities<Entity> => {
  return async ({ filter }) => {
    const storedEntities = config.getEntities();
    const unmatchedEntities = filterEntities(storedEntities, { $nor: [filter] });
    config.setEntities(unmatchedEntities);
  };
};
