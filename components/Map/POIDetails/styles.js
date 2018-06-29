
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 400,
    padding: 14,
  },
  cardLogo: {
    width: 100,
    resizeMode: 'cover',
  },
  placeHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  percent: {
    color: 'teal',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  placeImage: {
    width: 100,
    height: 100,
  },
  infoTextBig: {
    fontSize: 17,
  },
  infoTextBigDivider: {
    fontSize: 17,
    paddingLeft: 3,
    paddingRight: 3,
  },
  infoTextSmall: {
    color: 'grey',
    fontSize: 15,
  },
  stars: {
    color: 'orange',
    fontSize: 15,
  },
  infoTextSmallDivider: {
    color: 'grey',
    fontSize: 15,
    paddingLeft: 2,
    paddingRight: 2,
  },
})

export default styles;