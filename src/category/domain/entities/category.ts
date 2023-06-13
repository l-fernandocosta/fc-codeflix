import { v4 as uuid } from 'uuid';

export interface CategoryProperties {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
}

export class Category {
  public readonly id : string; 

  constructor(public readonly props: CategoryProperties, id?: string) {
    this.id = id ?? uuid();
    this.props.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }

  private set description(description: string) {
    this.props.description = description ?? null;
  }

  private set is_active(value : boolean) {
    this.props.is_active =  value ?? true;
  }
}
