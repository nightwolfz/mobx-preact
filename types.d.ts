declare module '@softmotions/mobx-preact' {
  import { ComponentConstructor } from 'preact';
  type ComponentClass<P = any> = ComponentConstructor<P>;

  export function observer<T extends ComponentClass>(target: T): T;

  export function inject(...stores: string[]): <T extends ComponentClass>(target: T) => T;

  export function inject(sfn: Function): <T extends ComponentClass>(target: T) => T;

  export function connect(stores: string[]): <T extends ComponentClass>(target: T) => T;
}
