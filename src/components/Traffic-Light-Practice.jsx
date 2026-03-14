import React, { useEffect, useState } from 'react';

import styles from './traffic-light-practice.module.css';

const DEFAULT_SIGNAL = 'green';

const SIGNAL_SEQUENCE = {
  green: { next: 'yellow', duration: 3000 },
  yellow: { next: 'red', duration: 500 },
  red: { next: 'green', duration: 4000 },
};

const SIGNAL_ORDER = ['green', 'yellow', 'red'];

const getSignalOpacity = (isActive) => ({
  opacity: isActive ? 1 : 0.5,
});

const TrafficeLightPractice = () => {
  const [activeSignal, setActiveSignal] = useState(DEFAULT_SIGNAL);

  useEffect(() => {
    const currentSignalConfig = SIGNAL_SEQUENCE[activeSignal];

    if (!currentSignalConfig) {
      setActiveSignal(DEFAULT_SIGNAL);
      return undefined;
    }

    const timerId = setTimeout(() => {
      setActiveSignal(currentSignalConfig.next);
    }, currentSignalConfig.duration);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [activeSignal]);

  return (
    <>
      <h2>Traffic Light</h2>
      <div className={styles.container} role="img" aria-label={`Traffic light showing ${activeSignal}`}>
        {SIGNAL_ORDER.map((signal) => (
          <span
            key={signal}
            className={styles[signal]}
            style={getSignalOpacity(activeSignal === signal)}
            aria-hidden="true"
          >
            {signal.slice(0, 1).toUpperCase()}
          </span>
        ))}
      </div>
    </>
  );
};

export default TrafficeLightPractice;
