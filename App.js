/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import CardItem from "./CardItem";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      listItems: ["1", "2", "3", "4", "5", "6", "7", "8"],
      contentHeight: 210
    };

    this.cachedCardItems = [];
    this.movedCardItems = [];
  }

  _onMoveDownItem = index => {
    if (this.movedCardItems.length > 0) {
      for (let i = 0; i < this.movedCardItems.length; i++) {
        const _movedKey = this.movedCardItems[i];
        const _moveRef = this[_movedKey];
        _moveRef.moveLastItem();
      }
    }

    const _cacheKey = this.cachedCardItems[index];
    if (!this.movedCardItems.includes(_cacheKey)) {
      this.movedCardItems.push(_cacheKey);
    }

    this.setState({ contentHeight: (this.movedCardItems.length + 1) * 240 });

    const _scaleIndex = index - 1;
    const _scaleKey = this.cachedCardItems[_scaleIndex];
    const _scaleRef = this[_scaleKey];
    _scaleRef.startScaleAnimation();
  };

  _renderItems = () => {
    return this.state.listItems.map((element, index) => {
      const key = `card-${element}`;
      if (!this.cachedCardItems.includes(key)) {
        this.cachedCardItems.push(key);
      }

      return (
        <CardItem
          ref={ref => (this[`${key}`] = ref)}
          key={key}
          refKey={key}
          onSkip={this._onSkip}
          index={index}
          onMoveDown={this._onMoveDownItem}
          show={index === this.state.listItems.length - 1 ? true : false}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={{
            height: this.state.contentHeight
          }}
          showsVerticalScrollIndicator={false}
        >
          {this._renderItems()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainScroll: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
