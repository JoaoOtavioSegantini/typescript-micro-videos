import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
    this.description = this.props.description ?? null;
    this.props.deleted_at = this.props.deleted_at ?? null;
  }

  update(name: string, description: string) {
    this.props.name = name;
    this.props.description = description;
    this.props.updated_at = new Date();
  }

  activate() {
    this.props.is_active = true;
    this.props.updated_at = new Date();
    if (this.props.deleted_at) this.props.deleted_at = null;
  }

  deactivate() {
    this.props.is_active = false;
    this.props.updated_at = new Date();
    this.props.deleted_at = new Date();
  }

  get name() {
    return this.props.name;
  }

  private set name(value) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  get created_at() {
    return this.props.created_at;
  }

  get deleted_at() {
    return this.props.deleted_at;
  }
}
