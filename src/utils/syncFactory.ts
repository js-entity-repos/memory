import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';
import FactoryConfig from '../FactoryConfig';
import countEntities from '../functions/countEntities';
import createEntity from '../functions/createEntity';
import getEntities from '../functions/getEntities';
import getEntity from '../functions/getEntity';
import patchEntity from '../functions/patchEntity';
import removeEntities from '../functions/removeEntities';
import removeEntity from '../functions/removeEntity';
import replaceEntity from '../functions/replaceEntity';
import SyncFacade from './SyncFacade';

export default <E extends Entity>(factoryConfig: FactoryConfig<E>): SyncFacade<E> => {
  // tslint:disable-next-line:no-let
  let entities: E[] = [];
  const facadeConfig: FacadeConfig<E> = {
    defaultPaginationLimit: 10,
    getEntities: () => entities,
    setEntities: (nextEntities) => entities = nextEntities,
    ...factoryConfig,
  };
  return {
    countEntities: countEntities<E>(facadeConfig),
    createEntity: createEntity<E>(facadeConfig),
    getEntities: getEntities<E>(facadeConfig),
    getEntity: getEntity<E>(facadeConfig),
    patchEntity: patchEntity<E>(facadeConfig),
    removeEntities: removeEntities<E>(facadeConfig),
    removeEntity: removeEntity<E>(facadeConfig),
    replaceEntity: replaceEntity<E>(facadeConfig),
  };
};
