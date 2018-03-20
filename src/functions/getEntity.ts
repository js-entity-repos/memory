import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import filterEntity from '../utils/filterEntity';

export default <E extends Entity>({
  entityName,
  getEntities,
}: FacadeConfig<E>): GetEntity<E> => {
  return async ({ id, filter = {} }) => {
    const entities = getEntities();
    const entity = filterEntity({ entities, entityName, id, filter });
    return { entity };
  };
};
