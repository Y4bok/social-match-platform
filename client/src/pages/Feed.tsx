import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";

export default function Feed() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Marie Dupont",
      title: "Directrice Logistique",
      avatar: "MD",
      content: "Les tendances du e-commerce en 2026 : optimisation des chaînes d'approvisionnement et automatisation. Qu'en pensez-vous ?",
      image: null,
      likes: 245,
      comments: 32,
      shares: 18,
      liked: false,
      timestamp: "Il y a 2 heures"
    },
    {
      id: 2,
      author: "Jean Martin",
      title: "Responsable Distribution",
      avatar: "JM",
      content: "Heureux d'annoncer que notre équipe a remporté le prix de l'excellence en logistique ! Merci à tous nos partenaires.",
      image: null,
      likes: 512,
      comments: 67,
      shares: 89,
      liked: false,
      timestamp: "Il y a 5 heures"
    },
    {
      id: 3,
      author: "Sophie Bernard",
      title: "Experte Supply Chain",
      avatar: "SB",
      content: "Nouveau webinaire : Les défis de la dernière livraison en zone urbaine. Inscrivez-vous gratuitement !",
      image: null,
      likes: 178,
      comments: 24,
      shares: 45,
      liked: false,
      timestamp: "Il y a 1 jour"
    }
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: user?.name || "Vous",
        title: "Professionnel de la distribution",
        avatar: user?.name?.substring(0, 2).toUpperCase() || "VD",
        content: newPost,
        image: null,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        timestamp: "À l'instant"
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-8">
            <h1
              className="text-4xl font-bold text-[#5C0029] mb-2"
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Fil d'Actualités
            </h1>
            <p className="text-gray-700">
              Partagez vos idées et restez informé des dernières actualités de la distribution
            </p>
          </div>

          {/* Create Post Card */}
          <Card className="p-6 mb-6 border-[#F3E8EE]">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center text-white font-bold flex-shrink-0">
                {user?.name?.substring(0, 2).toUpperCase() || "VD"}
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Partagez vos idées avec la communauté..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-3 min-h-[100px] border-[#F3E8EE] focus:border-[#5C0029]"
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#5C0029] text-[#5C0029] hover:bg-[#F3E8EE]"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Ajouter une image
                  </Button>
                  <Button
                    onClick={handlePostSubmit}
                    disabled={!newPost.trim()}
                    className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publier
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 border-[#F3E8EE] hover:shadow-lg transition-shadow">
                {/* Post Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#5C0029] text-lg">{post.author}</h3>
                    <p className="text-sm text-gray-600">{post.title}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="mt-4 rounded-lg w-full object-cover max-h-96"
                    />
                  )}
                </div>

                {/* Post Stats */}
                <div className="flex items-center gap-6 py-3 border-t border-b border-gray-200 text-sm text-gray-600 mb-3">
                  <span>{post.likes} j'aime</span>
                  <span>{post.comments} commentaires</span>
                  <span>{post.shares} partages</span>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={`flex-1 ${
                      post.liked
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-700 hover:text-[#5C0029]"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${post.liked ? "fill-current" : ""}`}
                    />
                    J'aime
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-700 hover:text-[#5C0029]"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Commenter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-700 hover:text-[#5C0029]"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Partager
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white"
            >
              Charger plus de publications
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
