function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  // Return a reducer that handles undo and redo
  return (state = initialState, action) => {
    const { past, present, future } = state;
    console.log({ state });

    switch (action.type) {
      case 'UNDO': {
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
      case 'REDO': {
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
      default: {
        // Delegate handling the action to the passed reducer
        console.log('present', present);
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          console.log('returning state: ', state);
          return state;
        }
        console.log('returning new present: ', newPresent);
        return {
          ...newPresent,
          // past: [...past, present],
          // present: newPresent,
          // future: [],
        };
      }
    }
  };
}

export default undoable;
