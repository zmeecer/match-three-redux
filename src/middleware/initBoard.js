import * as types from '../actions/types';

export default function initBoardMiddleware() {
  return ({ getState }) => next => action => {
    if (action.type === types.INIT_BOARD) {
      const { size } = action;

      let tiles = Array(size * size);
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          tiles[x*size+y] = {
            id: x*size+y,
            left: x,
            top: y,
            type: Utils.getRandom(colorCount),
          }
        }
      }
      next({
        type: action.type,
        tiles
      })
    } else {
      next(action);
    }
  };
}