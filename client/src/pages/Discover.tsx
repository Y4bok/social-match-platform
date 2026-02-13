import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Mock profiles for demonstration
const mockProfiles = [
  {
    id: 2,
    name: "Sophie",
    age: 26,
    location: "Paris",
    bio: "Amoureuse de voyages et de bonne gastronomie",
    profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Emma",
    age: 24,
    location: "Lyon",
    bio: "Passionnée par l'art et la photographie",
    profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Léa",
    age: 27,
    location: "Marseille",
    bio: "Sportive et aventurière",
    profilePhotoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export default function Discover() {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const likeUser = trpc.matching.like.useMutation();

  const currentProfile = mockProfiles[currentIndex];

  const handleLike = async () => {
    if (!currentProfile) return;

    try {
      const result = await likeUser.mutateAsync({ userId: currentProfile.id });
      if (result.matched) {
        toast.success(`Vous avez matché avec ${currentProfile.name}!`);
      } else {
        toast.success(`Vous aimez ${currentProfile.name}`);
      }
      nextProfile();
    } catch (error) {
      toast.error("Erreur lors du like");
    }
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.info("Vous avez vu tous les profils!");
      setCurrentIndex(0);
    }
  };

  if (!user || !currentProfile) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container max-w-md mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Découvrir
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Trouvez votre match parfait
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl">
          <CardContent className="p-0">
            {/* Profile Image */}
            <div className="relative h-96 overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={currentProfile.profilePhotoUrl}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <p className="text-sm opacity-90">{currentProfile.location}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {currentProfile.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePass}
                  className="flex-1 gap-2"
                  disabled={likeUser.isPending}
                >
                  <X className="w-5 h-5" />
                  Passer
                </Button>
                <Button
                  size="lg"
                  onClick={handleLike}
                  className="flex-1 gap-2 bg-red-500 hover:bg-red-600"
                  disabled={likeUser.isPending}
                >
                  <Heart className="w-5 h-5" />
                  {likeUser.isPending ? "..." : "Aimer"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Profil {currentIndex + 1} sur {mockProfiles.length}
        </div>
      </div>
    </div>
  );
}
