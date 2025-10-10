"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PluginSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PluginSearch({ value, onChange }: PluginSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search plugins..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
