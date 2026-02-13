import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Shield, Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Abril Fatface', serif" }}>
              SocialMatch
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/discover">
                  <Button variant="ghost">Découvrir</Button>
                </Link>
              </>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="ghost">Se connecter</Button>
                </a>
                <a href={getLoginUrl()}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    S'inscrire
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 
                className="text-5xl md:text-6xl font-bold text-primary leading-tight"
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                Trouvez votre <span className="text-secondary">connexion</span> parfaite
              </h1>
              <p className="text-xl text-foreground/70" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Une plateforme moderne et sécurisée pour rencontrer des personnes partageant vos intérêts. Authentification 2FA, messagerie instantanée et matching intelligent.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/discover">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                      Commencer à découvrir
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Mon profil
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                      Commencer maintenant
                    </Button>
                  </a>
                  <a href={getLoginUrl()}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      En savoir plus
                    </Button>
                  </a>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <p className="text-sm text-foreground/60">Utilisateurs actifs</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <p className="text-sm text-foreground/60">Matchs créés</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99%</div>
                <p className="text-sm text-foreground/60">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-secondary/30 to-primary/20 rounded-3xl p-12 border border-secondary/30">
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-background/50 backdrop-blur p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Matching intelligent</p>
                    <p className="text-sm text-foreground/60">Trouvez votre personne idéale</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-background/50 backdrop-blur p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Chat en temps réel</p>
                    <p className="text-sm text-foreground/60">Communiquez instantanément</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-background/50 backdrop-blur p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sécurité maximale</p>
                    <p className="text-sm text-foreground/60">Authentification 2FA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary/5 py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-primary mb-4"
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Pourquoi choisir SocialMatch ?
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Une plateforme complète pour rencontrer, discuter et créer des connexions durables
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Matching Intelligent",
                description: "Algorithme de matching basé sur vos préférences et intérêts"
              },
              {
                icon: MessageCircle,
                title: "Messagerie Sécurisée",
                description: "Chat en temps réel avec chiffrement end-to-end"
              },
              {
                icon: Shield,
                title: "Authentification 2FA",
                description: "Protégez votre compte avec la double authentification"
              },
              {
                icon: Sparkles,
                title: "Profils Vérifiés",
                description: "Vérification d'identité pour plus de confiance"
              },
              {
                icon: Heart,
                title: "Système d'Accord",
                description: "Consentement mutuel avant toute interaction"
              },
              {
                icon: MessageCircle,
                title: "Support 24/7",
                description: "Équipe disponible pour vous aider à tout moment"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-border hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-secondary mb-2" />
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-6xl mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 md:p-16 text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            Prêt à trouver votre match ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà trouvé leur connexion parfaite
          </p>
          {!isAuthenticated && (
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary">
                Commencer gratuitement
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-primary fill-primary" />
                <span className="font-bold text-primary" style={{ fontFamily: "'Abril Fatface', serif" }}>
                  SocialMatch
                </span>
              </div>
              <p className="text-sm text-foreground/60">
                Trouvez votre connexion parfaite
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-primary">Tarifs</a></li>
                <li><a href="#" className="hover:text-primary">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary">À propos</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary">Conditions</a></li>
                <li><a href="#" className="hover:text-primary">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
            <p>&copy; 2026 SocialMatch. Tous droits réservés.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">Twitter</a>
              <a href="#" className="hover:text-primary">Instagram</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
