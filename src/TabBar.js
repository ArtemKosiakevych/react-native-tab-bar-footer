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
    initialIndex: 0
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

  getHatStyle() {
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
    const tabs = this.props.tabs
    const screenWidth = this.state && this.state.screenWidth || WIDTH
    const tabWidth = screenWidth / tabs.length
    const left = tabWidth / 2 - this.getActiveTabSize() / 2 + tabWidth * index
    return left
  }

  onPress = activeIndex => {
    if (this.state.activeIndex !== activeIndex) this.setState({ activeIndex })
    if (this.props.onTabChange) this.props.onTabChange(activeIndex)
  }

  renderActiveHat() {
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
    const hatStyle = this.getHatStyle()
    return (
      <Animated.View
        style={[styles.hat, hatStyle, { transform: [{ translateX }] }]}
      />
    )
  }

  getBarHeight() {
    const { tabSize, height } = this.props
    // TabBar height should not be less than double tabSize
    return height < tabSize * 2 ? tabSize * 2 : height
  }

  renderTab = (tab, index) => {
    const { titleStyle, tabSize, iconStyle, animationDuration, rippleProps } = this.props
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
    const { tabs, barColor } = this.props
    const wrapperStyle = {
      height: this.getBarHeight(),
      backgroundColor: barColor,
    }

    return (
      <View onLayout={this.onLayout} style={styles.flexEnd}>
        <View style={[styles.flexAbsolute, wrapperStyle]} />
        {tabs.length > 0 && this.renderActiveHat()}
        <View style={styles.row}>{tabs.map(this.renderTab)}</View>
      </View>
    )
  }
}
