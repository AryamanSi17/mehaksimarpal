import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AnandKaraj from "./pages/AnandKaraj";
import Reception from "./pages/Reception";
import RSVP from "./pages/RSVP";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anand-karaj" element={<AnandKaraj />} />
            <Route path="/reception" element={<Reception />} />
            <Route path="/rsvp" element={<RSVP />} />
          </Routes>
        </div>
        <Footer />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
