import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const mockConversations = [
  {
    id: 1,
    name: "Sophie",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Salut! Comment ça va?",
  },
  {
    id: 2,
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "J'ai adoré ton profil!",
  },
  {
    id: 3,
    name: "Léa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "On se rencontre?",
  },
];

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  if (!user) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 
            className="text-4xl font-bold text-primary mb-2"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            Messages
          </h1>
          <p className="text-lg text-foreground/70">
            Communiquez avec vos matchs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 h-96">
          {/* Conversations List */}
          <Card className="border-border md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedConversation === conv.id
                      ? "bg-secondary/20 border border-secondary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{conv.name}</p>
                      <p className="text-xs text-foreground/60 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="border-border md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-primary">
                    {mockConversations.find((c) => c.id === selectedConversation)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-secondary text-primary rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Salut!</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Salut! Comment ça va?</p>
                    </div>
                  </div>
                </CardContent>
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Écrivez un message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      className="bg-secondary hover:bg-secondary/90 text-primary"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-foreground/60">
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
