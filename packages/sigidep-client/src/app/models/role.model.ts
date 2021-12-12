export class RoleModel {
  id!: number;
  label!: string;
  description!: string;
  permissions?: RolePermissionModel[];
  permissionKeys?: string[];
}

export interface PermissionModel {
  id: number;
  label: string;
  description: string;
  context: string;
}

export interface RolePermissionModel {
  id: number;
  permission: PermissionModel[];
}
