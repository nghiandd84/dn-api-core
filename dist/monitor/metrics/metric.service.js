"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricService = void 0;
const common_1 = require("@nestjs/common");
const metric_data_1 = require("./metric-data");
let MetricService = class MetricService {
    getCounter(name, options) {
        return (0, metric_data_1.getOrCreateCounter)(name, options);
    }
    getUpDownCounter(name, options) {
        return (0, metric_data_1.getOrCreateUpDownCounter)(name, options);
    }
    getHistogram(name, options) {
        return (0, metric_data_1.getOrCreateHistogram)(name, options);
    }
    getObservableCounter(name, options, callback) {
        return (0, metric_data_1.getOrCreateObservableCounter)(name, options, callback);
    }
    getObservableGauge(name, options, callback) {
        return (0, metric_data_1.getOrCreateObservableGauge)(name, options, callback);
    }
    getObservableUpDownCounter(name, options, callback) {
        return (0, metric_data_1.getOrCreateObservableUpDownCounter)(name, options, callback);
    }
};
MetricService = __decorate([
    (0, common_1.Injectable)()
], MetricService);
exports.MetricService = MetricService;
//# sourceMappingURL=metric.service.js.map