import { DynamicModule } from '@nestjs/common';
import { OpenTelemetryModuleAsyncOptions, OpenTelemetryModuleOptions } from './interfaces';
/**
 * The NestJS module for OpenTelemetry
 *
 * @publicApi
 */
export declare class OpenTelemetryModule {
    /**
     * Bootstraps the OpenTelemetry Module synchronously
     * @param options The options for the OpenTelemetry Module
     */
    static forRoot(options?: OpenTelemetryModuleOptions): DynamicModule;
    /**
     * Bootstrap the OpenTelemetry Module asynchronously
     * @see https://dev.to/nestjs/advanced-nestjs-how-to-build-completely-dynamic-nestjs-modules-1370
     * @param options The options for the OpenTelemetry module
     */
    static forRootAsync(options: OpenTelemetryModuleAsyncOptions): DynamicModule;
}
//# sourceMappingURL=opentelemetry.module.d.ts.map