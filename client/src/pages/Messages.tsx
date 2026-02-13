import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Mock conversations
const mockConversations = [
  {
    id: 1,
    userId: 2,
    name: "Sophie",
    lastMessage: "Salut! Comment ça va?",
    timestamp: "2 min",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
  },
  {
    id: 2,
    userId: 3,
    name: "Emma",
    lastMessage: "J'aimerais bien te rencontrer!",
    timestamp: "1 h",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
];

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const sendMessage = trpc.messaging.sendMessage.useMutation();

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      const conversation = mockConversations.find((c) => c.id === selectedConversation);
      await sendMessage.mutateAsync({
        recipientId: conversation?.userId || 0,
        content: messageText,
      });
      setMessageText("");
      toast.success("Message envoyé");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 h-96">
          {/* Conversations List */}
          <Card className="border-slate-200 dark:border-slate-800 md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockConversations.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Aucune conversation
                </p>
              ) : (
                mockConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConversation === conv.id
                        ? "bg-red-100 dark:bg-red-900/30"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{conv.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="border-slate-200 dark:border-slate-800 md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b border-slate-200 dark:border-slate-800">
                  <CardTitle>
                    {mockConversations.find((c) => c.id === selectedConversation)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-red-500 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Salut!</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Salut! Comment ça va?</p>
                    </div>
                  </div>
                </CardContent>
                <div className="border-t border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Écrivez un message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim() || sendMessage.isPending}
                      className="gap-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-600 dark:text-slate-400">
                  Sélectionnez une conversation
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
