import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinshed: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountdownProvider ({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinshed, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setIsActive(true);
}

function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(25 * 60);
}

useEffect(() => {
    if (isActive && time > 0) {
        countDownTimeout = setTimeout(() => {
            setTime(time - 1);
        }, 1000)
    } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
    }
}, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinshed,
      isActive,
      startCountDown,
      resetCountDown,
    }} >
      {children}
    </CountdownContext.Provider>
  )
}