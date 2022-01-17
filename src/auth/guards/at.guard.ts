import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isRabbitContext } from '../../rabbitmq/rabbitmq.helpers';
// import { isRabbitContext } from 'dn-api-core';
import { Observable } from 'rxjs';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {

  private readonly logger = new Logger(AtGuard.name);
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const  isRabitMT = isRabbitContext(context)
    if (isRabitMT) {
      return true;
    }
    this.logger.debug('can active', this.reflector);
    const isPublic = this.reflector.getAllAndOverride('IS_PUBLIC_API', [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.debug(`isPublic ${isPublic}`)
    if (isPublic) return true;
    
    return super.canActivate(context);
  }
}
