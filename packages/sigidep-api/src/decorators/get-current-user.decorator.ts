import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {UserEntity} from '@entities/user.entity';

export const GetCurrentUser = createParamDecorator((data, ctx: ExecutionContext): UserEntity => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
