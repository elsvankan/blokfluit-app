'use client';

import { Dispatch, SetStateAction, createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { AppState, DEFAULT_STATE, loadState, saveState } from './storage';

type AppStateContextValue = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  resetState: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      setState,
      resetState: () => setState(DEFAULT_STATE)
    }),
    [state]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
