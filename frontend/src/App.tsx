import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './configs/apolloClient';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import { useEffect } from 'react';
import { playAudio1 } from './utils/audioPlayer';

function App() {
  useEffect(() => {
    const handleInteraction = () => {
      playAudio1(); 
      // playAudio2();
      document.removeEventListener("click", handleInteraction); 
    };

    document.addEventListener("click", handleInteraction);
    return () => {
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/recipe/:id" element={<Home />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
