declare module 'mobx-preact' {
  import { ComponentClass, FunctionComponent, Component } from 'preact';

  type PreactComponent<P = any> = ComponentClass<P> | FunctionComponent<P>;

  export function observer<T extends PreactComponent>(target: T): T;

  export function inject(...stores: string[]): <T extends PreactComponent>(target: T) => T;

  export function inject(sfn: Function): <T extends PreactComponent>(target: T) => T;

  export function connect(stores: string[]): <T extends PreactComponent>(target: T) => T;

  export abstract class Provider extends Component<any> { }
}
