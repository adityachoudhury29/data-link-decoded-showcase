
import { useState } from "react";
import { ArrowLeft, Binary, Shield, AlertCircle, DivideCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CRC = () => {
  const [message, setMessage] = useState("1101");
  const [generator, setGenerator] = useState("1001");
  const [crc, setCRC] = useState("");
  const [error, setError] = useState("");

  const isValidInput = (data: string, poly: string) => {
    const isValidData = /^[01]*$/.test(data);
    const isValidPoly = /^[01]*$/.test(poly);
    
    if (!isValidData || !isValidPoly) {
      setError("Please enter valid binary strings (only 0s and 1s).");
      return false;
    }
    
    setError("");
    return true;
  }

  const calculateCRC = (data: string, poly: string) => {
    if (!isValidInput(data, poly)) return;
    let dividend = data + "0".repeat(poly.length - 1);
    let divisor = poly;
    
    let curDiv = dividend.split('').map(Number);
    const divLength = divisor.length;
    
    for (let i = 0; i <= curDiv.length - divLength; i++) {
      if (curDiv[i] === 0) continue;
      
      for (let j = 0; j < divLength; j++) {
        curDiv[i + j] ^= Number(divisor[j]);
      }
    }
    
    const remainder = curDiv.slice(-divLength + 1).join('');
    setCRC(remainder);
  };

  const verify = (data: string, poly: string, checksum: string) => {
    const messageWithCRC = data + checksum;
    
    let curDiv = messageWithCRC.split('').map(Number);
    const divLength = poly.length;
    
    for (let i = 0; i <= curDiv.length - divLength; i++) {
      if (curDiv[i] === 0) continue;
      
      for (let j = 0; j < divLength; j++) {
        curDiv[i + j] ^= Number(poly[j]);
      }
    }
    
    if (curDiv.some(bit => bit === 1)) {
      setError("Error detected in data transmission!");
    } else {
      setError("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="mb-6 flex items-center gap-2 text-purple-600">
        <ArrowLeft className="h-4 w-4" />
        Back to Algorithms
      </Link>
      
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Cyclic Redundancy Check (CRC)</h1>
        <p className="text-gray-600">
          CRC is a powerful error-detecting code commonly used in digital networks
          and storage devices to detect accidental changes to raw data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Interactive Demo</h2>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-soft-red-50 border-soft-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Input Validation</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="message-input">Message</Label>
              <Input
                id="message-input"
                type="text"
                value={message}
                onChange={(e) => {
                  setCRC("");
                  setMessage(e.target.value);
                  setError("");
                }}
                className="font-mono"
                maxLength={8}
                pattern="[0-1]*"
              />
            </div>
            <div>
              <Label htmlFor="generator-input">Generator Polynomial</Label>
              <Input
                id="generator-input"
                type="text"
                value={generator}
                onChange={(e) => {
                  setCRC("");
                  setGenerator(e.target.value);
                  setError("");
                }}
                className="font-mono"
                maxLength={8}
                pattern="[0-1]*"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => calculateCRC(message, generator)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Calculate CRC
              </Button>
              {crc && (
                <Button
                  onClick={() => verify(message, generator, crc)}
                  variant="outline"
                >
                  Verify
                </Button>
              )}
            </div>
            {crc && (
              <div className="rounded-md bg-purple-50 p-4">
                <p className="font-mono">CRC: {crc}</p>
                <p className="font-mono mt-2">Message with CRC: {message + crc}</p>
                {error && (
                  <Alert variant="destructive" className="mt-2 bg-soft-red-50 border-soft-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Detection</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
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
              <p>1. Append n-1 zeros to the message (where n is the length of the generator polynomial)</p>
            </div>
            <div className="flex items-start gap-3">
              <DivideCircle className="mt-1 h-6 w-6 text-purple-600" />
              <p>2. Divide the result by the generator polynomial using binary division</p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="mt-1 h-6 w-6 text-purple-600" />
              <p>3. The remainder becomes the CRC checksum, which is appended to the original message</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CRC;
