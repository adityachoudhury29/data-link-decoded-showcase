
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlgorithmCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const AlgorithmCard = ({
  title,
  description,
  icon,
  onClick,
  className,
}: AlgorithmCardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-purple-100 p-2 text-purple-600">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="mb-4 text-gray-600">{description}</p>
        <Button
          onClick={onClick}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Try Demo
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
};

export default AlgorithmCard;
