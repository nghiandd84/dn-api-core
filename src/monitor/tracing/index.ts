import { trace, context } from '@opentelemetry/api';
export * from './decorators/span';
export * from './trace.service';
export { otelSDK } from './tracing';

export const activeSpanContext = () => trace.getSpan(context.active())?.spanContext();

