import { DynamicModule, MiddlewareConsumer, OnApplicationBootstrap } from '@nestjs/common';
import { OpenTelemetryModuleAsyncOptions, OpenTelemetryModuleOptions } from './interfaces';
/**
 * The internal OpenTelemetry Module which handles the integration
 * with the third party OpenTelemetry library and Nest
 *
 * @internal
 */
export declare class OpenTelemetryCoreModule implements OnApplicationBootstrap {
    private readonly options;
    private readonly logger;
    constructor(options?: OpenTelemetryModuleOptions);
    /**
     * Bootstraps the internal OpenTelemetry Module with the given options
     * synchronously and sets the correct providers
     * @param options The options to bootstrap the module synchronously
     */
    static forRoot(options?: OpenTelemetryModuleOptions): DynamicModule;
    /**
     * Bootstraps the internal OpenTelemetry Module with the given
     * options asynchronously and sets the correct providers
     * @param options The options to bootstrap the module
     */
    static forRootAsync(options: OpenTelemetryModuleAsyncOptions): DynamicModule;
    configure(consumer: MiddlewareConsumer): void;
    onApplicationBootstrap(): Promise<void>;
    /**
     * Returns the asynchrnous OpenTelemetry options providers depending on the
     * given module options
     * @param options Options for the asynchrnous OpenTelemetry module
     */
    private static createAsyncOptionsProvider;
    /**
     * Returns the asynchrnous providers depending on the given module
     * options
     * @param options Options for the asynchrnous OpenTelemetry module
     */
    private static createAsyncProviders;
}
//# sourceMappingURL=opentelemetry-core.module.d.ts.map