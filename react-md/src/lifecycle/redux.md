# redux

是flux的一种实现，将flux和函数式编程结合在了一起。

## 设计思想

- web 是一个状态机，视图与状态是一一对应的
- 所有的状态，保存在一个对象里。

## 基本概念和API

### 1、store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

```code
import { createStore } from 'redux';
const store = createStore(fn);
```

### 2、state

Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

当前时刻的 State，可以通过store.getState()拿到。

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

```code
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```

### 3、action

Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。

```code
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};

```

### 4、Action Creator

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```code
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
```

### 5、store.dispatch()

store.dispatch()是 View 发出 Action 的唯一方法。

```code
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

### 6、Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```code
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

### 7、纯函数

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

纯函数是函数式编程的概念，必须遵守以下一些约束。

- 不得改写参数
- 不能调用系统 I/O 的API
- 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```code

// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

### 8、store.subscribe()

Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```code
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```

显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

```code
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

## 工作流程

1. 用户发出 action ，store.dispatch(action)
2. store 自动调用 reducer，并传入两个参数：当前 state 和收到的 action。reducer 会返回新的 state 。let nextState = todoApp(previousState, action);
3. State 一旦有变化，Store 就会调用监听函数。store.subscribe(listener);
4. listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

```code
function listerner() {
  let newState = store.getState();
  component.setState(newState);
}
```

![redux流程图](./images/redux.jpg)
