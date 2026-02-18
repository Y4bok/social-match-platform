import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, MoreVertical } from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const [conversations] = useState([
    {
      id: 1,
      name: "Marie Dupont",
      avatar: "MD",
      lastMessage: "Merci pour votre retour sur le projet !",
      timestamp: "Il y a 5 min",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Jean Martin",
      avatar: "JM",
      lastMessage: "On se voit demain pour la réunion ?",
      timestamp: "Il y a 1h",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Sophie Bernard",
      avatar: "SB",
      lastMessage: "J'ai envoyé les documents",
      timestamp: "Il y a 3h",
      unread: 1,
      online: true,
    },
  ]);

  const [messages] = useState([
    {
      id: 1,
      senderId: 1,
      senderName: "Marie Dupont",
      content: "Bonjour ! J'ai vu votre profil et j'aimerais discuter d'une opportunité.",
      timestamp: "10:30",
      isMe: false,
    },
    {
      id: 2,
      senderId: user?.id || 0,
      senderName: user?.name || "Vous",
      content: "Bonjour Marie ! Avec plaisir, de quoi s'agit-il ?",
      timestamp: "10:35",
      isMe: true,
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Marie Dupont",
      content: "Nous cherchons un expert en logistique pour un projet innovant.",
      timestamp: "10:40",
      isMe: false,
    },
  ]);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <h1
              className="text-4xl font-bold text-[#5C0029] mb-2"
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Messagerie
            </h1>
            <p className="text-gray-700">Échangez avec votre réseau professionnel</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 border-[#F3E8EE] overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-[#F3E8EE] focus:border-[#5C0029] text-sm"
                  />
                </div>
              </div>

              <div className="overflow-y-auto max-h-[600px]">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                      selectedConversation === conv.id ? "bg-[#F3E8EE]" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center text-white font-bold">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-[#5C0029] truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-[#5C0029] text-white text-xs rounded-full flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="lg:col-span-2 border-[#F3E8EE] flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center text-white font-bold">
                        MD
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#5C0029]">Marie Dupont</h3>
                        <p className="text-xs text-green-500">En ligne</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </Button>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto max-h-[400px] space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] ${
                            message.isMe ? "bg-[#5C0029] text-white" : "bg-gray-100 text-gray-800"
                          } rounded-lg p-3`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isMe ? "text-[#F2ED6F]" : "text-gray-500"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Écrivez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 min-h-[60px] max-h-[120px] border-[#F3E8EE] focus:border-[#5C0029] resize-none"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white self-end"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <p>Sélectionnez une conversation pour commencer</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
