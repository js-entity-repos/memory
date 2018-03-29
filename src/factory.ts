import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FactoryConfig from './FactoryConfig';
import createPromiser from './utils/createPromiser';
import syncFactory from './utils/syncFactory';

export default <E extends Entity>(factoryConfig: FactoryConfig<E>): Facade<E> => {
  const syncFacade = syncFactory(factoryConfig);
  return {
    countEntities: createPromiser(syncFacade.countEntities),
    createEntity: createPromiser(syncFacade.createEntity),
    getEntities: createPromiser(syncFacade.getEntities),
    getEntity: createPromiser(syncFacade.getEntity),
    patchEntity: createPromiser(syncFacade.patchEntity),
    removeEntities: createPromiser(syncFacade.removeEntities),
    removeEntity: createPromiser(syncFacade.removeEntity),
    replaceEntity: createPromiser(syncFacade.replaceEntity),
  };
};
