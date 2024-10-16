import { useState } from "react";

const useTypingTimeout = (delay: number = 700) => {
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const startTypingTimeout = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setIsUserTyping(false);
    }, delay);

    setTypingTimeout(timeout);

    setIsUserTyping(true);
  };

  return { isUserTyping, startTypingTimeout };
};

export default useTypingTimeout;
