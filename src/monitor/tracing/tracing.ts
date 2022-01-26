import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
  // HttpBaggagePropagator,
} from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';

const batchSpanProcessor: any = new BatchSpanProcessor(new JaegerExporter());
const PROMETHEUS_PORT = process.env.PROMETHEUS_PORT ? parseInt(process.env.PROMETHEUS_PORT) : 16001;

console.log(`PrometheusExporter will run on PORT = ${PROMETHEUS_PORT}`);
export const otelSDK = new NodeSDK({
  metricExporter: new PrometheusExporter({
    port: PROMETHEUS_PORT,
  }),
  metricInterval: 1000,
  spanProcessor: batchSpanProcessor,
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});


// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});

process.on('SIGINT ', () => { // Ctrl-C to send SIGINT
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});

