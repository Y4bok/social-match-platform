import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Shield, Zap, Users, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 dark:from-background dark:to-accent/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold text-foreground">SocialMatch</span>
          </div>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <Link href="/discover">
                  <Button variant="outline">Découvrir</Button>
                </Link>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/contact">
                  <Button variant="outline">Contact</Button>
                </Link>
                <a href={getLoginUrl()}>
                  <Button variant="outline">Connexion</Button>
                </a>
                <a href={getLoginUrl()}>
                  <Button>S'inscrire</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Trouvez votre <span className="text-accent">connexion</span> parfaite
            </h1>
            <p className="text-xl text-foreground/70">
              Une plateforme moderne et sécurisée pour rencontrer des personnes partageant vos intérêts. Authentification 2FA, messagerie instantanée et matching intelligent.
            </p>
            <div className="flex gap-4 pt-4">
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-foreground">
                  Commencer maintenant
                </Button>
              </a>
              <a href="#features">
                <Button size="lg" variant="outline">
                  En savoir plus
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-accent to-secondary rounded-3xl p-8 text-primary-foreground shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8" />
                  <span className="text-lg font-semibold">Matchs compatibles</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8" />
                  <span className="text-lg font-semibold">Chat en temps réel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8" />
                  <span className="text-lg font-semibold">Sécurité maximale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card dark:bg-card border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-foreground/70">
              Tout ce dont vous avez besoin pour une expérience de rencontre sécurisée et moderne
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Matching Intelligent</CardTitle>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-base text-foreground/60">
                Algorithme de matching basé sur vos préférences et intérêts pour trouver les meilleures connexions.
              </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-secondary mb-2" />
                <CardTitle>Messagerie Instantanée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Communiquez en temps réel avec vos matchs via notre système de chat sécurisé et fluide.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-accent/70 mb-2" />
                <CardTitle>Authentification 2FA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Protégez votre compte avec l'authentification à deux facteurs pour une sécurité maximale.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="w-8 h-8 text-secondary/70 mb-2" />
                <CardTitle>Données Chiffrées</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tous vos messages et données personnelles sont chiffrés et stockés de manière sécurisée.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-accent/60 mb-2" />
                <CardTitle>Profils Vérifiés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Système de vérification des profils pour garantir l'authenticité de chaque utilisateur.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-accent/50 mb-2" />
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Interface rapide et réactive optimisée pour une expérience utilisateur fluide sur tous les appareils.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background/50 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">
            Comment ça marche
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Créer un profil", desc: "Inscrivez-vous et complétez votre profil avec vos informations" },
              { step: 2, title: "Découvrir", desc: "Explorez les profils et trouvez des personnes compatibles" },
              { step: 3, title: "Matcher", desc: "Likez les profils qui vous intéressent et attendez les matchs" },
              { step: 4, title: "Discuter", desc: "Commencez à converser avec vos matchs en temps réel" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-accent text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-secondary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Prêt à trouver votre connexion ?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Rejoignez des milliers d'utilisateurs qui ont trouvé leur match parfait
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-primary-foreground text-accent hover:bg-primary-foreground/90">
              Commencer gratuitement
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-background" />
                <span className="font-bold text-background">SocialMatch</span>
              </div>
              <p className="text-sm text-background/80">La plateforme de rencontre moderne et sécurisée</p>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-background transition">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-background transition">Tarifs</a></li>
                <li><a href="#" className="hover:text-background transition">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-background transition">Conditions</a></li>
                <li><a href="#" className="hover:text-background transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-background transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link href="/contact" className="hover:text-background transition">Support</Link></li>
                <li><a href="#" className="hover:text-background transition">À propos</a></li>
                <li><a href="#" className="hover:text-background transition">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-background/80">
            <p>&copy; 2026 SocialMatch. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
