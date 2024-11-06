import { Check } from "lucide-react";

type Props = {
  label: string;
};

export const FeatureField = ({ label }: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Check className="text-emerald-700 w-4 h-4" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};
