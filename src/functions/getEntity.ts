import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Config from '../Config';
import filterEntity from '../utils/filterEntity';

export default <E extends Entity>(config: Config<E>): GetEntity<E> => {
  return async ({ id, filter = {} }) => {
    const entity = filterEntity(config, id, filter);
    return { entity };
  };
};
