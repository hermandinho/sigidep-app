export interface RoleModel {
  id: number;
  label: string;
  description?: string;
  permissionKeys: string[];
}
