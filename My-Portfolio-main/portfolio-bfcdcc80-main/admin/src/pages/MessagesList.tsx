import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function MessagesList() {
  const queryClient = useQueryClient();
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: api.getMessages,
  });

  const markRead = useMutation({
    mutationFn: (id: number) => api.markMessageRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["messages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete"),
  });

  const openMessage = (msg: any) => {
    setSelectedMsg(msg);
    if (!msg.read) markRead.mutate(msg.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Contact form submissions</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : messages?.length === 0 ? (
        <p className="text-muted-foreground">No messages yet</p>
      ) : (
        <div className="space-y-2">
          {messages?.map((msg: any) => (
            <Card
              key={msg.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 ${!msg.read ? "border-primary/50" : ""}`}
              onClick={() => openMessage(msg)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="shrink-0">
                  {msg.read ? (
                    <MailOpen className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Mail className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${!msg.read ? "text-primary" : ""}`}>
                      {msg.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{msg.email}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); setDeleteId(msg.id); }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedMsg} onOpenChange={() => setSelectedMsg(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMsg?.name}</DialogTitle>
            <DialogDescription>{selectedMsg?.email}</DialogDescription>
          </DialogHeader>
          <div className="text-sm">
            {selectedMsg?.createdAt && (
              <p className="mb-2 text-xs text-muted-foreground">
                {new Date(selectedMsg.createdAt).toLocaleString()}
              </p>
            )}
            <p className="whitespace-pre-wrap">{selectedMsg?.message}</p>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
