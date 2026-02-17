import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

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
  const [, navigate] = useLocation();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  if (!user) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-clair to-rose-pale py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header - Variante Marron + Jaune */}
        <div className="mb-8 bg-marron-fonce text-jaune-or p-6 rounded-lg border-2 border-jaune-or">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Messages
          </h1>
          <p className="text-lg">
            Communiquez avec vos matchs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 h-96">
          {/* Conversations List - Variante Rose pâle */}
          <Card className="border-4 border-marron-fonce bg-rose-pale md:col-span-1">
            <CardHeader className="bg-marron-fonce text-jaune-or border-b-2 border-marron-fonce">
              <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'Abril Fatface' }}>
                <MessageCircle className="w-5 h-5" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full text-left p-3 transition-colors border-b border-marron-fonce/20 ${
                    selectedConversation === conv.id
                      ? "bg-marron-fonce text-jaune-or"
                      : "hover:bg-marron-fonce/10 text-marron-fonce"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full border-2 border-marron-fonce"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{conv.name}</p>
                      <p className="text-xs opacity-70 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Chat Area - Variante Jaune + Marron */}
          <Card className="border-4 border-marron-fonce bg-jaune-or md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b-2 border-marron-fonce bg-marron-fonce text-jaune-or">
                  <CardTitle style={{ fontFamily: 'Abril Fatface' }}>
                    {mockConversations.find((c) => c.id === selectedConversation)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-jaune-or to-jaune-or/80">
                  {/* Message Sent */}
                  <div className="flex justify-end">
                    <div className="bg-rose-pale text-marron-fonce rounded-lg p-3 max-w-xs border-2 border-marron-fonce">
                      <p className="text-sm">Salut!</p>
                      <p className="text-xs opacity-70 mt-1">14:30</p>
                    </div>
                  </div>
                  {/* Message Received */}
                  <div className="flex justify-start">
                    <div className="bg-marron-fonce text-jaune-or rounded-lg p-3 max-w-xs border-2 border-marron-fonce">
                      <p className="text-sm">Salut! Comment ça va?</p>
                      <p className="text-xs opacity-70 mt-1">14:32</p>
                    </div>
                  </div>
                </CardContent>
                <div className="border-t-2 border-marron-fonce p-4 bg-jaune-or">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Écrivez un message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 bg-white border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50"
                    />
                    <Button
                      size="icon"
                      className="bg-marron-fonce text-jaune-or hover:bg-rose-pale hover:text-marron-fonce"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-marron-fonce/60 text-lg" style={{ fontFamily: 'Abril Fatface' }}>
                  Sélectionnez une conversation
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce"
          >
            Retour au dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
