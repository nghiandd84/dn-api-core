"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otelSDK = void 0;
const core_1 = require("@opentelemetry/core");
const tracing_1 = require("@opentelemetry/tracing");
const exporter_jaeger_1 = require("@opentelemetry/exporter-jaeger");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const propagator_jaeger_1 = require("@opentelemetry/propagator-jaeger");
const propagator_b3_1 = require("@opentelemetry/propagator-b3");
const exporter_prometheus_1 = require("@opentelemetry/exporter-prometheus");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const context_async_hooks_1 = require("@opentelemetry/context-async-hooks");
const process = require("process");
const batchSpanProcessor = new tracing_1.BatchSpanProcessor(new exporter_jaeger_1.JaegerExporter());
const PROMETHEUS_PORT = process.env.PROMETHEUS_PORT ? parseInt(process.env.PROMETHEUS_PORT) : 16001;
console.log(`Prometheus export run on PORT = ${PROMETHEUS_PORT}`);
exports.otelSDK = new sdk_node_1.NodeSDK({
    metricExporter: new exporter_prometheus_1.PrometheusExporter({
        port: PROMETHEUS_PORT,
    }),
    metricInterval: 1000,
    spanProcessor: batchSpanProcessor,
    contextManager: new context_async_hooks_1.AsyncLocalStorageContextManager(),
    textMapPropagator: new core_1.CompositePropagator({
        propagators: [
            new propagator_jaeger_1.JaegerPropagator(),
            new core_1.W3CTraceContextPropagator(),
            new core_1.W3CBaggagePropagator(),
            new propagator_b3_1.B3Propagator(),
            new propagator_b3_1.B3Propagator({
                injectEncoding: propagator_b3_1.B3InjectEncoding.MULTI_HEADER,
            }),
        ],
    }),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
    exports.otelSDK
        .shutdown()
        .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err))
        .finally(() => process.exit(0));
});
process.on('SIGINT ', () => {
    exports.otelSDK
        .shutdown()
        .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err))
        .finally(() => process.exit(0));
});
//# sourceMappingURL=tracing.js.map