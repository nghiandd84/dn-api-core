"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateObservableUpDownCounter = exports.getOrCreateObservableCounter = exports.getOrCreateObservableGauge = exports.getOrCreateUpDownCounter = exports.getOrCreateCounter = exports.getOrCreateHistogram = exports.meterData = exports.MetricType = void 0;
const api_metrics_1 = require("@opentelemetry/api-metrics");
const opentelemetry_constants_1 = require("../opentelemetry.constants");
var MetricType;
(function (MetricType) {
    MetricType["Counter"] = "Counter";
    MetricType["UpDownCounter"] = "UpDownCounter";
    MetricType["Histogram"] = "Histogram";
    MetricType["ObservableGauge"] = "ObservableGauge";
    MetricType["ObservableCounter"] = "ObservableCounter";
    MetricType["ObservableUpDownCounter"] = "ObservableUpDownCounter";
})(MetricType = exports.MetricType || (exports.MetricType = {}));
exports.meterData = new Map();
function getOrCreateHistogram(name, options) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_metrics_1.metrics.getMeterProvider().getMeter(opentelemetry_constants_1.OTEL_METER_NAME);
    const histogram = meter.createHistogram(name, options);
    exports.meterData.set(name, histogram);
    return histogram;
}
exports.getOrCreateHistogram = getOrCreateHistogram;
function getOrCreateCounter(name, options) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_metrics_1.metrics.getMeterProvider().getMeter(opentelemetry_constants_1.OTEL_METER_NAME);
    const counter = meter.createCounter(name, options);
    exports.meterData.set(name, counter);
    return counter;
}
exports.getOrCreateCounter = getOrCreateCounter;
function getOrCreateUpDownCounter(name, options) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_metrics_1.metrics.getMeterProvider().getMeter(opentelemetry_constants_1.OTEL_METER_NAME);
    const upDownCounter = meter.createUpDownCounter(name, options);
    exports.meterData.set(name, upDownCounter);
    return upDownCounter;
}
exports.getOrCreateUpDownCounter = getOrCreateUpDownCounter;
function getOrCreateObservableGauge(name, options, callback) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_metrics_1.metrics.getMeterProvider().getMeter(opentelemetry_constants_1.OTEL_METER_NAME);
    const observableGauge = meter.createObservableGauge(name, options, callback);
    exports.meterData.set(name, observableGauge);
    return observableGauge;
}
exports.getOrCreateObservableGauge = getOrCreateObservableGauge;
function getOrCreateObservableCounter(name, options, callback) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_metrics_1.metrics.getMeterProvider().getMeter(opentelemetry_constants_1.OTEL_METER_NAME);
    const observableCounter = meter.createObservableCounter(name, options, callback);
    exports.meterData.set(name, observableCounter);
    return observableCounter;
}
exports.getOrCreateObservableCounter = getOrCreateObservableCounter;
function getOrCreateObservableUpDownCounter(name, options, callback) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_metrics_1.metrics.getMeterProvider().getMeter(opentelemetry_constants_1.OTEL_METER_NAME);
    const observableCounter = meter.createObservableCounter(name, options, callback);
    exports.meterData.set(name, observableCounter);
    return observableCounter;
}
exports.getOrCreateObservableUpDownCounter = getOrCreateObservableUpDownCounter;
//# sourceMappingURL=metric-data.js.map