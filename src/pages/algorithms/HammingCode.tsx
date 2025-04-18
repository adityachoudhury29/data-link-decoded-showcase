import { useState } from "react";
import { ArrowLeft, Binary, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const HammingCode = () => {
  const [input, setInput] = useState("1011");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState("");

  const isValidInput = (data: string) => {
    const isValid = /^[01]*$/.test(data);
    if (!isValid) {
      setError("Please enter a valid binary string (only 0s and 1s).");
      return false;
    }
    setError("");
    return true;
  }

  const encode = (data: string) => {
    if (!isValidInput(data)) return;
    
    const d1 = parseInt(data[0]);
    const d2 = parseInt(data[1]);
    const d3 = parseInt(data[2]);
    const d4 = parseInt(data[3]);
    
    const p1 = (d1 + d2 + d4) % 2;
    const p2 = (d1 + d3 + d4) % 2;
    const p3 = (d2 + d3 + d4) % 2;
    
    setEncoded(`${p1}${p2}${d1}${p3}${d2}${d3}${d4}`);
  };

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="mb-6 flex items-center gap-2 text-purple-600">
        <ArrowLeft className="h-4 w-4" />
        Back to Algorithms
      </Link>
      
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Hamming Code</h1>
        <p className="text-gray-600">
          Hamming code is a set of error-correction codes that can detect up to two
          simultaneous bit errors and correct single-bit errors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Interactive Demo</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Input Data (4 bits)</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-md border p-2"
                maxLength={4}
                pattern="[0-1]*"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="bg-soft-red-50 border-soft-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Input Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              onClick={() => encode(input)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Encode
            </Button>
            {encoded && (
              <div className="rounded-md bg-purple-50 p-4">
                <p className="font-mono">Encoded: {encoded}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">How it Works</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Binary className="h-6 w-6 text-purple-600" />
              <p>1. Input data is split into 4-bit segments</p>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-purple-600" />
              <p>2. Three parity bits are calculated</p>
            </div>
            <div className="flex items-center gap-3">
              <Binary className="h-6 w-6 text-purple-600" />
              <p>3. Final 7-bit code is generated</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HammingCode;
