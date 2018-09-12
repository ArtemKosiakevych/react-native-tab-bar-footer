import React from 'react'
import { View, Dimensions, Animated } from 'react-native'

import Tab from './Tab'
import styles from './styles'

const WIDTH = Dimensions.get('window').width

export default class TabBar extends React.Component {
  static defaultProps = {
    slideSpeed: 25,
    slideBounciness: 10,
    tabSize: 30,
    barColor: 'white',
    tabs: [],
    height: 60,
    initialIndex: 0,
  }

  constructor(props) {
    super(props)
    const initialIndex = props.initialIndex
    const initialTranslateX = this.getLeftPadding(1)
    this.state = {
      activeIndex: initialIndex,
      translateX: new Animated.Value(initialTranslateX),
      anim: new Animated.Value(initialIndex),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeIndex !== prevState.activeIndex) {
      this.animate()
    }
  }

  animate() {
    Animated.spring(this.state.anim, {
      toValue: this.state.activeIndex,
      useNativeDriver: true,
      speed: this.props.slideSpeed,
      bounciness: this.props.slideBounciness,
    }).start()
  }

  getDefaultHatStyle() {
    const activeTabSize = this.getActiveTabSize()
    return {
      height: activeTabSize,
      width: activeTabSize,
      borderRadius: activeTabSize / 2,
      backgroundColor: this.props.barColor,
    }
  }

  getActiveTabSize() {
    return this.props.tabSize * 2.6
  }

  getLeftPadding = index => {
    const { tabs, hatWidth } = this.props
    const hatComponentWidth = hatWidth || this.getActiveTabSize()
    const screenWidth = (this.state && this.state.screenWidth) || WIDTH
    const tabWidth = screenWidth / tabs.length
    const left = tabWidth / 2 - hatComponentWidth / 2 + tabWidth * index
    return left
  }

  onPress = activeIndex => {
    if (this.state.activeIndex !== activeIndex) this.setState({ activeIndex })
    if (this.props.onTabChange) this.props.onTabChange(activeIndex)
  }

  renderActiveHat() {
    const { hat, hatWidth, hatHeight } = this.props
    const inputRange = []
    const outputRange = []
    this.props.tabs.forEach((el, i) => {
      inputRange.push(i)
      outputRange.push(this.getLeftPadding(i))
    })
    const translateX = this.state.anim.interpolate({
      inputRange,
      outputRange,
    })
    if (hat) {
      return (
        <Animated.View
          style={[
            {
              height: hatHeight,
              width: hatWidth,
              position: 'absolute',
            },
            { transform: [{ translateX }] },
          ]}>
          {hat}
        </Animated.View>
      )
    } else {
      const hatStyle = this.getDefaultHatStyle()
      return (
        <Animated.View
          style={[styles.hat, hatStyle, { transform: [{ translateX }] }]}
        />
      )
    }
  }

  renderTab = (tab, index) => {
    const {
      titleStyle,
      tabSize,
      iconStyle,
      animationDuration,
      rippleProps,
    } = this.props
    return (
      <Tab
        key={index}
        onPress={() => this.onPress(index)}
        activeTab={index === this.state.activeIndex}
        tab={tab}
        size={tabSize}
        titleStyle={titleStyle}
        iconStyle={iconStyle}
        animationDuration={animationDuration}
        rippleProps={rippleProps}
      />
    )
  }

  onLayout = () => {
    const { width } = Dimensions.get('window')
    this.setState({ screenWidth: width })
  }

  render() {
    const { tabs, barColor, height } = this.props
    const wrapperStyle = {
      height,
      backgroundColor: barColor,
    }

    return (
      <View onLayout={this.onLayout} style={styles.flexEnd}>
        {tabs.length > 0 && this.renderActiveHat()}
        <View style={[styles.flexAbsolute, wrapperStyle]} />
        <View style={styles.row}>{tabs.map(this.renderTab)}</View>
      </View>
    )
  }
}
