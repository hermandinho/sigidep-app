import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '@entities/role.entity';
import { UserAccountStatusEnum } from '@utils/constants';

@Entity({
  name: 'users',
  orderBy: {
    firstName: 'ASC',
    lastName: 'ASC',
  },
})
@Unique('UQ_USERNAME', ['username'])
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false })
  public lastName: string;

  @Column({ name: 'user_name', nullable: false })
  public username: string;

  @Column({ name: 'email', nullable: true })
  public email: string;

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

  @Column({ name: 'last_logged_in_at', nullable: true, type: 'timestamp' })
  public lastConnectedAt?: string;

  @Column({
    name: 'status',
    type: 'enum',
    default: UserAccountStatusEnum.ACTIVE,
    enum: UserAccountStatusEnum,
  })
  public status?: UserAccountStatusEnum;

  // Relations
  @ManyToOne(() => RoleEntity, (object) => object.users, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  public role: RoleEntity;

  public async validatePassword(
    pwd: string,
    salt: string,
    hashPwd: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(pwd, salt);
    return hash === hashPwd;
  }

  public hashPassword(pwd?: string, salt?: string): Promise<string> {
    if (!salt && !this.salt) {
      salt = bcrypt.genSaltSync();
      this.salt = salt;
    }
    return bcrypt.hash(pwd ?? this.password, salt ?? this.salt);
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
