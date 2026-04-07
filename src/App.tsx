import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactModal from "@/components/ContactModal";

import Index from "./pages/Index";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import Leadgen from "./pages/Leadgen";
import LeadgenCalc from "./pages/LeadgenCalc";

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header openModal={openModal} />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index openModal={openModal} />} />
                  <Route path="/policy" element={<Policy />} />
                  <Route path="/leadgen" element={<Leadgen openModal={openModal} />} />
                  <Route path="/leadgen-calc" element={<LeadgenCalc />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>

            <ContactModal isOpen={isModalOpen} onClose={closeModal} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;
