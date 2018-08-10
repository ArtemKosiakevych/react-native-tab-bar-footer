[ripple]: https://github.com/n4kz/react-native-material-ripple

# react-native-tab-bar-footer
[![npm version](http://img.shields.io/npm/v/react-native-tab-bar-footer.svg?style=flat-square)](https://npmjs.org/package/react-native-tab-bar-footer "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/react-native-tab-bar-footer.svg?style=flat-square)](https://npmjs.org/package/react-native-tab-bar-footer "View this project on npm")

Navigation TabBar footer component for IOS and Android with slide animation which contains tab icon (normal and active) and title. You can use custom `hat` React Element (component above the active tab), if you use custom `hat` please provide also `hatWidth` and `hatHeight`.

In this lib I'm using [Ripple][ripple] component.

## Installation
`yarn add react-native-tab-bar-footer`

![](./src/demo-ios.gif)
![](./src/demo-android.gif)

# Usage

```js

import TabBar from 'react-native-tab-bar-footer'
...
  const tabs = [
    {
      icon: star,
      activeIcon: starActive,
      title: 'Favorites'
    },
    {
      icon: play,
      activeIcon: playActive,
      title: 'Play'
    },
    {
      icon: user,
      activeIcon: userActive,
      title: 'Profile'
      
    },
  ]
  render() {
    return <TabBar onTabChange={(index) => alert(index)} tabs={tabs} />
  }
```

## Props

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| tabs | [] | `Array<Tab>` | Tab objects |
| initialIndex | 0 | `number` | Initial active tab |
| onTabChange | undefined | `func` | onClick tab |
| slideSpeed | 25 | `number` | tabBar animation speed |
| slideBounciness | 10 | `number` | tabBar bounciness |
| tabSize | 30 | `number` | tab size |
| barColor | 'white' | `color` | tabBar color |
| height | 60 | `number` | tabBar height |
| titleStyle | - | `style` | title custom style |
| iconStyle | - | `style` | icon custom style |
| animationDuration | 200 | `number` | animation duration |
| rippleProps | `rippleCentered` | `object` | [Ripple][ripple] component props |
| hat | `<View/>` | `React.Element<*>` | Custom active hat component |
| hatWidth | 78 | `number` | Active hat component width |
| hatHeight | 78 | `number` | Active hat component height |

Tab object structure: 

```js
type Tab = { 
  icon: string|number, 
  activeIcon: string|number, 
  title: string
}
```

## Questions or suggestions?

Feel free to [open an issue](https://github.com/ArtemKosiakevych/react-native-tab-bar-footer/issues)
