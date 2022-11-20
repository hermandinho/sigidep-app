import { RoleModel } from '@models/role.model';
export class UserModel {
  id!: number;
  firstName: string | undefined;
  lastName: string | undefined;
  username!: string;
  status!: string;
  password!: string;
  email!: string;
  profilePicture: string | undefined;
  role!: RoleModel;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}` as string;
  }

  get initials(): string {
    const fn = this.firstName ?? 'N';
    const ln = this.lastName ?? 'A';
    console.log(`${fn.toUpperCase()} ${ln.toUpperCase()}`);
    return `${fn.toUpperCase()} ${ln.toUpperCase()}`;
  }

  get picture(): string {
    return this.profilePicture as string;
  }
}
