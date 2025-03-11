import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.header('authorize_token');

    if (apiKey !== 'nest-is-awesome') {
      return false;
    }

    return true;
  }
}
