export const RABBIT_HANDLER = Symbol('RABBIT_HANDLER');
export const RABBIT_CONFIG_TOKEN = Symbol('RABBIT_CONFIG');

export enum RABBIT_EXCHANGE_TYPE {
  DIRECT = 'direct',
  FANOUT = 'fanout',
  TOPIC = 'topic',
  HEADER = 'headers',
}
