import { Component, h, render } from 'preact';
import { observer } from '../src';
import { createTestRoot } from './test-util';

let testRoot;

beforeEach(() => {
    testRoot = createTestRoot();
});

test('stateless component with context support', () => {
    const StatelessCompWithContext = (props, context) =>
        h('div', {}, 'context: ' + context.content);
    const StateLessCompWithContextObserver = observer(StatelessCompWithContext);
    const ContextProvider = class extends Component {
        getChildContext() {
            return { content: 'hello world' };
        }

        render() {
            return <StateLessCompWithContextObserver/>;
        }
    };
    render(<ContextProvider/>, testRoot);
    expect(testRoot.textContent.replace(/\n/, '')).toBe('context: hello world');
});