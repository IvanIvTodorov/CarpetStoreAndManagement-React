import { Routes, Route } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.css';
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "517px" }}>
        <Routes>


        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
