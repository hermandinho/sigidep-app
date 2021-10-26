export class UserModel {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
