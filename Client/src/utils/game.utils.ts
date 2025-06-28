import type { Tile, updateBoardProps } from '@/types/game.type';

//consts

// getters

export const getNonZeroTiles = (board: Tile[][]) => {
  return board.flatMap((tile) => tile).filter((tile) => tile.value != 0);
};

export const getAllTiles = (board: Tile[][]) => {
  return board.flatMap((tile) => tile);
};

export const getScoreFromBoard = (board: Tile[][]) => {
  return (
    board
      .flatMap((tile) => tile)
      // .filter((tile) => tile.isMerged)
      .reduce((acc, tile) => acc + tile.value, 0)
  );
};

//functions

export const createEmptyBoard = (size: number = 4): Tile[][] => {
  let board: Tile[][] = [];

  for (let i = 0; i < size; i++) {
    const row: Tile[] = [];
    for (let j = 0; j < size; j++) {
      const tile = {
        id: crypto.randomUUID(),
        value: 0,
        position: {
          x: i,
          y: j,
        },
        isMerged: false,
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
};

export const createRandomTile = (board: Tile[][]) => {
  const nonZeroTiles = getNonZeroTiles(board);
  const value = Math.random() < 0.8 ? 2 : 4; // 80%
  let positionX = Math.floor(Math.random() * board.length);
  let positionY = Math.floor(Math.random() * board.length);

  while (
    nonZeroTiles.some(
      (tile) =>
        tile.position.x === positionX && tile.position.y === positionY
    )
  ) {
    positionX = Math.floor(Math.random() * board.length);
    positionY = Math.floor(Math.random() * board.length);
  }
  return {
    id: crypto.randomUUID(),
    value,
    position: { x: positionX, y: positionY },
    isMerged: false,
  } as Tile;
};

export const createInitialBoard = (size: number) => {
  const initialTilesCount = Math.floor(Math.random() * size) + 2;
  const board = createEmptyBoard(size);
  const tiles: Tile[] = [];
  for (let i = 0; i < initialTilesCount; i++) {
    tiles.push(createRandomTile(board));
  }
  return updateCurrentBoard(board, tiles);
};

export const updateCurrentBoard = (
  currentBoard: Tile[][],
  tiles: Tile[]
) => {
  const newBoard = currentBoard.map((row, x) =>
    row.map((tile, y) => ({
      ...tile,
      position: { x, y },
    }))
  );
  for (const tile of tiles) {
    if (
      tile.position.x >= 0 &&
      tile.position.x < currentBoard.length &&
      tile.position.y >= 0 &&
      tile.position.y < currentBoard.length
    ) {
      newBoard[tile.position.x][tile.position.y] = tile;
    }
  }
  return newBoard;
};

export const moveTilesToLeft = (board: Tile[][]): Tile[][] => {
  const newBoard: Tile[][] = [];
  let isBoardChanged = false;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex];
    const nonZeroTiles = row.filter((tile) => tile.value !== 0);
    const newRow: Tile[] = [];

    let i = 0;

    while (i < nonZeroTiles.length) {
      const current = nonZeroTiles[i];
      const next = nonZeroTiles[i + 1];
      if (next && current.value === next.value) {
        isBoardChanged = true;
        const mergedTile: Tile = {
          ...current,
          value: current.value * 2,
          isMerged: true,
          id: crypto.randomUUID(),
          position: { x: rowIndex, y: newRow.length },
        };
        newRow.push(mergedTile);
        i += 2; // skip next
      } else {
        if (current.position.y !== newRow.length) {
          isBoardChanged = true;
        }
        const movedTile: Tile = {
          ...current,
          //   isMerged: false,
          id: crypto.randomUUID(),
          position: { x: rowIndex, y: newRow.length },
        };
        newRow.push(movedTile);
        i++;
      }
    }

    while (newRow.length < row.length) {
      newRow.push({
        id: crypto.randomUUID(),
        value: 0,
        isMerged: false,
        position: { x: rowIndex, y: newRow.length },
      });
    }

    newBoard.push(newRow);
  }
  return isBoardChanged
    ? updateCurrentBoard(newBoard, [createRandomTile(newBoard)])
    : newBoard;
};

export const moveTilesToRight = (board: Tile[][]): Tile[][] => {
  const newBoard: Tile[][] = [];
  let isBoardChanged = false;

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex];
    const nonZeroTiles = row.filter((tile) => tile.value !== 0);
    const newRow: Tile[] = [];

    let i = nonZeroTiles.length - 1;

    while (i >= 0) {
      const current = nonZeroTiles[i];
      const next = nonZeroTiles[i - 1];

      if (next && current.value === next.value) {
        const newY = row.length - 1 - newRow.length;
        isBoardChanged = true;

        const mergedTile: Tile = {
          ...current,
          value: current.value * 2,
          isMerged: true,
          id: crypto.randomUUID(),
          position: { x: rowIndex, y: newY },
        };

        newRow.push(mergedTile);
        i -= 2;
      } else {
        const newY = row.length - 1 - newRow.length;

        if (current.position.y !== newY) {
          isBoardChanged = true;
        }

        const movedTile: Tile = {
          ...current,
          //   isMerged: false,
          id: crypto.randomUUID(),
          position: { x: rowIndex, y: newY },
        };

        newRow.push(movedTile);
        i--;
      }
    }

    // Fill from left with zeros
    while (newRow.length < row.length) {
      newRow.push({
        id: crypto.randomUUID(),
        value: 0,
        isMerged: false,
        position: {
          x: rowIndex,
          y: row.length - 1 - newRow.length,
        },
      });
    }

    // Reverse to match row order
    newBoard.push([...newRow].reverse());
  }

  return isBoardChanged
    ? updateCurrentBoard(newBoard, [createRandomTile(newBoard)])
    : newBoard;
};

