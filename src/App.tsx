import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services/Services";
/* import Projects from "./components/Projects/Projects"; */
import Contacts from "./components/Contacts/Contacts";
import Footer from "./components/Footer/Footer";
import Pontoons from "./components/Pontoons/Pontoons";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      {/* <Projects /> */}
      <Contacts />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<Pontoons />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
