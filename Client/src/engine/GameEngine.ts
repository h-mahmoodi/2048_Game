import { Direction, type Tile } from '@/types/game.type';
import { assertNever } from '@/utils/app.utils';
import {
  cloneBoard,
  createEmptyBoard,
  createInitialBoard,
  createRandomTile,
  getAllNonZeroTiles,
  getAllTiles,
  getScoreFromBoard,
  hasChangedCheck,
  isGameOverCheck,
  isWinCheck,
  moveTilesToDown,
  moveTilesToLeft,
  moveTilesToRight,
  moveTilesToUp,
  updateCurrentBoard,
} from '@/utils/game.utils';

export class GameEngine {
  private board: Tile[][];
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.board = createEmptyBoard(size);
  }

  getBoard(): Tile[][] {
    return cloneBoard(this.board);
  }

  getScore(): number {
    return getScoreFromBoard(this.board);
  }
  getTiles(): Tile[] {
    return getAllTiles(this.board);
  }

  getNonZeroTiles(): Tile[] {
    return getAllNonZeroTiles(this.board);
  }

  hasChanged(prevBoard: Tile[][]): boolean {
    return hasChangedCheck(prevBoard, this.board);
  }

  start(board?: Tile[][]): void {
    this.board = board ? cloneBoard(board) : createInitialBoard(this.size);
  }

  move(direction: Direction): void {
    switch (direction) {
      case Direction.UP:
        this.board = moveTilesToUp(this.board);
        break;
      case Direction.DOWN:
        this.board = moveTilesToDown(this.board);
        break;
      case Direction.LEFT:
        this.board = moveTilesToLeft(this.board);
        break;
      case Direction.RIGHT:
        this.board = moveTilesToRight(this.board);
        break;
      default:
        assertNever(direction);
    }
  }

  reset(): void {
    this.board = createEmptyBoard(this.size);
  }

  isGameOver(): boolean {
    return isGameOverCheck(this.board);
  }

  isWin(target: number = 2048): boolean {
    return isWinCheck(this.board, target);
  }

  insertRandomTile(): void {
    if (!this.board.flat().some((tile) => tile.value === 0)) {
      console.warn('Board full. Cannot insert tile.');
      return;
    }
    const tile = createRandomTile(this.board);
    this.board = updateCurrentBoard(this.board, [tile]);
  }
}