const getColumn = (board: Tile[][], colIndex: number): Tile[] =>
  board.map((row) => row[colIndex]);

const setColumn = (board: Tile[][], colIndex: number, newCol: Tile[]) => {
  for (let row = 0; row < board.length; row++) {
    board[row][colIndex] = newCol[row];
  }
};

export const moveTilesToUp = (board: Tile[][]): Tile[][] => {
  const newBoard: Tile[][] = createEmptyBoard(board.length);
  let isBoardChanged = false;

  for (let colIndex = 0; colIndex < board.length; colIndex++) {
    const column = getColumn(board, colIndex);
    const nonZeroTiles = column.filter((tile) => tile.value !== 0);
    const newCol: Tile[] = [];

    let i = 0;
    while (i < nonZeroTiles.length) {
      const current = nonZeroTiles[i];
      const next = nonZeroTiles[i + 1];

      if (next && current.value === next.value) {
        const mergedTile: Tile = {
          ...current,
          value: current.value * 2,
          isMerged: true,
          id: crypto.randomUUID(),
          position: { x: newCol.length, y: colIndex },
        };
        newCol.push(mergedTile);
        isBoardChanged = true;
        i += 2;
      } else {
        const newX = newCol.length;
        if (current.position.x !== newX) isBoardChanged = true;

        const movedTile: Tile = {
          ...current,
          //   isMerged: false,
          id: crypto.randomUUID(),
          position: { x: newX, y: colIndex },
        };
        newCol.push(movedTile);
        i++;
      }
    }

    while (newCol.length < board.length) {
      newCol.push({
        id: crypto.randomUUID(),
        value: 0,
        isMerged: false,
        position: { x: newCol.length, y: colIndex },
      });
    }

    setColumn(newBoard, colIndex, newCol);
  }

  return isBoardChanged
    ? updateCurrentBoard(newBoard, [createRandomTile(newBoard)])
    : newBoard;
};

export const moveTilesToDown = (board: Tile[][]): Tile[][] => {
  const newBoard: Tile[][] = createEmptyBoard(board.length);
  let isBoardChanged = false;

  for (let colIndex = 0; colIndex < board.length; colIndex++) {
    const column = getColumn(board, colIndex);
    const nonZeroTiles = column.filter((tile) => tile.value !== 0);
    const newCol: Tile[] = [];

    let i = nonZeroTiles.length - 1;
    while (i >= 0) {
      const current = nonZeroTiles[i];
      const next = nonZeroTiles[i - 1];

      if (next && current.value === next.value) {
        const newX = board.length - 1 - newCol.length;
        const mergedTile: Tile = {
          ...current,
          value: current.value * 2,
          isMerged: true,
          id: crypto.randomUUID(),
          position: { x: newX, y: colIndex },
        };
        newCol.push(mergedTile);
        isBoardChanged = true;
        i -= 2;
      } else {
        const newX = board.length - 1 - newCol.length;
        if (current.position.x !== newX) isBoardChanged = true;

        const movedTile: Tile = {
          ...current,
          //   isMerged: false,
          id: crypto.randomUUID(),
          position: { x: newX, y: colIndex },
        };
        newCol.push(movedTile);
        i--;
      }
    }

    while (newCol.length < board.length) {
      newCol.push({
        id: crypto.randomUUID(),
        value: 0,
        isMerged: false,
        position: {
          x: board.length - 1 - newCol.length,
          y: colIndex,
        },
      });
    }

    setColumn(newBoard, colIndex, [...newCol].reverse());
  }

  return isBoardChanged
    ? updateCurrentBoard(newBoard, [createRandomTile(newBoard)])
    : newBoard;
};

export const isGameOver = (board: Tile[][]): boolean => {
  const size = board.length;

  const isBoardFull = board
    .flatMap((row) => row)
    .every((tile) => tile.value !== 0);
  if (!isBoardFull) return false;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const current = board[i][j].value;

      if (i < size - 1 && current === board[i + 1][j].value) return false; // پایین
      if (j < size - 1 && current === board[i][j + 1].value) return false; // راست
    }
  }

  return true;
};
