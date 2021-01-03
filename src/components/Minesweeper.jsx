import React, { Component } from "react";
import Tile from "./Tile";
import shuffle from "../utils/utils";
import Indicator from "./Indicator";

const difficulty = {
  beginner: {
    mines: 10,
    size: { x: 9, y: 9 },
    count: 81,
  },
  intermediate: {
    mines: 40,
    size: { x: 16, y: 16 },
    count: 256,
  },
  advanced: {
    mines: 99,
    size: { x: 16, y: 32 },
    count: 512,
  },
};
class Minesweeper extends Component {
  state = {
    tiles: [],
    difficulty: difficulty.beginner,
    hiddenTilesCount: difficulty.beginner.count,
    time: 0,
    flags: difficulty.beginner.mines,
    gameState: "",
  };

  constructor() {
    super();
    this.state.tiles = this.initBoard();
  }

  handleClick = (tile) => {
    if (this.state.gameState === "") this.setState({ gameState: "started" });
    if (tile.hasFlag) return;
    if (tile.hasMine) return this.gameOver(tile.pos);
    this.floodFill(tile.pos.x, tile.pos.y, 0);
    if (this.countHiddenFields() === 9) this.setState({ gameState: "win" });
  };

  handleRightClick = (e, tile) => {
    e.preventDefault();
    const flags = this.state.flags;

    if (!tile.hidden || (flags === 0 && !tile.hasFlag)) return;

    const tiles = [...this.state.tiles];

    if (tile.hasFlag) {
      tiles[tile.pos.x][tile.pos.y].hasFlag = false;
      this.setState({ flags: flags + 1 });
    } else {
      tiles[tile.pos.x][tile.pos.y].hasFlag = true;
      this.setState({ flags: flags - 1 });
    }

    this.setState({ tiles });
  };

  handleReset = () => {
    const tiles = this.initBoard();
    const initialState = {
      tiles,
      difficulty: difficulty.beginner,
      hiddenTilesCount: difficulty.beginner.count,
      time: 0,
      flags: difficulty.beginner.mines,
      gameState: "",
    };
    this.setState(initialState);
  };

  render() {
    return (
      <div className="minesweeper">
        <Indicator
          flags={this.state.flags}
          time={this.state.time}
          onReset={this.handleReset}
          gameState={this.state.gameState}
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
                  gameState={this.state.gameState}
                  onContextMenu={(e) => this.handleRightClick(e, tile)}
                  hasFlag={tile.hasFlag}
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
    const { difficulty } = this.state;
    const size_x = difficulty.size.x;
    const size_y = difficulty.size.y;
    const array = [...Array(difficulty.count).keys()];
    const indexes = shuffle(array).slice(0, difficulty.mines);

    for (let x = 0; x < size_x; x++) {
      let row = [];
      for (let y = 0; y < size_y; y++) {
        row.push({
          pos: { x, y },
          hasMine:
            indexes.find((index) => index === x * size_x + y) !== undefined,
          hasFlag: false,
          classes: "cell",
          hidden: true,
        });
      }
      tiles.push(row);
    }

    console.log(tiles);

    for (let i = 0; i < size_x; i++) {
      for (let j = 0; j < size_y; j++) {
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
    const size = this.state.difficulty.size;
    if (
      x >= 0 &&
      x < size.x &&
      y >= 0 &&
      y < size.y &&
      tiles[x][y].hidden &&
      prevCount === 0
    ) {
      if (!tiles[x][y].hasMine && !tiles[x][y].hasFlag) {
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
    const size = this.state.difficulty.size;
    let count = 0;
    for (let x = 0; x < size.x; x++)
      for (let y = 0; y < size.y; y++)
        if (this.state.tiles[x][y].hidden) count++;

    return count;
  }

  gameOver(trigger) {
    this.revealMines(trigger);
    this.setState({ gameState: "dead" });
  }

  revealMines(trigger) {
    const tiles = [...this.state.tiles];
    const size = this.state.difficulty.size;
    for (let x = 0; x < size.x; x++) {
      for (let y = 0; y < size.y; y++) {
        if (!tiles[x][y].hasFlag && tiles[x][y].hasMine)
          tiles[x][y].hidden = false;
        if (tiles[x][y].hasFlag && !tiles[x][y].hasMine) {
          tiles[x][y].hidden = false;
          tiles[x][y].classes += " dead-flag";
        }
        if (x === trigger.x && y === trigger.y)
          tiles[x][y].classes += " triggeredDeath";
      }
    }
    this.setState({ tiles });
  }
}

export default Minesweeper;
