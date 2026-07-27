import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface HeadlineItem { text: string; style: string; }

export default function HeroEditor() {
  const queryClient = useQueryClient();
  const { data: hero } = useQuery({ queryKey: ["hero"], queryFn: api.getHero });

  const [headline, setHeadline] = useState<HeadlineItem[]>([]);
  const [description, setDescription] = useState("");
  const [newText, setNewText] = useState("");
  const [newStyle, setNewStyle] = useState("normal");

  useEffect(() => {
    if (hero) {
      setHeadline(hero.headline || []);
      setDescription(hero.description || "");
    }
  }, [hero]);

  const mutation = useMutation({
    mutationFn: (data: any) => api.updateHero(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero section updated");
    },
    onError: () => toast.error("Failed to update"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ headline, description });
  };

  const addHeadlineItem = () => {
    if (newText.trim()) {
      setHeadline([...headline, { text: newText.trim(), style: newStyle }]);
      setNewText("");
    }
  };

  const removeHeadlineItem = (index: number) => {
    setHeadline(headline.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hero Section</h1>
        <p className="text-muted-foreground">Edit the hero headline and description</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Headline</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {headline.map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border bg-secondary/50 px-3 py-2">
                  <span className="flex-1 text-sm">
                    <span className={item.style === "italic" ? "italic" : "font-bold"}>{item.text}</span>
                    <span className="ml-2 text-xs text-muted-foreground">[{item.style}]</span>
                  </span>
                  <button type="button" onClick={() => removeHeadlineItem(i)}>
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter headline word/phrase..."
                className="flex-1"
              />
              <select
                value={newStyle}
                onChange={(e) => setNewStyle(e.target.value)}
                className="rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
              </select>
              <Button type="button" variant="outline" onClick={addHeadlineItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Hero section description text..."
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
