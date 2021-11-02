import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionsFilters implements ExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.UNPROCESSABLE_ENTITY;
    console.log('QueryFailedError', exception);
    let error: any = new UnprocessableEntityException();

    const ex = exception as any;
    if (ex.code === '23505') {
      status = HttpStatus.CONFLICT;
      error = new ConflictException();
    }

    const payload = {
      statusCode: status,
      message: error.getResponse().message,
    };

    if (process.env.NODE_ENV !== 'production') {
      Object.assign(payload, {
        details: ex.detail,
        query: ex.query,
        parameters: ex.parameters,
        constraint: ex.constraint,
      });
    }

    response.status(status).json(payload);
  }
}
