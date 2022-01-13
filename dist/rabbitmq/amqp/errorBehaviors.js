"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandlerForLegacyBehavior = exports.defaultNackErrorHandler = exports.requeueErrorHandler = exports.ackErrorHandler = exports.MessageHandlerErrorBehavior = void 0;
var MessageHandlerErrorBehavior;
(function (MessageHandlerErrorBehavior) {
    MessageHandlerErrorBehavior["ACK"] = "ACK";
    MessageHandlerErrorBehavior["NACK"] = "NACK";
    MessageHandlerErrorBehavior["REQUEUE"] = "REQUEUE";
})(MessageHandlerErrorBehavior = exports.MessageHandlerErrorBehavior || (exports.MessageHandlerErrorBehavior = {}));
/**
 * An error handler that will ack the message which caused an error during processing
 */
const ackErrorHandler = (channel, msg, error) => {
    channel.ack(msg);
};
exports.ackErrorHandler = ackErrorHandler;
/**
 * An error handler that will nack and requeue a message which created an error during processing
 */
const requeueErrorHandler = (channel, msg, error) => {
    channel.nack(msg, false, true);
};
exports.requeueErrorHandler = requeueErrorHandler;
/**
 * An error handler that will nack a message which created an error during processing
 */
const defaultNackErrorHandler = (channel, msg, error) => {
    channel.nack(msg, false, false);
};
exports.defaultNackErrorHandler = defaultNackErrorHandler;
const getHandlerForLegacyBehavior = (behavior) => {
    switch (behavior) {
        case MessageHandlerErrorBehavior.ACK:
            return exports.ackErrorHandler;
        case MessageHandlerErrorBehavior.REQUEUE:
            return exports.requeueErrorHandler;
        default:
            return exports.defaultNackErrorHandler;
    }
};
exports.getHandlerForLegacyBehavior = getHandlerForLegacyBehavior;
//# sourceMappingURL=errorBehaviors.js.map