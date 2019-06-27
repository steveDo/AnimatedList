import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated
} from "react-native";

let widthScreen = Dimensions.get("window").width;
let heightScreen = Dimensions.get("window").height;

export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      scale: false,
      moveAnimation: new Animated.Value(0),
      scaleAnimation: new Animated.Value(1),
      moved: false
    };

    this.translateY = 0;
  }

  componentDidMount() {}

  componentWillReceiveProps = nextProps => {};

  startScaleAnimation = () => {
    this.setState({ scale: true, show: true }, () => {
      this.state.scaleAnimation.setValue(0.7);
      Animated.timing(this.state.scaleAnimation, {
        toValue: 1,
        delay: 50,
        duration: 250
      }).start(() => {
        this.setState({ scale: false });
      });
    });
  };

  startMoveDownAnimation = () => {
    this.props.onMoveDown(this.props.index);

    this.translateY = this.translateY + 220;
    Animated.timing(this.state.moveAnimation, {
      toValue: this.translateY,
      duration: 300
    }).start();
  };

  moveLastItem = () => {
    this.translateY = this.translateY + 220;
    Animated.timing(this.state.moveAnimation, {
      toValue: this.translateY,
      duration: 300
    }).start();
  };

  _onSkip = () => {
    if (!this.state.moved) {
      this.startMoveDownAnimation();
      this.setState({ moved: true });
    }
  };

  render() {
    if (!this.state.show) {
      return null;
    }

    const animatedMoveDownStyle = {
      transform: [
        {
          translateY: this.state.moveAnimation
        }
      ]
    };

    const animatedScaleStyle = {
      transform: [
        {
          scale: this.state.scaleAnimation
        }
      ]
    };

    const animationStyle = this.state.scale
      ? animatedScaleStyle
      : animatedMoveDownStyle;

    return (
      <Animated.View style={[styles.container, animationStyle]}>
        <Image
          style={styles.imvThumb}
          source={require("./fashion.png")}
          resizeMode="cover"
        />
        <View style={styles.viewBottom}>
          <TouchableOpacity style={styles.btnSkip} onPress={this._onSkip}>
            <Text style={styles.txtSkip}>
              {this.state.moved ? "SKIPED" : "SKIP"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnYes} onPress={this._onSkip}>
            <Text style={styles.txtYes}>YES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnYes, { right: 100 }]}
            onPress={this._onSkip}
          >
            <Text style={styles.txtYes}>NO</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  txtYes: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black"
  },

  btnYes: {
    position: "absolute",
    right: 20,
    width: 70,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },

  txtSkip: {
    fontWeight: "bold",
    fontSize: 15,
    color: "gray"
  },

  btnSkip: {
    marginLeft: 20
  },

  viewBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center"
  },

  imvThumb: {
    width: undefined,
    height: undefined,
    flex: 1,
    marginBottom: 60,
    backgroundColor: "#f5f5f5"
  },

  container: {
    position: "absolute",
    top: 40,
    width: widthScreen - 40,
    height: 200,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "white",
    alignSelf: "center"
  }
});
