declare module '@softmotions/mobx-preact' {
  import { ComponentType } from 'preact';
  type ComponentClass<P = any> = ComponentType<P>;

  export function observer<T extends ComponentClass>(target: T): T;

  export function inject(...stores: string[]): <T extends ComponentClass>(target: T) => T;

  export function inject(sfn: Function): <T extends ComponentClass>(target: T) => T;

  export function connect(stores: string[]): <T extends ComponentClass>(target: T) => T;
}
