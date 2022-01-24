import { NestMiddleware } from '@nestjs/common';
import { OpenTelemetryModuleOptions } from '../interfaces';
import { MetricService } from '../metrics/metric.service';
export declare const DEFAULT_LONG_RUNNING_REQUEST_BUCKETS: number[];
export declare const DEFAULT_REQUEST_SIZE_BUCKETS: number[];
export declare const DEFAULT_RESPONSE_SIZE_BUCKETS: number[];
export declare class ApiMetricsMiddleware implements NestMiddleware {
    private readonly metricService;
    private readonly options;
    private readonly defaultLongRunningRequestBuckets;
    private readonly defaultRequestSizeBuckets;
    private readonly defaultResponseSizeBuckets;
    private requestTotal;
    private responseTotal;
    private responseSuccessTotal;
    private responseErrorTotal;
    private responseClientErrorTotal;
    private responseServerErrorTotal;
    private serverAbortsTotal;
    private requestDuration;
    private requestSizeHistogram;
    private responseSizeHistogram;
    private defaultAttributes;
    private readonly ignoreUndefinedRoutes;
    constructor(metricService: MetricService, options?: OpenTelemetryModuleOptions);
    use(req: any, res: any, next: any): void;
    private getStatusCodeClass;
}
//# sourceMappingURL=api-metrics.middleware.d.ts.map