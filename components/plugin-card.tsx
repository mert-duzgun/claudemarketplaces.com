import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plugin } from "@/lib/types";

interface PluginCardProps {
  plugin: Plugin;
}

export function PluginCard({ plugin }: PluginCardProps) {
  return (
    <Link href={`/plugin/${plugin.id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{plugin.name}</CardTitle>
            <Badge variant="outline" className="shrink-0">
              {plugin.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {plugin.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {plugin.author && (
              <span>by {plugin.author.name}</span>
            )}
            {plugin.version && (
              <span>• v{plugin.version}</span>
            )}
            {plugin.marketplace && (
              <span>• {plugin.marketplace}</span>
            )}
          </div>
          {plugin.keywords && plugin.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {plugin.keywords.slice(0, 3).map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
