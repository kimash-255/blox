import { useEffect } from "react";
import { useRouter } from "next/router";

const useKeySave = (onSave) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case "s":
            event.preventDefault();
            if (onSave) onSave(); // Call the save function passed as an argument
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, onSave]);

  return null; // Custom hooks do not return JSX
};

export default useKeySave;
