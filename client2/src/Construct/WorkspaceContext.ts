import { createContext, useContext } from 'react';
import { PuzzleReducerState } from '../SolveSpace/puzzleReducer';

const WorkspaceContext = createContext({
  state: {} as PuzzleReducerState,
  dispatch: (payload: Record<string, any>) => {},
});

export const useWorkspaceContext = () => {
  return useContext(WorkspaceContext);
};

export const WorkspaceContextProvider = WorkspaceContext.Provider;
