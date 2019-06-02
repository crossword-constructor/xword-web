import { buildPlayableBoard } from './Board.utils';
import mockPuzzleData from '../../__mocks__/puzzle';
import mockPlayableBoard from '../../__mocks__/playableBoard';

describe('build a playableboard', () => {
  it('builds a playableboard', () => {
    const processedPuzzle = buildPlayableBoard(mockPuzzleData);
    expect(processedPuzzle.clues).toEqual(mockPlayableBoard.clues);
    expect(processedPuzzle.playableBoard).toEqual(
      mockPlayableBoard.playableBoard
    );
  });
});
