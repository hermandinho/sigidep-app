import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from '@entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);
  constructor(private readonly requiredPermissions: string[]) {
    this.requiredPermissions = requiredPermissions;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const user: UserEntity = req.user;

    if (
      !user?.role?.permissionKeys?.length ||
      !this?.requiredPermissions?.length
    ) {
      return false;
    }

    // Skip permission checks specially during dev.
    if (process.env.SKIP_PERMISSIONS_CHECK === 'yes') {
      this.logger.warn(
        '⚠️ ⚠️ ⚠️ Permission skipping is on.️ Set SKIP_PERMISSIONS_CHECK value to "no" in your .env file.',
      );
      return true;
    }

    if (
      user.role.permissionKeys.some((permission) =>
        this.requiredPermissions.includes(permission),
      )
    ) {
      return true;
    }
    throw new ForbiddenException({
      error: 'Accès Interdit',
      statusCode: HttpStatus.FORBIDDEN,
      message: "Vous n'êtes pas autorisé à accéder à cette ressource.",
    });
  }
}
