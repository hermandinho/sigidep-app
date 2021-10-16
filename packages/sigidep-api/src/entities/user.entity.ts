import { AfterLoad, Column, Entity, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'users',
  orderBy: {
    firstName: 'ASC',
    lastName: 'ASC',
  },
})
@Unique('UQ_EMAIL', ['email'])
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false })
  public lastName: string;

  // @Column({
  //   name: 'civility',
  //   nullable: true,
  //   type: 'enum',
  //   enum: CivilityEnum,
  // })
  // public civility: CivilityEnum;

  @Column({ name: 'email', nullable: false })
  public email: string;

  @Column({ name: 'user_name', nullable: false })
  public username: string;

  @Column({ name: 'profile_picture', nullable: true })
  public profilePicture?: string;

  @Column({ name: 'salt', nullable: true })
  @Exclude()
  public salt?: string;

  @Column({ name: 'password', nullable: true })
  @Exclude()
  public password?: string;

  @Column({ name: 'password_reset_token', nullable: true })
  @Exclude()
  public passwordResetToken?: string;

  @Column({ name: 'last_logged_in_at', nullable: true, type: 'timestamptz' })
  public lastConnectedAt?: string;

  public async validatePassword(
    pwd: string,
    salt: string,
    hashPwd: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(pwd, salt);
    return hash === hashPwd;
  }

  @AfterLoad()
  public addUrlToProfilePicture(): void {
    if (this.profilePicture) {
      if (!this.profilePicture.startsWith('http')) {
        this.profilePicture = process.env.SERVER_URL + this.profilePicture;
      }
    }
    Object.assign(this, {
      fullName: `${this.firstName} ${this.lastName}`,
    });
  }
}
