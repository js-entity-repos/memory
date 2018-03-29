import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import countEntities from './functions/countEntities';
import createEntity from './functions/createEntity';
import getEntities from './functions/getEntities';
import getEntity from './functions/getEntity';
import patchEntity from './functions/patchEntity';
import removeEntities from './functions/removeEntities';
import removeEntity from './functions/removeEntity';
import replaceEntity from './functions/replaceEntity';
import createPromiser from './utils/createPromiser';

export default <E extends Entity>(factoryConfig: FactoryConfig<E>): Facade<E> => {
  // tslint:disable-next-line:no-let
  let entities: E[] = [];
  const facadeConfig: FacadeConfig<E> = {
    defaultPaginationLimit: 10,
    getEntities: () => entities,
    setEntities: (nextEntities) => entities = nextEntities,
    ...factoryConfig,
  };
  return {
    countEntities: createPromiser(countEntities<E>(facadeConfig)),
    createEntity: createPromiser(createEntity<E>(facadeConfig)),
    getEntities: createPromiser(getEntities<E>(facadeConfig)),
    getEntity: createPromiser(getEntity<E>(facadeConfig)),
    patchEntity: createPromiser(patchEntity<E>(facadeConfig)),
    removeEntities: createPromiser(removeEntities<E>(facadeConfig)),
    removeEntity: createPromiser(removeEntity<E>(facadeConfig)),
    replaceEntity: createPromiser(replaceEntity<E>(facadeConfig)),
  };
};
