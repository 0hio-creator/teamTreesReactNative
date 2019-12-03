import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'darkkhaki',
      justifyContent: 'center',
      flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5a52a5',

  },
  infoContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'darkkhaki',
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: 'peru'
  },
  iconStyle: {
    color: '#8ab73f',
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#8ab73f',
    padding: 14,
    marginBottom: 20,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "peru",
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

export {styles}
