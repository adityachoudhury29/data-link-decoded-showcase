
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Github, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const Footer = () => {
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Suggestion submitted:", suggestion);
    e.preventDefault();
    if (suggestion.trim()) {
      toast({
        title: "Thank you for your suggestion!",
        description: "We appreciate your feedback.",
      });
      setSuggestion("");
    }
  };

  return (
    <footer className="mt-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Suggestion Box */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Suggest a Demo</h3>
            <p className="text-purple-100">
              Have an idea for a new error correction demonstration? Let us know!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Your suggestion..."
                className="min-h-[100px] bg-white/10 text-white placeholder:text-purple-200"
              />
              <Button 
                type="submit"
                className="bg-white text-purple-600 hover:bg-purple-100"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Suggestion
              </Button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="space-y-4 md:ml-auto md:text-right">
            <h3 className="text-xl font-semibold">Error Correction Lab</h3>
            <p className="text-purple-100">
              An interactive learning platform for understanding error detection and
              correction algorithms in computer networks.
            </p>
            <div className="flex items-center gap-4 md:justify-end">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-purple-200"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-purple-400/30 pt-8 text-center text-sm text-purple-100">
          <p>&copy; {new Date().getFullYear()} Error Correction Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
