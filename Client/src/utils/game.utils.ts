import type { Tile } from '@/types/game.type';

// getters

export const getAllNonZeroTiles = (board: Tile[][]) => {
  return board.flat().filter((tile) => tile.value != 0);
};

export const getAllTiles = (board: Tile[][]) => {
  return board.flat();
};

export const getScoreFromBoard = (board: Tile[][]) => {
  return board.flat().reduce((acc, tile) => acc + tile.value, 0);
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

export const createRandomTile = (board: Tile[][]): Tile => {
  const emptyTiles: Tile[] = board
    .flat()
    .filter((tile) => tile.value === 0);

  if (emptyTiles.length === 0) {
    throw new Error('No empty tile available');
  }

  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const chosen = emptyTiles[randomIndex];

  return {
    id: crypto.randomUUID(),
    value: Math.random() < 0.9 ? 2 : 4,
    position: { ...chosen.position },
    isMerged: false,
  };
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

const getColumn = (board: Tile[][], colIndex: number): Tile[] => {
  return board.map((row) => row[colIndex]);
};

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

export const isGameOverCheck = (board: Tile[][]): boolean => {
  const size = board.length;

  const isBoardFull = board.flat().every((tile) => tile.value !== 0);
  if (!isBoardFull) return false;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const current = board[i][j].value;

      if (i < size - 1 && current === board[i + 1][j].value) return false;

      if (i > 0 && current === board[i - 1][j].value) return false;

      if (j < size - 1 && current === board[i][j + 1].value) return false;

      if (j > 0 && current === board[i][j - 1].value) return false;
    }
  }
  return true;
};

export const cloneBoard = (board: Tile[][]) => {
  return board.map((row) =>
    row.map((tile) => ({
      ...tile,
      position: { x: tile.position.x, y: tile.position.y },
    }))
  );
};

export const hasChangedCheck = (
  prevBoard: Tile[][],
  currentBoard: Tile[][]
) => {
  const prev = prevBoard.flat().map((t) => t.value);
  const current = currentBoard.flat().map((t) => t.value);
  return prev.some((v, i) => v !== current[i]);
};

export const isWinCheck = (board: Tile[][], target: number) => {
  return board.flat().some((tile) => tile.value === target);
};

export const assertNever = (val: never) => {
  console.error(`unexpected value : ${val}`);
  throw Error(`unexpected value : ${val}`);
};
