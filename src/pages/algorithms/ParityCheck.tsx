
import { useState } from "react";
import { ArrowLeft, Binary, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ParityCheck = () => {
  const [input, setInput] = useState("1101");
  const [parityBit, setParityBit] = useState("");
  const [error, setError] = useState(false);


  const checkValidInput = (data: string) => {
    // Check if input is a binary string (only contains 0s and 1s)    
    const isValid = /^[01]*$/.test(data);
    if (!isValid) {

      alert("Please enter a valid binary string (only 0s and 1s).");
      return false;
    }
    return true;  
  }

  const calculateParity = (data: string) => {
    if(!checkValidInput(data)) return; // Validate input before proceeding
    const ones = data.split('').filter(bit => bit === '1').length;
    // Even parity: if number of 1s is odd, add 1; if even, add 0
    const parity = ones % 2 === 0 ? '0' : '1';
    setParityBit(parity);
  };

  const checkForErrors = (data: string, parity: string) => {
    const allBits = data + parity;
    const ones = allBits.split('').filter(bit => bit === '1').length;
    setError(ones % 2 !== 0);
  };

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="mb-6 flex items-center gap-2 text-purple-600">
        <ArrowLeft className="h-4 w-4" />
        Back to Algorithms
      </Link>
      
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Parity Check</h1>
        <p className="text-gray-600">
          Parity checking is a simple error detection technique that adds an extra bit
          to detect single-bit errors in data transmission.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Interactive Demo</h2>
          <div className="space-y-4">
            <div>
                    <Label htmlFor="data-input">Input Data</Label>
                    <Input
                    id="data-input"
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setParityBit("");
                    }}
                    className="font-mono"
                    maxLength={8}
                    pattern="[0-1]*"
                    />
                  </div>
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  calculateParity(input);
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Calculate Parity
              </Button>
              {/* {parityBit && (
                      <Button
                        onClick={() => checkForErrors(input, parityBit)}
                        variant="outline"
                      >
                        Check for Errors
                      </Button>
                      )} */}
            </div>
            {parityBit && (
              <div className="rounded-md bg-purple-50 p-4">
                <p className="font-mono">Data with parity: {input + parityBit}</p>
                {error !== null && (
                  <div className={`mt-2 flex items-center gap-2 ${error ? 'text-red-500' : 'text-green-500'}`}>
                    {error ? <AlertCircle className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                    <span>{error ? 'Error detected!' : 'No errors detected'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">How it Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Binary className="mt-1 h-6 w-6 text-purple-600" />
              <p>1. Count the number of 1s in the data bits</p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="mt-1 h-6 w-6 text-purple-600" />
              <p>2. Add a parity bit (0 or 1) to make the total number of 1s even (even parity)</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-6 w-6 text-purple-600" />
              <p>3. During verification, count all 1s (including parity bit). If the total is odd, an error is detected</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParityCheck;
