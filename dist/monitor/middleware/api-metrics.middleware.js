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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetricsMiddleware = exports.DEFAULT_RESPONSE_SIZE_BUCKETS = exports.DEFAULT_REQUEST_SIZE_BUCKETS = exports.DEFAULT_LONG_RUNNING_REQUEST_BUCKETS = void 0;
const common_1 = require("@nestjs/common");
const responseTime = require("response-time");
const urlParser = require("url");
const metric_service_1 = require("../metrics/metric.service");
const opentelemetry_constants_1 = require("../opentelemetry.constants");
exports.DEFAULT_LONG_RUNNING_REQUEST_BUCKETS = [
    0.005,
    0.01,
    0.025,
    0.05,
    0.1,
    0.25,
    0.5,
    1,
    2.5,
    5,
    10,
    30,
    60,
    120,
    300,
    600, // Sometimes requests may be really long-running
];
exports.DEFAULT_REQUEST_SIZE_BUCKETS = [
    5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000,
];
exports.DEFAULT_RESPONSE_SIZE_BUCKETS = [
    5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000,
];
let ApiMetricsMiddleware = class ApiMetricsMiddleware {
    constructor(metricService, options = {}) {
        var _a;
        this.metricService = metricService;
        this.options = options;
        this.defaultLongRunningRequestBuckets = exports.DEFAULT_LONG_RUNNING_REQUEST_BUCKETS;
        this.defaultRequestSizeBuckets = exports.DEFAULT_REQUEST_SIZE_BUCKETS;
        this.defaultResponseSizeBuckets = exports.DEFAULT_RESPONSE_SIZE_BUCKETS;
        this.requestTotal = this.metricService.getCounter('http_request_total', {
            description: 'Total number of HTTP requests',
        });
        this.responseTotal = this.metricService.getCounter('http_response_total', {
            description: 'Total number of HTTP responses',
        });
        this.responseSuccessTotal = this.metricService.getCounter('http_response_success_total', {
            description: 'Total number of all successful responses',
        });
        this.responseErrorTotal = this.metricService.getCounter('http_response_error_total', {
            description: 'Total number of all response errors',
        });
        this.responseClientErrorTotal = this.metricService.getCounter('http_client_error_total', {
            description: 'Total number of client error requests',
        });
        this.responseServerErrorTotal = this.metricService.getCounter('http_server_error_total', {
            description: 'Total number of server error requests',
        });
        this.serverAbortsTotal = this.metricService.getCounter('http_server_aborts_total', {
            description: 'Total number of data transfers aborted',
        });
        const { timeBuckets = [], requestSizeBuckets = [], responseSizeBuckets = [], defaultAttributes = {}, ignoreUndefinedRoutes = false, } = (_a = options === null || options === void 0 ? void 0 : options.metrics) === null || _a === void 0 ? void 0 : _a.apiMetrics;
        this.defaultAttributes = defaultAttributes;
        this.ignoreUndefinedRoutes = ignoreUndefinedRoutes;
        this.requestDuration = this.metricService.getHistogram('http_request_duration_seconds', {
            boundaries: timeBuckets.length > 0
                ? timeBuckets
                : this.defaultLongRunningRequestBuckets,
            description: 'HTTP latency value recorder in seconds',
        });
        this.requestSizeHistogram = this.metricService.getHistogram('http_request_size_bytes', {
            boundaries: requestSizeBuckets.length > 0
                ? requestSizeBuckets
                : this.defaultRequestSizeBuckets,
            description: 'Current total of incoming bytes',
        });
        this.responseSizeHistogram = this.metricService.getHistogram('http_response_size_bytes', {
            boundaries: responseSizeBuckets.length > 0
                ? responseSizeBuckets
                : this.defaultResponseSizeBuckets,
            description: 'Current total of outgoing bytes',
        });
    }
    use(req, res, next) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        responseTime((req, res, time) => {
            const { route, url, method } = req;
            let path;
            if (route) {
                path = route.path;
            }
            else if (this.ignoreUndefinedRoutes) {
                return;
            }
            else {
                path = urlParser.parse(url).pathname;
            }
            this.requestTotal.add(1, { method, path });
            const requestLength = parseInt(req.headers['content-length'], 10) || 0;
            const responseLength = parseInt(res.getHeader('Content-Length'), 10) || 0;
            const status = res.statusCode || 500;
            const attributes = Object.assign({ method,
                status,
                path }, this.defaultAttributes);
            this.requestSizeHistogram.record(requestLength, attributes);
            this.responseSizeHistogram.record(responseLength, attributes);
            this.responseTotal.add(1, attributes);
            this.requestDuration.record(time / 1000, attributes);
            const codeClass = this.getStatusCodeClass(status);
            // eslint-disable-next-line default-case
            switch (codeClass) {
                case 'success':
                    this.responseSuccessTotal.add(1);
                    break;
                case 'redirect':
                    // TODO: Review what should be appropriate for redirects.
                    this.responseSuccessTotal.add(1);
                    break;
                case 'client_error':
                    this.responseErrorTotal.add(1);
                    this.responseClientErrorTotal.add(1);
                    break;
                case 'server_error':
                    this.responseErrorTotal.add(1);
                    this.responseServerErrorTotal.add(1);
                    break;
            }
            req.on('end', () => {
                if (req.aborted === true) {
                    this.serverAbortsTotal.add(1);
                }
            });
        })(req, res, next);
    }
    getStatusCodeClass(code) {
        if (code < 200)
            return 'info';
        if (code < 300)
            return 'success';
        if (code < 400)
            return 'redirect';
        if (code < 500)
            return 'client_error';
        return 'server_error';
    }
};
ApiMetricsMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(metric_service_1.MetricService)),
    __param(1, (0, common_1.Inject)(opentelemetry_constants_1.OPENTELEMETRY_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [metric_service_1.MetricService, Object])
], ApiMetricsMiddleware);
exports.ApiMetricsMiddleware = ApiMetricsMiddleware;
//# sourceMappingURL=api-metrics.middleware.js.map