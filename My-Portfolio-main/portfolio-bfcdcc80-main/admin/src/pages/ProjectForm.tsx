import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const emptyProject = {
  title: "", category: "", groupName: "Web Apps", description: "",
  challenge: "", solution: "", results: [] as string[], imageUrl: "",
  accentColor: "blue", technologies: [] as string[], year: new Date().getFullYear().toString(),
  liveUrl: "", webUrl: "", playStoreUrl: "", displayOrder: 0,
};

const groups = ["Mobile Apps", "Web Apps", "AI Platforms", "Enterprise Systems"];
const colors = ["emerald", "blue", "rose", "amber", "violet", "teal", "orange"];

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const [form, setForm] = useState(emptyProject);
  const [newResult, setNewResult] = useState("");
  const [newTech, setNewTech] = useState("");

  const { data: existing } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(Number(id)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        ...existing,
        results: existing.results || [],
        technologies: existing.technologies || [],
      });
    }
  }, [existing]);

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEdit ? api.updateProject(Number(id), data) : api.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(isEdit ? "Project updated" : "Project created");
      navigate("/projects");
    },
    onError: () => toast.error("Failed to save project"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const addResult = () => {
    if (newResult.trim()) {
      setForm({ ...form, results: [...form.results, newResult.trim()] });
      setNewResult("");
    }
  };

  const removeResult = (index: number) => {
    setForm({ ...form, results: form.results.filter((_: any, i: number) => i !== index) });
  };

  const addTech = () => {
    if (newTech.trim()) {
      setForm({ ...form, technologies: [...form.technologies, newTech.trim()] });
      setNewTech("");
    }
  };

  const removeTech = (index: number) => {
    setForm({ ...form, technologies: form.technologies.filter((_: any, i: number) => i !== index) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await api.uploadFile(file);
      setForm({ ...form, imageUrl: result.url });
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEdit ? "Edit Project" : "New Project"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update the project details" : "Add a new project to your portfolio"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Fintech, Education" />
              </div>
              <div className="space-y-2">
                <Label>Group</Label>
                <Select value={form.groupName} onValueChange={(v) => setForm({ ...form, groupName: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Year</Label>
                <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <Select value={form.accentColor} onValueChange={(v) => setForm({ ...form, accentColor: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {colors.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Challenge & Solution</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Challenge</Label>
              <Textarea value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Solution</Label>
              <Textarea value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {form.results.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 text-sm">{r}</span>
                <Button variant="ghost" size="icon" type="button" onClick={() => removeResult(i)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input value={newResult} onChange={(e) => setNewResult(e.target.value)} placeholder="Add a result..." />
              <Button type="button" variant="outline" onClick={addResult}><Plus className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Technologies</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {form.technologies.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full border bg-secondary px-3 py-1 text-sm">
                  {t}
                  <button type="button" onClick={() => removeTech(i)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newTech} onChange={(e) => setNewTech(e.target.value)} placeholder="Add a technology..." />
              <Button type="button" variant="outline" onClick={addTech}><Plus className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Links</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>App Store URL</Label>
              <Input value={form.liveUrl || ""} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Play Store URL</Label>
              <Input value={form.playStoreUrl || ""} onChange={(e) => setForm({ ...form, playStoreUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Web URL</Label>
              <Input value={form.webUrl || ""} onChange={(e) => setForm({ ...form, webUrl: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Image</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {form.imageUrl && (
              <div className="relative aspect-video w-48 overflow-hidden rounded-lg border">
                <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/projects")}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
