import ReplaceEntity from '@js-entity-repos/core/dist/signatures/ReplaceEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { difference } from 'lodash';
import Config from '../Config';
import filterEntity from '../utils/filterEntity';

export default <E extends Entity>(config: Config<E>): ReplaceEntity<E> => {
  return async ({ id, entity, filter = {} }) => {
    const storedEntities = config.getEntities();
    const matchedEntity = filterEntity(config, id, filter);
    const replacedEntity = { ...entity as any, id } as E;
    const unmatchedEntities = difference(storedEntities, [matchedEntity]);
    config.setEntities([...unmatchedEntities, replacedEntity]);
    return { entity: replacedEntity };
  };
};
