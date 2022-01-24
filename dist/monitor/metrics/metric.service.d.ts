import { MetricOptions, ObservableResult } from '@opentelemetry/api-metrics';
export declare class MetricService {
    getCounter(name: string, options?: MetricOptions): import("@opentelemetry/api-metrics").Counter;
    getUpDownCounter(name: string, options?: MetricOptions): import("@opentelemetry/api-metrics").UpDownCounter;
    getHistogram(name: string, options?: MetricOptions): import("@opentelemetry/api-metrics").Histogram;
    getObservableCounter(name: string, options?: MetricOptions, callback?: (observableResult: ObservableResult) => void): import("@opentelemetry/api-metrics").ObservableBase;
    getObservableGauge(name: string, options?: MetricOptions, callback?: (observableResult: ObservableResult) => void): import("@opentelemetry/api-metrics").ObservableBase;
    getObservableUpDownCounter(name: string, options?: MetricOptions, callback?: (observableResult: ObservableResult) => void): import("@opentelemetry/api-metrics").ObservableBase;
}
//# sourceMappingURL=metric.service.d.ts.map