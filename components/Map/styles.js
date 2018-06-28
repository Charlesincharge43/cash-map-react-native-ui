
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  center: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  topLeft: {
    position: 'absolute',
    top: 55,
    left: 25,
    zIndex: 1,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 170,
    right: 25,
  },
  bottomRightLower: {
    position: 'absolute',
    bottom: 20,
    right: 25,
  },
})

export default styles;