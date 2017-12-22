export default interface Config<Entity> {
  readonly getEntities: () => Entity[];
  readonly setEntities: (entities: Entity[]) => void;
  readonly entityName: string;
}
