import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export default function SkillsEditor() {
  const queryClient = useQueryClient();
  const { data: categories } = useQuery({ queryKey: ["skillCategories"], queryFn: api.getSkillCategories });
  const { data: tools } = useQuery({ queryKey: ["tools"], queryFn: api.getTools });

  const [editCategory, setEditCategory] = useState<any>(null);
  const [editTool, setEditTool] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<{ type: string; id: number } | null>(null);

  const saveCategory = useMutation({
    mutationFn: (data: any) =>
      data.id ? api.updateSkillCategory(data.id, data) : api.createSkillCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillCategories"] });
      toast.success("Saved");
      setEditCategory(null);
    },
    onError: () => toast.error("Failed to save"),
  });

  const saveTool = useMutation({
    mutationFn: (data: any) =>
      data.id ? api.updateTool(data.id, data) : api.createTool(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      toast.success("Saved");
      setEditTool(null);
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ type, id }: { type: string; id: number }) =>
      type === "category" ? api.deleteSkillCategory(id) : api.deleteTool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillCategories"] });
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      toast.success("Deleted");
      setDeleteId(null);
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills & Tools</h1>
        <p className="text-muted-foreground">Manage skill categories and tools</p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Skill Categories</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4 pt-4">
          <Button onClick={() => setEditCategory({ title: "", iconName: "", color: "", shadowColor: "", displayOrder: 0, skills: [] })}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>

          <div className="grid gap-4 md:grid-cols-2">
            {categories?.map((cat: any) => (
              <Card key={cat.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{cat.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setEditCategory(cat)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId({ type: "category", id: cat.id })}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills?.map((s: any, i: number) => (
                      <span key={i} className="rounded-full border bg-secondary px-2 py-0.5 text-xs">
                        {s.name} ({s.level}%)
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 pt-4">
          <Button onClick={() => setEditTool({ name: "", iconName: "", displayOrder: 0 })}>
            <Plus className="mr-2 h-4 w-4" /> Add Tool
          </Button>

          <div className="flex flex-wrap gap-2">
            {tools?.map((tool: any) => (
              <span key={tool.id} className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1.5 text-sm">
                {tool.name}
                <button onClick={() => setEditTool(tool)}><Edit className="h-3 w-3 text-muted-foreground" /></button>
                <button onClick={() => setDeleteId({ type: "tool", id: tool.id })}><X className="h-3 w-3 text-red-500" /></button>
              </span>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editCategory} onOpenChange={() => setEditCategory(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editCategory?.id ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          {editCategory && (
            <CategoryForm
              data={editCategory}
              onSave={(data) => saveCategory.mutate(data)}
              onCancel={() => setEditCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTool} onOpenChange={() => setEditTool(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTool?.id ? "Edit Tool" : "New Tool"}</DialogTitle>
          </DialogHeader>
          {editTool && (
            <ToolForm
              data={editTool}
              onSave={(data) => saveTool.mutate(data)}
              onCancel={() => setEditTool(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CategoryForm({ data, onSave, onCancel }: { data: any; onSave: (d: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState(data);
  const [skills, setSkills] = useState<any[]>(data.skills || []);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("");

  const addSkill = () => {
    if (newSkillName.trim() && newSkillLevel) {
      setSkills([...skills, { name: newSkillName.trim(), level: parseInt(newSkillLevel) }]);
      setNewSkillName("");
      setNewSkillLevel("");
    }
  };

  const removeSkill = (index: number) => setSkills(skills.filter((_: any, i: number) => i !== index));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Icon Name</Label>
        <Input value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Color (Tailwind gradient)</Label>
        <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Skills</Label>
        <div className="space-y-1">
          {skills.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span>{s.name} ({s.level}%)</span>
              <button onClick={() => removeSkill(i)}><X className="h-3 w-3 text-red-500" /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} placeholder="Skill name" />
          <Input type="number" value={newSkillLevel} onChange={(e) => setNewSkillLevel(e.target.value)} placeholder="Level" className="w-20" />
          <Button type="button" variant="outline" size="sm" onClick={addSkill}>Add</Button>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave({ ...form, skills })}>Save</Button>
      </div>
    </div>
  );
}

function ToolForm({ data, onSave, onCancel }: { data: any; onSave: (d: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState(data);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Icon Name</Label>
        <Input value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)}>Save</Button>
      </div>
    </div>
  );
}
