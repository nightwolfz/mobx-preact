declare module 'mobx-preact' {
  import { ComponentType, Component } from 'preact';

  export function observer<T extends ComponentType>(target: T): T;

  export function inject(...stores: string[]): <T extends ComponentType>(target: T) => T;

  export function inject(sfn: Function): <T extends ComponentType>(target: T) => T;

  export function connect(stores: string[]): <T extends ComponentType>(target: T) => T;

  export abstract class Provider extends Component<any> { }
}
