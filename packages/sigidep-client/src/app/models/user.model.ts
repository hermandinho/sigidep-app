import {RoleModel} from "@models/role.model";

export class UserModel {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role!: RoleModel;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
