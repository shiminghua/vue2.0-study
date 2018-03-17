# dva

React + Redux 最佳实践的封装

## 数据流向

![dva流程图](./images/dva.png)

在 dva 中，数据流向非常清晰简明。

- 数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的
- 当此类行为会改变数据的时候可以通过 dispatch 发起一个 action
- 如果是同步行为会直接通过 Reducers 改变 State
- 如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State

## Models

### state
