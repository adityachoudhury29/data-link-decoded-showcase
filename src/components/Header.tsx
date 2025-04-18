
import { BookOpen, Code2, Network } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Error Correction Lab</h1>
          </div>
          <div className="flex items-center gap-4">
            <Code2 className="h-6 w-6" />
            <BookOpen className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-2 text-purple-100">
          Interactive demonstrations of data link layer error correction algorithms
        </p>
      </div>
    </div>
  );
};

export default Header;
