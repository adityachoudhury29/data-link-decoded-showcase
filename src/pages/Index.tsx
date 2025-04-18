
import { Binary, Hash, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlgorithmCard from "@/components/AlgorithmCard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto p-6 flex-1">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AlgorithmCard
            title="Hamming Code"
            description="Learn how Hamming codes can detect and correct single-bit errors in data transmission."
            icon={<Binary className="h-6 w-6" />}
            onClick={() => navigate("/hamming")}
          />
          <AlgorithmCard
            title="CRC"
            description="Explore Cyclic Redundancy Check (CRC) for error detection in digital networks."
            icon={<Hash className="h-6 w-6" />}
            onClick={() => navigate("/crc")}
          />
          <AlgorithmCard
            title="Parity Check"
            description="Understand simple parity checking mechanisms for error detection."
            icon={<Shield className="h-6 w-6" />}
            onClick={() => navigate("/parity")}
          />
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p className="text-lg font-semibold">Explore more algorithms and their implementations!</p>
          <p className="mt-2">Click on the cards above to dive into each algorithm.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
