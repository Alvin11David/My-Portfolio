import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function ProjectsList() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete project"),
  });

  const groups = ["Mobile Apps", "Web Apps", "AI Platforms", "Enterprise Systems"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Link to="/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        groups.map((group) => {
          const groupProjects = projects?.filter((p: any) => p.groupName === group) || [];
          if (groupProjects.length === 0) return null;
          return (
            <Card key={group}>
              <CardHeader>
                <CardTitle className="text-lg">{group}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-2 font-medium">Title</th>
                        <th className="pb-2 font-medium">Category</th>
                        <th className="pb-2 font-medium">Year</th>
                        <th className="pb-2 font-medium">URL</th>
                        <th className="pb-2 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupProjects.map((project: any) => (
                        <tr key={project.id} className="border-b last:border-0">
                          <td className="py-3 font-medium">{project.title}</td>
                          <td className="py-3 text-muted-foreground">{project.category}</td>
                          <td className="py-3 text-muted-foreground">{project.year}</td>
                          <td className="py-3">
                            {project.webUrl && (
                              <a href={project.webUrl} target="_blank" rel="noreferrer" className="inline-flex text-muted-foreground hover:text-primary">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end gap-1">
                              <Link to={`/projects/${project.id}/edit`}>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button variant="ghost" size="icon" onClick={() => setDeleteId(project.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
