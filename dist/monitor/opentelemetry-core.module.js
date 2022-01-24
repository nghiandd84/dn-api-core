"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OpenTelemetryCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryCoreModule = void 0;
const common_1 = require("@nestjs/common");
const host_metrics_1 = require("@opentelemetry/host-metrics");
const api_metrics_1 = require("@opentelemetry/api-metrics");
const metric_service_1 = require("./metrics/metric.service");
const middleware_1 = require("./middleware");
const opentelemetry_constants_1 = require("./opentelemetry.constants");
const trace_service_1 = require("./tracing/trace.service");
const opentelemetry_module_1 = require("./opentelemetry.module");
/**
 * The internal OpenTelemetry Module which handles the integration
 * with the third party OpenTelemetry library and Nest
 *
 * @internal
 */
let OpenTelemetryCoreModule = OpenTelemetryCoreModule_1 = class OpenTelemetryCoreModule {
    constructor(options = {}) {
        this.options = options;
        this.logger = new common_1.Logger('OpenTelemetryModule');
    }
    /**
     * Bootstraps the internal OpenTelemetry Module with the given options
     * synchronously and sets the correct providers
     * @param options The options to bootstrap the module synchronously
     */
    static forRoot(options = { metrics: {} }) {
        const openTelemetryModuleOptions = {
            provide: opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS,
            useValue: options,
        };
        return {
            module: OpenTelemetryCoreModule_1,
            providers: [
                openTelemetryModuleOptions,
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ],
            exports: [
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ],
        };
    }
    /**
     * Bootstraps the internal OpenTelemetry Module with the given
     * options asynchronously and sets the correct providers
     * @param options The options to bootstrap the module
     */
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: opentelemetry_module_1.OpenTelemetryModule,
            imports: [...(options.imports || [])],
            providers: [
                ...asyncProviders,
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ],
            exports: [
                trace_service_1.TraceService,
                metric_service_1.MetricService,
            ],
        };
    }
    configure(consumer) {
        var _a;
        const { apiMetrics = { enable: false }, } = (_a = this.options) === null || _a === void 0 ? void 0 : _a.metrics;
        if (apiMetrics.enable === true) {
            if ((apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.ignoreRoutes) && (apiMetrics === null || apiMetrics === void 0 ? void 0 : apiMetrics.ignoreRoutes.length) > 0) {
                consumer.apply(middleware_1.ApiMetricsMiddleware).exclude(...apiMetrics.ignoreRoutes).forRoutes('*');
            }
            else {
                consumer.apply(middleware_1.ApiMetricsMiddleware).forRoutes('*');
            }
        }
    }
    async onApplicationBootstrap() {
        var _a;
        let defaultMetrics = false;
        let hostMetrics = false;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.metrics) {
            defaultMetrics = this.options.metrics.defaultMetrics
                !== undefined ? this.options.metrics.defaultMetrics : false;
            hostMetrics = this.options.metrics.hostMetrics
                !== undefined ? this.options.metrics.hostMetrics : false;
        }
        const meterProvider = api_metrics_1.metrics.getMeterProvider();
        if (defaultMetrics) {
            // eslint-disable-next-line global-require
            require('opentelemetry-node-metrics')(meterProvider);
        }
        if (hostMetrics) {
            // For some reason meterProvider type does not match here.
            // @ts-ignore
            const host = new host_metrics_1.HostMetrics({ meterProvider, name: 'host-metrics' });
            host.start();
        }
    }
    /**
     * Returns the asynchrnous OpenTelemetry options providers depending on the
     * given module options
     * @param options Options for the asynchrnous OpenTelemetry module
     */
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        if (options.useClass || options.useExisting) {
            const inject = [
                (options.useClass || options.useExisting),
            ];
            return {
                provide: opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS,
                // eslint-disable-next-line max-len
                useFactory: async (optionsFactory) => optionsFactory.createOpenTelemetryOptions(),
                inject,
            };
        }
        throw new Error();
    }
    /**
     * Returns the asynchrnous providers depending on the given module
     * options
     * @param options Options for the asynchrnous OpenTelemetry module
     */
    static createAsyncProviders(options) {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
                inject: [...(options.inject || [])],
            },
        ];
    }
};
OpenTelemetryCoreModule = OpenTelemetryCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __param(0, (0, common_1.Inject)(opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], OpenTelemetryCoreModule);
exports.OpenTelemetryCoreModule = OpenTelemetryCoreModule;
//# sourceMappingURL=opentelemetry-core.module.js.map