import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Settings, Users } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = trpc.profile.get.useQuery();
  const { data: twoFAStatus } = trpc.auth.get2FAStatus.useQuery();

  if (!user) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: "'Abril Fatface', serif" }}>
            Bienvenue, {user.name || user.email}!
          </h1>
          <p className="text-lg text-foreground/70">
            Gérez votre profil et découvrez de nouvelles connexions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {profile?.isVerified ? "✓" : "⚠"}
              </div>
              <p className="text-xs text-foreground/60 mt-1">
                {profile?.isVerified ? "Vérifié" : "À vérifier"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">2FA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {twoFAStatus?.isEnabled ? "✓" : "✗"}
              </div>
              <p className="text-xs text-foreground/60 mt-1">
                {twoFAStatus?.isEnabled ? "Activé" : "Désactivé"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">Matchs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0</div>
              <p className="text-xs text-foreground/60 mt-1">Actifs</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0</div>
              <p className="text-xs text-foreground/60 mt-1">Non lus</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="border-border hover:border-secondary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-secondary" />
                <CardTitle className="text-primary">Mon Profil</CardTitle>
              </div>
              <CardDescription>
                Complétez et mettez à jour votre profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-3">
                Ajoutez une photo, une bio et vos préférences pour améliorer vos matchs
              </p>
              <Link href="/profile-edit">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Éditer mon profil
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Discover Card */}
          <Card className="border-border hover:border-secondary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-secondary" />
                <CardTitle className="text-primary">Découvrir</CardTitle>
              </div>
              <CardDescription>
                Trouvez des personnes compatibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-3">
                Explorez les profils et trouvez vos matchs
              </p>
              <Link href="/discover">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary">
                  Commencer à découvrir
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Messaging Card */}
          <Card className="border-border hover:border-secondary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                <CardTitle className="text-primary">Messages</CardTitle>
              </div>
              <CardDescription>
                Communiquez avec vos matchs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-3">
                Discutez en temps réel avec vos connexions
              </p>
              <Link href="/messages">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Voir les messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-border hover:border-secondary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-secondary" />
                <CardTitle className="text-primary">Sécurité</CardTitle>
              </div>
              <CardDescription>
                Protégez votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-3">
                Configurez la 2FA et gérez vos paramètres de sécurité
              </p>
              <Button variant="outline" className="w-full">
                Paramètres de sécurité
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
