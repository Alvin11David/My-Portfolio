import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderKanban, User, BarChart3, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const { data: projects } = useQuery({ queryKey: ["projects"], queryFn: api.getProjects });
  const { data: messages } = useQuery({ queryKey: ["messages"], queryFn: api.getMessages });
  const { data: skills } = useQuery({ queryKey: ["skillCategories"], queryFn: api.getSkillCategories });

  const stats = [
    { label: "Projects", value: projects?.length || 0, icon: FolderKanban, color: "text-blue-500" },
    { label: "Skill Categories", value: skills?.length || 0, icon: BarChart3, color: "text-emerald-500" },
    { label: "Messages", value: messages?.length || 0, icon: MessageSquare, color: "text-amber-500" },
    { label: "Unread", value: messages?.filter((m: any) => !m.read).length || 0, icon: MessageSquare, color: "text-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your portfolio content</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
