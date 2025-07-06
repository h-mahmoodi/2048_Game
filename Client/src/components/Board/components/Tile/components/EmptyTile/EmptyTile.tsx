import { useEmptyTileStyle } from './EmptyTile.style';

export const EmptyTile = () => {
  const classes = useEmptyTileStyle();
  return <div className={classes.Tile}></div>;
};
