import { MetricOptions } from '@opentelemetry/api-metrics';
/**
 * Create and increment a counter when a new instance is created
 *
 * @param ctor
 */
export declare const OtelInstanceCounter: (options?: MetricOptions) => <T extends new (...args: any[]) => {}>(ctor: T) => {
    new (...args: any[]): {};
} & T;
/**
 * Create and increment a counter when the method is called
 */
export declare const OtelMethodCounter: (options?: MetricOptions) => (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
//# sourceMappingURL=common.d.ts.map