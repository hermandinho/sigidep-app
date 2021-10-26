import { UserEntity } from '@entities/user.entity';
import { RoleEntity } from '@entities/role.entity';

export const ROOT_ROLE: Partial<RoleEntity> = {
  label: 'Root',
  description:
    "Ceci est le rôle du super admin du Système. Il ne sera jamais visible sur l'interface.",
};

export const ROOT_USER: Partial<UserEntity> = {
  username: 'super_root',
  password: '!@?-^-+=!_change_me',
  firstName: 'Super',
  lastName: 'Administrateur',
};
