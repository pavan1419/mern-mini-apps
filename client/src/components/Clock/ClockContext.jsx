import { createContext, useContext, useState, useEffect } from 'react';

const ClockContext = createContext();

export const ClockProvider = ({ children }) => {
  const [time, setTime] = useState(new Date());
  const [format24, setFormat24] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (!format24) {
      hours = hours % 12;
      hours = hours ? hours : 12;
    }

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}${
      showSeconds ? `:${formattedSeconds}` : ''
    } ${!format24 ? ampm : ''}`;
  };

  const formatDate = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return time.toLocaleDateString(undefined, options);
  };

  return (
    <ClockContext.Provider
      value={{
        time,
        format24,
        setFormat24,
        showSeconds,
        setShowSeconds,
        showDate,
        setShowDate,
        formatTime,
        formatDate,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};

export const useClockContext = () => {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error('useClockContext must be used within a ClockProvider');
  }
  return context;
};
