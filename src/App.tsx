import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./router/Routing";
import NavBar from "./components/Navbar";
import useGsapScroll from "./hooks/useGsapScroll";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Squares from './blocks/Backgrounds/Squares/Squares';
import { ThemeProvider } from "./components/ThemeProvider";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useGsapScroll();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Scroll to top on mobile on mount and route change
  useEffect(() => {
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0);
    }
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <ThemeProvider>

      <Router>
        {(isLoading && window.innerWidth >= 768) && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <div id="smooth-wrapper" className="h-screen overflow-hidden">
          <div id="smooth-content" className="relative">
            <Squares className="absolute inset-0 w-full h-full -z-10"
              speed={0.1}
              squareSize={40}
              direction='diagonal' // up, down, left, right, diagonal
              borderColor='#1a1a1a'
              hoverFillColor='#222'
            />
            <div className="absolute">

            </div>
            <NavBar />
            <Routing />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
