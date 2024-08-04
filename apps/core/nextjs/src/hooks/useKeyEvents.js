import { useEffect } from "react";
import { useRouter } from "next/router";

const useKeyEvents = () => {
  const router = useRouter();

  useEffect(() => {
    const logKeyPress = (event) => {
      if (event.ctrlKey && event.key === "b") {
        event.preventDefault();
        handleCtrlB();
      }
    };

    const handleCtrlB = () => {
      const { query, pathname } = router;
      const hasIdOrSlug = query.id || query.slug;

      let newPath;

      if (hasIdOrSlug) {
        // Replace the id or slug with /new
        newPath = pathname.replace(/\/[^\/]+$/, "/new");
      } else {
        // Append /new to the end of the path
        newPath = pathname + "/new";
      }

      router.push(newPath);
    };

    window.addEventListener("keydown", logKeyPress);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", logKeyPress);
    };
  }, [router]);

  return null; // Custom hooks do not return JSX
};

export default useKeyEvents;
