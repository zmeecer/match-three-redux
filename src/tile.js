import React, {
  Animated,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PropTypes,
} from 'react-native';

const colors = [
  "#FFFC19",
  "#5B86CC",
  "#38FF49",
  "#FF5C4D",
  "#E4A6FF",
  "#937DB2",
];

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0.7),
      fadeAnim: new Animated.Value(0),
      left: new Animated.Value(this.props.position.left),
      top: new Animated.Value(this.props.position.top),
    }
  }

  getColor(index) {
    return colors[index];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.position.left != this.props.position.left) {
      Animated.timing(
        this.state.left,
        { toValue: nextProps.position.left, duration: 200 }
      ).start();
      return false;
    }
    if (nextProps.position.top != this.props.position.top) {
      Animated.timing(
        this.state.top,
        { toValue: nextProps.position.top, duration: 200 }
      ).start();
      return false;
    }
    return true;
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1, duration: 500}
    ).start();
    Animated.timing(
      this.state.bounceValue,
      {toValue: 1}
    ).start();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.click}>
        <Animated.View
          style={[
            styles.tile, {
              backgroundColor: this.getColor(this.props.type),
              width: this.props.cellSize,
              height: this.props.cellSize,
              left: this.state.left,
              top: this.state.top,
              opacity: this.props.selected ? 0.5 : this.state.fadeAnim,
              transform: [
                { scale: this.state.bounceValue },
              ]
            }
          ]}>
          <Text style={styles.letter}>{this.props.label}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

// Tile.propTypes = {
//   id: propTypes.string.isRequired,
//   position: PropTypes.object.isRequired,
//   click: propTypes.func.isRequired,
// }

export default Tile;

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: '#333',
    fontSize: 36,
  },
});
