import Pino, { Logger as PinoLogger } from 'pino';
import { LoggerOptions, destination } from 'pino';
import { trace, context } from '@opentelemetry/api';
import { activeSpanContext } from '../monitor/tracing';
export { Logger } from 'nestjs-pino';
export const loggerOptions: LoggerOptions = {
  level: 'info',
  formatters: {
    
    level(label) {
      return { level: label };
    },
    log(object) {
      const span = trace.getSpan(context.active());
      if (!span) return { ...object };
      // const { spanId, traceId } = trace
      //   .getSpan(context.active())
      //   ?.spanContext();
      const { spanId, traceId } = activeSpanContext();
      return { ...object, spanId, traceId };
    },
  },
  // prettyPrint:
  //   !!process.env.APP_ENVIRONTMENT
  //     ? {
  //         colorize: true,
  //         levelFirst: true,
  //         translateTime: true,
  //       }
  //     : false,
};

export const logger: PinoLogger = Pino(
  loggerOptions,
  destination(process.env.LOG_FILE_NAME || 'logs/app.log'),
);

