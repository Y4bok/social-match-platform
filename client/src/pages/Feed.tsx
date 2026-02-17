import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, Search } from "lucide-react";

export default function Feed() {
  const { user } = useAuth();
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
    <div className="min-h-screen bg-beige-clair">
      {/* Header */}
      <div className="bg-marron-fonce text-jaune-or shadow-lg border-b-4 border-jaune-or sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Abril Fatface' }}>
              ❤️ Claudine
            </h1>
            <div className="flex gap-4">
              <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
              <a href="/groups" className="hover:text-white transition">Groupes</a>
              <a href="/messages" className="hover:text-white transition">Messages</a>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-marron-fonce" size={20} />
            <input
              type="text"
              placeholder="Rechercher des posts, des personnes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-marron-fonce"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <Card className="bg-white border-2 border-marron-fonce p-6 mb-8">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-marron-fonce text-jaune-or flex items-center justify-center font-bold">
                  {user?.name?.substring(0, 2).toUpperCase() || "VD"}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Partagez vos insights sur la distribution..."
                    className="w-full p-3 border-2 border-rose-pale rounded-lg focus:outline-none focus:border-marron-fonce resize-none"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-marron-fonce text-marron-fonce">
                  Ajouter une image
                </Button>
                <Button
                  className="bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce"
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                >
                  Publier
                </Button>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-white border-2 border-marron-fonce p-6 hover:shadow-lg transition">
                  {/* Post Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-marron-fonce text-jaune-or flex items-center justify-center font-bold">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-marron-fonce">{post.author}</h3>
                      <p className="text-sm text-marron-fonce/70">{post.title}</p>
                      <p className="text-xs text-marron-fonce/50">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-marron-fonce mb-4">{post.content}</p>

                  {post.image && (
                    <img src={post.image} alt="Post" className="w-full rounded-lg mb-4" />
                  )}

                  {/* Post Stats */}
                  <div className="flex gap-4 text-sm text-marron-fonce/70 mb-4 pb-4 border-b-2 border-rose-pale">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} commentaires</span>
                    <span>{post.shares} partages</span>
                  </div>

                  {/* Post Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                        post.liked
                          ? "bg-marron-fonce text-jaune-or"
                          : "hover:bg-rose-pale text-marron-fonce"
                      }`}
                    >
                      <Heart size={20} fill={post.liked ? "currentColor" : "none"} />
                      <span>J'aime</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-rose-pale text-marron-fonce transition">
                      <MessageCircle size={20} />
                      <span>Commenter</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-rose-pale text-marron-fonce transition">
                      <Share2 size={20} />
                      <span>Partager</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <Card className="bg-white border-2 border-marron-fonce p-6">
              <h3 className="text-xl font-bold text-marron-fonce mb-4" style={{ fontFamily: 'Abril Fatface' }}>
                Tendances
              </h3>
              <div className="space-y-3">
                <div className="hover:bg-rose-pale p-2 rounded cursor-pointer transition">
                  <p className="font-bold text-marron-fonce">#LogistiqueUrbaine</p>
                  <p className="text-sm text-marron-fonce/70">2.5K posts</p>
                </div>
                <div className="hover:bg-rose-pale p-2 rounded cursor-pointer transition">
                  <p className="font-bold text-marron-fonce">#SupplyChain2026</p>
                  <p className="text-sm text-marron-fonce/70">1.8K posts</p>
                </div>
                <div className="hover:bg-rose-pale p-2 rounded cursor-pointer transition">
                  <p className="font-bold text-marron-fonce">#Automatisation</p>
                  <p className="text-sm text-marron-fonce/70">1.2K posts</p>
                </div>
              </div>
            </Card>

            {/* Suggested Users */}
            <Card className="bg-white border-2 border-marron-fonce p-6">
              <h3 className="text-xl font-bold text-marron-fonce mb-4" style={{ fontFamily: 'Abril Fatface' }}>
                À suivre
              </h3>
              <div className="space-y-3">
                {["Pierre Leclerc", "Isabelle Moreau", "Thomas Renaud"].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-marron-fonce text-jaune-or flex items-center justify-center text-sm font-bold">
                        {name.substring(0, 1)}
                      </div>
                      <span className="text-sm font-bold text-marron-fonce">{name}</span>
                    </div>
                    <Button size="sm" className="bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce">
                      Suivre
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
