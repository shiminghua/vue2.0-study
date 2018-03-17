# flux

简单说，Flux 是一种架构思想，专门解决软件的结构问题。它跟MVC 架构是同一类东西，但是更加简单和清晰。

Flux存在多种实现（至少15种），本文采用的是Facebook官方实现。

## 基本概念

- view：视图层
- action（动作）：视图层发出的消息（比如 mouseClick）
- dispatcher（派发器）：用来接收 actions 、执行回调函数
- store（数据层）：用来存放应用的状态，一旦发生变动，就提醒 views 要更新页面

## flux的最大特点

Flux 的最大特点，就是数据的"单向流动"。

1. 用户访问 view
2. view 发出用户的 action
3. dispatcher 收到 action，要求 store 进行相应的更新
4. store 更新后， 发出一个 change 事件
5. view 收到 change 事件后，更新页面

![flux流程图](./images/flux.png)
