import React, { Component } from "react";
import Tile from "./Tile";
import shuffle from "../utils/utils";
import Indicator from "./Indicator";

class Minesweeper extends Component {
  state = {
    tiles: [],
    hiddenTilesCount: 81,
    time: 0,
    flags: 0,
  };

  constructor() {
    super();
    this.state.tiles = this.initBoard();
  }

  handleClick = (tile) => {
    if (tile.hasMine) return console.log("game over");
    this.floodFill(tile.pos.x, tile.pos.y, 0);
    if (this.countHiddenFields() === 9) return console.log("you won");
  };

  handleReset = () => {
    const tiles = this.initBoard();
    const initialState = { tiles, hiddenTilesCount: 81, time: 0, flags: 0 };
    this.setState(initialState);
  };

  render() {
    return (
      <div className="minesweeper">
        <Indicator
          flags={this.state.flags}
          time={this.state.time}
          onReset={this.handleReset}
        />
        <div className="board">
          {this.state.tiles.map((row, index) => (
            <div className="row" key={index}>
              {row.map((tile) => (
                <Tile
                  key={tile.pos.x * 10 + tile.pos.y}
                  classes={tile.classes}
                  hidden={tile.hidden}
                  onClick={() => this.handleClick(tile)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  initBoard() {
    const tiles = [];
    const array = [...Array(81).keys()];
    const indexes = shuffle(array).slice(0, 9);

    for (let x = 0; x < 9; x++) {
      let row = [];
      for (let y = 0; y < 9; y++) {
        row.push({
          pos: { x, y },
          hasMine: indexes.find((index) => index === x * 10 + y) !== undefined,
          hasFlag: false,
          classes: "cell",
          hidden: true,
        });
      }
      tiles.push(row);
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (tiles[i][j].hasMine) tiles[i][j].classes += " mine";
        else
          tiles[i][j].classes += ` n${this.countSurroundingMines(
            tiles[i][j],
            tiles
          )}`;
      }
    }

    return tiles;
  }

  countSurroundingMines(cell, tiles) {
    const dimensions = tiles.length;

    let numOfMines = 0;
    for (let x_offset = -1; x_offset <= 1; x_offset++) {
      for (let y_offset = -1; y_offset <= 1; y_offset++) {
        if (
          cell.pos.x + x_offset >= 0 &&
          cell.pos.y + y_offset >= 0 &&
          cell.pos.x + x_offset < dimensions &&
          cell.pos.y + y_offset < dimensions
        ) {
          if (tiles[cell.pos.x + x_offset][cell.pos.y + y_offset].hasMine)
            numOfMines++;
        }
      }
    }
    return numOfMines;
  }

  floodFill(x, y, prevCount) {
    const tiles = [...this.state.tiles];
    if (
      x >= 0 &&
      x < 9 &&
      y >= 0 &&
      y < 9 &&
      tiles[x][y].hidden &&
      prevCount === 0
    ) {
      if (!tiles[x][y].hasMine) {
        tiles[x][y].hidden = false;
        let count = this.countSurroundingMines(tiles[x][y], tiles);
        this.floodFill(x - 1, y, count);
        this.floodFill(x + 1, y, count);
        this.floodFill(x, y - 1, count);
        this.floodFill(x, y + 1, count);
      }
    }
    this.setState({ tiles });
  }

  countHiddenFields() {
    let count = 0;
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) if (this.state.tiles[i][j].hidden) count++;

    return count;
  }
}

export default Minesweeper;
