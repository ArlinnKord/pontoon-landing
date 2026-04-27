import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services/Services";
/* import Projects from "./components/Projects/Projects"; */
import Contacts from "./components/Contacts/Contacts";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        {/* <Projects /> */}
        <Contacts />
      </main>
      <Footer />
    </>
  );
}

export default App;