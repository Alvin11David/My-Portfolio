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

interface Stat { number: number; suffix: string; label: string; }

export default function AboutEditor() {
  const queryClient = useQueryClient();
  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: api.getProfile });

  const [bioText, setBioText] = useState("");
  const [stats, setStats] = useState<Stat[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (profile) {
      setBioText(profile.bioText || "");
      setStats(profile.stats || []);
      setSkills(profile.skills || []);
    }
  }, [profile]);

  const mutation = useMutation({
    mutationFn: (data: any) => api.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("About section updated");
    },
    onError: () => toast.error("Failed to update"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ bioText, stats, skills, profileImageUrl: profile?.profileImageUrl || "" });
  };

  const updateStat = (index: number, field: keyof Stat, value: any) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const addStat = () => setStats([...stats, { number: 0, suffix: "+", label: "" }]);
  const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Section</h1>
        <p className="text-muted-foreground">Edit your bio text, stats, and skills list</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Bio Text</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={bioText} onChange={(e) => setBioText(e.target.value)} rows={6} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Number</Label>
                  <Input type="number" value={stat.number} onChange={(e) => updateStat(i, "number", parseInt(e.target.value) || 0)} className="w-20" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Suffix</Label>
                  <Input value={stat.suffix} onChange={(e) => updateStat(i, "suffix", e.target.value)} className="w-16" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
                </div>
                <Button variant="ghost" size="icon" type="button" onClick={() => removeStat(i)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addStat}>
              <Plus className="mr-1 h-3 w-3" /> Add Stat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full border bg-secondary px-3 py-1 text-sm">
                  {s}
                  <button type="button" onClick={() => removeSkill(i)}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill..." />
              <Button type="button" variant="outline" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
            </div>
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
