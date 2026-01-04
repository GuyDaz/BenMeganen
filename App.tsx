import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';
import { ClickToCall } from './components/ClickToCall';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ServiceDetail } from './pages/ServiceDetail';
import { Contact } from './pages/Contact';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* Global Contact Form Section attached above Footer */}
      <div id="contact-form-section">
        <ContactForm />
      </div>
      <Footer />
      <ClickToCall />
      <BackToTop />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:slug" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;