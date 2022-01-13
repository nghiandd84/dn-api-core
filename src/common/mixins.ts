import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

export const makeInjectableMixin = (name: string) => mixinClass => {
  Object.defineProperty(mixinClass, 'name', {
    value: `${name}-${nanoid(10)}`
  });
  Injectable()(mixinClass);
  return mixinClass;
};
