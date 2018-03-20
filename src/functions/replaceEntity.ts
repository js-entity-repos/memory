import ReplaceEntity from '@js-entity-repos/core/dist/signatures/ReplaceEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { difference } from 'lodash';
import FacadeConfig from '../FacadeConfig';
import filterEntity from '../utils/filterEntity';

export default <E extends Entity>({
  entityName,
  getEntities,
  setEntities,
}: FacadeConfig<E>): ReplaceEntity<E> => {
  return async ({ id, entity, filter = {} }) => {
    const entities = getEntities();
    const matchedEntity = filterEntity({ entities, entityName, id, filter });
    const replacedEntity = { ...entity as any, id } as E;
    const unmatchedEntities = difference(entities, [matchedEntity]);
    setEntities([...unmatchedEntities, replacedEntity]);
    return { entity: replacedEntity };
  };
};
