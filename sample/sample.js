// noinspection ES6UnusedImports
import { Component, h, render } from 'preact';
import { action, observable } from 'mobx';
import { connect, inject, observer, Provider } from '../../lib/index.module';

const store = {
    @observable count: 0,
    @action increment: function () {
        this.count++;
    },
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <CounterStateless/>
                <Inbetween>
                    <CounterComp/>
                    <CounterConnect/>
                    <CounterStateless/>
                    <NotObserver/>
                    <IncrementButton/>
                </Inbetween>
            </Provider>
        );
    }
}

let renderCount = 0;

class Inbetween extends Component {
    render({ children }) {
        return (
            <div style={{ outline: '2px dashed HotPink' }}>
                {children}
            </div>
        );
    }
}

@inject('store')
@observer
class CounterComp extends Component {
    render({ store }) {
        renderCount++;
        console.log(`CounterComp#render called ${renderCount} times`); // eslint-disable-line no-console
        return <p>Comp[counter] count is {store.count}</p>;
    }
}

@connect(['store'])
class CounterConnect extends Component {
    render({ store }) {
        return <p>Comp[connect] count is {store.count}</p>;
    }
}

const CounterStateless = inject('store')(observer(function ({ store }) {
    return <p>Stateless count is {store.count}</p>;
}));

const NotObserver = inject('store')(function NotObserver({ store }) {
    return <p>I will not change: {store.count} :(</p>;
});

const IncrementButton = inject('store')(function ({ store }) {
    return <button onClick={() => {
        store.increment();
    }}>Increment</button>;
});

render(<App/>, document.body);