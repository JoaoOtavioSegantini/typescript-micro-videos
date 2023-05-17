import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props> {
  public readonly entityId: UniqueEntityId;
  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.entityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.entityId.value;
  }

  toJson(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
