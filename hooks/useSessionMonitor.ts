// hooks/useSessionMonitor.ts
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useSupabaseAuth } from './useSupabaseAuth';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minut

export function useSessionMonitor() {
  const { signOut } = useSupabaseAuth();
  const appState = useRef(AppState.currentState);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App wrócił na pierwszy plan - resetuj timeout
        resetTimeout();
      } else if (nextAppState.match(/inactive|background/)) {
        // App poszedł w tło - ustaw timeout
        timeoutRef.current = setTimeout(signOut, SESSION_TIMEOUT);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [signOut]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}