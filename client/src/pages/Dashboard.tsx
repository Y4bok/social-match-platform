import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Settings, Users } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { data: profile } = trpc.profile.get.useQuery();
  const { data: twoFAStatus } = trpc.auth.get2FAStatus.useQuery();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-clair">
        <div className="text-center">
          <p className="text-marron-fonce text-xl mb-4">Veuillez vous connecter</p>
          <Button className="bg-marron-fonce text-jaune-or">Connexion</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-clair">
      {/* Header - Variante Marron + Jaune */}
      <header className="bg-marron-fonce text-jaune-or py-6 px-4 shadow-lg border-b-4 border-jaune-or">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Abril Fatface' }}>
              Bienvenue, {user.name || 'Utilisateur'}!
            </h1>
            <p className="text-jaune-or/80">Tableau de bord SocialMatch</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/profile/edit")}
              className="bg-jaune-or text-marron-fonce hover:bg-rose-pale"
            >
              Mon Profil
            </Button>
            <Button
              onClick={() => logout()}
              variant="outline"
              className="border-jaune-or text-jaune-or hover:bg-jaune-or hover:text-marron-fonce"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Stat 1 - Variante Rose pâle + Marron */}
          <Card className="bg-rose-pale border-2 border-marron-fonce hover:shadow-lg transition">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-marron-fonce">Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-marron-fonce">
                {profile?.isVerified ? "✓" : "⚠"}
              </div>
              <p className="text-xs text-marron-fonce/70 mt-1">
                {profile?.isVerified ? "Vérifié" : "À vérifier"}
              </p>
            </CardContent>
          </Card>

          {/* Stat 2 - Variante Jaune + Marron */}
          <Card className="bg-jaune-or border-2 border-marron-fonce hover:shadow-lg transition">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-marron-fonce">2FA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-marron-fonce">
                {twoFAStatus?.isEnabled ? "✓" : "✗"}
              </div>
              <p className="text-xs text-marron-fonce/70 mt-1">
                {twoFAStatus?.isEnabled ? "Activé" : "Désactivé"}
              </p>
            </CardContent>
          </Card>

          {/* Stat 3 - Variante Marron + Jaune */}
          <Card className="bg-marron-fonce border-2 border-jaune-or hover:shadow-lg transition">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-jaune-or">Matchs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-jaune-or">0</div>
              <p className="text-xs text-jaune-or/70 mt-1">Actifs</p>
            </CardContent>
          </Card>

          {/* Stat 4 - Variante Beige + Marron */}
          <Card className="bg-beige-clair border-2 border-marron-fonce hover:shadow-lg transition">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-marron-fonce">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-marron-fonce">0</div>
              <p className="text-xs text-marron-fonce/70 mt-1">Non lus</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-marron-fonce mb-6" style={{ fontFamily: 'Abril Fatface' }}>
            Actions Rapides
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              onClick={() => navigate("/discover")}
              className="bg-marron-fonce text-jaune-or hover:bg-rose-pale hover:text-marron-fonce py-6 text-lg transition"
            >
              🔍 Découvrir des profils
            </Button>
            <Button
              onClick={() => navigate("/messages")}
              className="bg-jaune-or text-marron-fonce hover:bg-rose-pale py-6 text-lg transition"
            >
              💬 Mes conversations
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card - Rose pâle */}
          <Card className="bg-rose-pale border-2 border-marron-fonce hover:shadow-lg transition">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-marron-fonce" />
                <CardTitle className="text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
                  Mon Profil
                </CardTitle>
              </div>
              <CardDescription className="text-marron-fonce/70">
                Complétez et mettez à jour votre profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-marron-fonce mb-3">
                Ajoutez une photo, une bio et vos préférences pour améliorer vos matchs
              </p>
              <Button
                onClick={() => navigate("/profile/edit")}
                className="w-full bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce"
              >
                Éditer mon profil
              </Button>
            </CardContent>
          </Card>

          {/* Discover Card - Jaune */}
          <Card className="bg-jaune-or border-2 border-marron-fonce hover:shadow-lg transition">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-marron-fonce" />
                <CardTitle className="text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
                  Découvrir
                </CardTitle>
              </div>
              <CardDescription className="text-marron-fonce/70">
                Trouvez des personnes compatibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-marron-fonce mb-3">
                Explorez les profils et trouvez vos matchs
              </p>
              <Button
                onClick={() => navigate("/discover")}
                className="w-full bg-marron-fonce text-jaune-or hover:bg-rose-pale hover:text-marron-fonce"
              >
                Commencer à découvrir
              </Button>
            </CardContent>
          </Card>

          {/* Messaging Card - Marron + Jaune */}
          <Card className="bg-marron-fonce border-2 border-jaune-or hover:shadow-lg transition">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-jaune-or" />
                <CardTitle className="text-jaune-or" style={{ fontFamily: 'Abril Fatface' }}>
                  Messages
                </CardTitle>
              </div>
              <CardDescription className="text-jaune-or/70">
                Communiquez avec vos matchs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-jaune-or mb-3">
                Discutez en temps réel avec vos connexions
              </p>
              <Button
                onClick={() => navigate("/messages")}
                className="w-full bg-jaune-or text-marron-fonce hover:bg-rose-pale"
              >
                Voir les messages
              </Button>
            </CardContent>
          </Card>

          {/* Security Card - Beige */}
          <Card className="bg-beige-clair border-2 border-marron-fonce hover:shadow-lg transition">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-marron-fonce" />
                <CardTitle className="text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
                  Sécurité
                </CardTitle>
              </div>
              <CardDescription className="text-marron-fonce/70">
                Protégez votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-marron-fonce mb-3">
                Configurez la 2FA et gérez vos paramètres de sécurité
              </p>
              <Button
                variant="outline"
                className="w-full border-marron-fonce text-marron-fonce hover:bg-rose-pale"
              >
                Paramètres de sécurité
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
