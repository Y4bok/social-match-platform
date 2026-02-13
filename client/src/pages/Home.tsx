import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Shield, Zap, Users, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">SocialMatch</span>
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
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Trouvez votre <span className="text-red-500">connexion</span> parfaite
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Une plateforme moderne et sécurisée pour rencontrer des personnes partageant vos intérêts. Authentification 2FA, messagerie instantanée et matching intelligent.
            </p>
            <div className="flex gap-4 pt-4">
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-red-500 hover:bg-red-600">
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
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
      <section id="features" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Tout ce dont vous avez besoin pour une expérience de rencontre sécurisée et moderne
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Matching Intelligent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Algorithme de matching basé sur vos préférences et intérêts pour trouver les meilleures connexions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Messagerie Instantanée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Communiquez en temps réel avec vos matchs via notre système de chat sécurisé et fluide.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Authentification 2FA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Protégez votre compte avec l'authentification à deux facteurs pour une sécurité maximale.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Données Chiffrées</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tous vos messages et données personnelles sont chiffrés et stockés de manière sécurisée.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle>Profils Vérifiés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Système de vérification des profils pour garantir l'authenticité de chaque utilisateur.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
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
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">
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
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à trouver votre connexion ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui ont trouvé leur match parfait
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-white text-red-500 hover:bg-slate-100">
              Commencer gratuitement
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-bold text-white">SocialMatch</span>
              </div>
              <p className="text-sm">La plateforme de rencontre moderne et sécurisée</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Conditions</a></li>
                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white transition">Support</Link></li>
                <li><a href="#" className="hover:text-white transition">À propos</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 SocialMatch. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
