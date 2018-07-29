import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  flexAbsolute: {
    position: 'absolute',
    width: '100%',
  },
  hat: {
    position: 'absolute',
    bottom: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  tabActiveWrapper: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'flex-start',
    top: 10,
  },
  title: {
    bottom: 14,
    textAlign: 'center',
  },
})
