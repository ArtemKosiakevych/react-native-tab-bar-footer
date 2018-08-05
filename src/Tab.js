import React from 'react'
import { View, Animated } from 'react-native'
import Ripple from 'react-native-material-ripple'

import styles from './styles'

export default class Tab extends React.Component {
  static defaultProps = {
    animationDuration: 200,
    size: 30,
  }

  constructor(props) {
    super(props)
    const scale = props.activeTab ? 1 : 0.5
    const opacity = props.activeTab ? 0 : 1
    this.state = {
      scale: new Animated.Value(scale),
      opacity: new Animated.Value(opacity),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeTab !== nextProps.activeTab) {
      if (nextProps.activeTab) {
        this.scaleUp()
        this.fadeOut()
      } else {
        this.fadeIn()
        this.scaleDown()
      }
    }
  }

  scaleUp() {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: this.props.animationDuration,
      useNativeDriver: true,
    }).start()
  }

  fadeOut() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.props.animationDuration,
      useNativeDriver: true,
    }).start()
  }

  scaleDown() {
    Animated.timing(this.state.scale, {
      toValue: 0.5,
      duration: this.props.animationDuration,
      useNativeDriver: true,
    }).start()
  }

  fadeIn() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animationDuration,
      useNativeDriver: true,
    }).start()
  }

  getIconStyle(size, scale) {
    const style = {
      // double size because initial scale equals 0.5
      height: size * 2,
      width: size * 2,
      alignSelf: 'center',
      transform: [{ scale }],
    }
    return style
  }

  getActiveTabSize() {
    return this.props.size * 2.6
  }

  render() {
    const {
      activeTab,
      tab,
      onPress,
      size,
      iconStyle,
      titleStyle,
      rippleProps,
    } = this.props
    const { scale, opacity } = this.state
    const icon = this.getIconStyle(size, scale)
    const activeTabSize = this.getActiveTabSize()
    const barWrapper = {
      width: activeTabSize,
      height: activeTabSize,
      borderRadius: activeTabSize / 2,
    }
    const height = activeTab ? activeTabSize : size * 2
    const iconSource = activeTab && tab.activeIcon ? tab.activeIcon : tab.icon
    return (
      <Ripple
        rippleCentered
        rippleContainerBorderRadius={activeTabSize / 2}
        rippleSize={activeTabSize * 1.3}
        {...rippleProps}
        onPressIn={onPress}
        style={[styles.tab, { height }]}
      >
        <View style={activeTab && [styles.tabActiveWrapper, barWrapper]}>
          <Animated.Image source={iconSource} style={[icon, iconStyle]} />
          {!!tab.title && (
            <Animated.Text style={[{ opacity }, titleStyle, styles.title]}>
              {tab.title}
            </Animated.Text>
          )}
        </View>
      </Ripple>
    )
  }
}
