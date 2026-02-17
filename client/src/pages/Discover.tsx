import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

const mockProfiles = [
  {
    id: 2,
    name: "Sophie",
    age: 26,
    location: "Paris",
    bio: "Passionnée par les voyages et la photographie",
    profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Emma",
    age: 24,
    location: "Lyon",
    bio: "Amie de la nature et des aventures en plein air",
    profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Léa",
    age: 28,
    location: "Marseille",
    bio: "Artiste créative cherchant une connexion authentique",
    profilePhotoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export default function Discover() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const likeUser = trpc.matching.like.useMutation();

  const currentProfile = mockProfiles[currentIndex];

  const handleLike = async () => {
    if (!currentProfile) return;
    try {
      await likeUser.mutateAsync({ userId: currentProfile.id });
      toast.success("Vous avez aimé ce profil !");
      setCurrentIndex((prev) => (prev + 1) % mockProfiles.length);
    } catch (error) {
      toast.error("Erreur lors du like");
    }
  };

  const handlePass = () => {
    setCurrentIndex((prev) => (prev + 1) % mockProfiles.length);
  };

  if (!user || !currentProfile) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-clair to-rose-pale py-12">
      <div className="container max-w-md mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 
            className="text-4xl font-bold text-marron-fonce mb-2"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Découvrir
          </h1>
          <p className="text-lg text-marron-fonce/70">
            Trouvez votre match parfait
          </p>
          <p className="text-sm text-marron-fonce/60 mt-2">
            Profil {currentIndex + 1} sur {mockProfiles.length}
          </p>
        </div>

        {/* Profile Card - Variante Rose pâle + Marron */}
        <Card className="overflow-hidden border-4 border-marron-fonce shadow-2xl hover:shadow-2xl transition mb-8 bg-rose-pale">
          <CardContent className="p-0">
            {/* Profile Image */}
            <div className="relative h-96 overflow-hidden bg-gradient-to-br from-marron-fonce/20 to-jaune-or/20">
              <img
                src={currentProfile.profilePhotoUrl}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marron-fonce/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-jaune-or">
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Abril Fatface' }}>
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <p className="text-sm opacity-90">📍 {currentProfile.location}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6 bg-rose-pale">
              <p className="text-marron-fonce mb-6">
                {currentProfile.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handlePass}
                  className="flex-1 gap-2 bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce transition"
                >
                  <X className="w-5 h-5" />
                  Passer
                </Button>
                <Button
                  size="lg"
                  onClick={handleLike}
                  className="flex-1 gap-2 bg-jaune-or text-marron-fonce hover:bg-rose-pale transition"
                  disabled={likeUser.isPending}
                >
                  <Heart className="w-5 h-5 fill-current" />
                  {likeUser.isPending ? "..." : "Aimer"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="border-marron-fonce text-marron-fonce hover:bg-rose-pale"
          >
            Retour au dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
