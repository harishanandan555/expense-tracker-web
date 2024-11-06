"use client";

import { AlertOctagonIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title: string;
  description: string;
};

export const LimitAlert = ({ title, description }: Props) => {
  return (
    <Alert>
      <AlertOctagonIcon className="w-5 h-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
