import React, { Component,PureComponent } from 'react';
import PropTypes from 'prop-types';


/**
 * React Component 生命周期
 */
class Lifecycle extends Component {

  /**
   * 组件挂载阶段
   */

  // 验证属性的数据类型
  static propTypes = {
    list: PropTypes.array.isRequired,
  };

  // 设置默认属性
  static defaultProps = {
    list: []
  };

  // 构造函数，在创建组件的时候调用一次。
  constructor(props) {
    super(props);

    // 设置状态1 state
    this.state = {
      loading: false,
    };
  }

  // 设置组件状态2
  state = {
    loading: false,
  };

  // 组件即将挂载
  componentWillMount() {
    /**
     * 此方法在mounting之前被立即调用，它在render()之前调用，因此在此方法中setState不会触发重新渲染。
     * 此方法是服务器渲染中调用的唯一的生命周期钩子，通常我们建议使用constructor()。
     */
  }

  // 渲染函数 - React 组件唯一必须的函数
  render() {
    // 获取 props 和 state 中的值
    const { list } = this.props;
    const { loading } = this.state;
    /**
     * render()方法应该是一个纯方法，即它不会修改组件的state，在每一次调用时返回同样的结果。
     * 它不直接和浏览器交互，如果我们想要交互，应该在componentDidMount()或者其他的生命周期函数里面。
     */
  }

  // 组件挂载完成
  componentDidMount() {
    /**
     * 此方法在组件被mounted之后立即被调用，初始化dom节点应该在此方法中，
     * 如果需要从远端健在数据，这里是实例化网络请求的好地方，
     * 此方法中setState会触发组件重新渲染。
     */
  }




  /**
   * 数据更新
   * props和state的改变产生更新。在重新渲染组建时，如下的方法被调用
   */
  // 组件接收一个新的 props 之前被调用
  componentWillReceiveProps(nextProps) {
    /**
     * 如果我们需要更新state来响应prop的更改，我们可以在此方法中比较this.props和nextProps并使用this.setState来更改state。
     * 注意，即使props没有改变，React也可以调用这个方法，因此如果你只想处理改变，请确保比较当前值和下一个值。当父组件导致你的组件重新渲染时，可能会发生这种情况。
     * 只有在一些组件的props可能被更新的时候才会调用。调用this.setState通常不会触发componentWillReceiveProps。
     */
  }

  // 可以控制是否渲染组件
  shouldComponentUpdate(nextProps, nextState) {
    /**
     * 默认返回 true，默认行为是在每次state更改时重新渲染组件，在大多数情况下，我们应该默认该行为。
     * 返回 false，那么componentWillUpdate()，render()和componentDidUpdate()将不会被调用。
     * 使用forceUpdate()时，不调用此方法。
     * 在将来，React可能将shouldComponentUpdate()作为提示而不是strict指令，返回仍然可能导致组件重新渲染。
     */
  }

  // 当接收新的props或state时，在组件渲染之前被立即调用。
  componentWillUpdate() {
    /**
     * 这里不能调用this.setState()，调用时会产生死循环
     * 如果我们需要更新state以响应props的更改，我们应该使用componentWillReceiveProps()
     */
  }

  // 渲染函数
  render() {

  }

  // 此函数在更新后立即被调用。
  componentDidUpdate() {
    /**
     * 当组件已经更新时，使用此操作作为DOM操作的机会。
     * 这也是一个好的地方做网络请求。
     */
  }




  /**
   * 组件卸载
   */
  // 此函数在组件被卸载和销毁之前被立即调用。
  componentWillUnmount() {
    /**
     * 在此方法中执行一些必要的清理。例如清除计时器，取消网络请求或者清理在componentDidMount中创建的任何DOM元素。
     */
  }


}


export default Lifecycle;
