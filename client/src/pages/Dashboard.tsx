import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Settings, Users } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = trpc.profile.get.useQuery();
  const { data: twoFAStatus } = trpc.auth.get2FAStatus.useQuery();

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bienvenue, {user.name || user.email}!
          </h1>
          <p className="text-foreground/70">
            Gérez votre profil et découvrez de nouvelles connexions
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile?.isVerified ? "✓" : "⚠"}
              </div>
              <p className="text-xs text-foreground/60 mt-1">
                {profile?.isVerified ? "Vérifié" : "À vérifier"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">2FA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {twoFAStatus?.isEnabled ? "✓" : "✗"}
              </div>
              <p className="text-xs text-foreground/60 mt-1">
                {twoFAStatus?.isEnabled ? "Activé" : "Désactivé"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Matchs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-foreground/60 mt-1">
                Actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-foreground/60 mt-1">
                Non lus
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-accent" />
                <CardTitle className="text-foreground">Mon Profil</CardTitle>
              </div>
              <CardDescription>
                Complétez et mettez à jour votre profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {profile?.bio || "Pas de bio ajoutée"}
                </p>
                <Link href="/profile/edit">
                  <Button className="w-full">Modifier le profil</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Discover Card */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-accent" />
                <CardTitle className="text-foreground">Découvrir</CardTitle>
              </div>
              <CardDescription>
                Trouvez des personnes compatibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-3">
                Explorez les profils et trouvez vos matchs
              </p>
              <Link href="/discover">
                <Button className="w-full">Commencer à découvrir</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Messaging Card */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                <CardTitle className="text-foreground">Messages</CardTitle>
              </div>
              <CardDescription>
                Communiquez avec vos matchs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-3">
                Vous n'avez pas encore de conversations
              </p>
              <Link href="/messages">
                <Button className="w-full" variant="outline">Voir les messages</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-accent/70" />
                <CardTitle className="text-foreground">Sécurité</CardTitle>
              </div>
              <CardDescription>
                Gérez vos paramètres de sécurité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-3">
                2FA: {twoFAStatus?.isEnabled ? "Activé" : "Désactivé"}
              </p>
              <Link href="/settings/security">
                <Button className="w-full" variant="outline">Gérer la sécurité</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
