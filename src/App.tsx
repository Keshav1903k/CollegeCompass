import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Detail from './pages/Detail';
import Compare from './pages/Compare';
import Predictor from './pages/Predictor';
import Discussions from './pages/Discussions';
import Saved from './pages/Saved';
import Login from './pages/Login';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<Explore />} />
          <Route path="/college/:id" element={<Detail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default App;
