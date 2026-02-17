import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Shield, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-beige-clair">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-beige-clair border-b border-rose-pale shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 fill-marron-fonce text-marron-fonce" />
            <h1 className="text-2xl font-bold text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
              SocialMatch
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-marron-fonce hover:text-jaune-or transition">Accueil</a>
            <a href="/cgv" className="text-marron-fonce hover:text-jaune-or transition">CGV</a>
            <a href="/cgu" className="text-marron-fonce hover:text-jaune-or transition">CGU</a>
            <a href="/contact" className="text-marron-fonce hover:text-jaune-or transition">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="border-marron-fonce text-marron-fonce hover:bg-rose-pale"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <Button
                onClick={() => window.location.href = getLoginUrl()}
                className="bg-marron-fonce text-jaune-or hover:bg-rose-pale hover:text-marron-fonce transition"
              >
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - Variante 1: Beige + Noir + Jaune */}
      <section className="py-20 px-4 bg-gradient-to-br from-beige-clair to-rose-pale">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
            Trouvez votre <span className="text-jaune-or">connexion</span> parfaite
          </h2>
          <p className="text-xl text-marron-fonce mb-8 font-nunito">
            Une plateforme moderne et sécurisée pour rencontrer des personnes partageant vos intérêts. 
            Authentification 2FA, messagerie instantanée et matching intelligent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = getLoginUrl()}
              className="bg-marron-fonce text-jaune-or hover:bg-rose-pale hover:text-marron-fonce px-8 py-6 text-lg transition"
            >
              Commencer à découvrir
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/contact")}
              className="border-2 border-marron-fonce text-marron-fonce hover:bg-rose-pale px-8 py-6 text-lg"
            >
              En savoir plus
            </Button>
          </div>

          {/* Stats - Variante 2: Marron + Jaune */}
          <div className="grid grid-cols-3 gap-4 mt-16">
            <div className="bg-marron-fonce text-jaune-or p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-sm">Utilisateurs actifs</div>
            </div>
            <div className="bg-marron-fonce text-jaune-or p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-sm">Matchs créés</div>
            </div>
            <div className="bg-marron-fonce text-jaune-or p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Variante 3: Rose pâle + Marron */}
      <section className="py-20 px-4 bg-beige-clair">
        <div className="container max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
            Nos Fonctionnalités
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-rose-pale p-6 rounded-lg border-2 border-marron-fonce hover:shadow-lg transition">
              <Heart className="w-12 h-12 text-marron-fonce mb-4" />
              <h4 className="text-xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Matching Intelligent
              </h4>
              <p className="text-marron-fonce text-sm">
                Trouvez votre personne idéale avec notre système de matching avancé
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-rose-pale p-6 rounded-lg border-2 border-marron-fonce hover:shadow-lg transition">
              <MessageCircle className="w-12 h-12 text-marron-fonce mb-4" />
              <h4 className="text-xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Chat en Temps Réel
              </h4>
              <p className="text-marron-fonce text-sm">
                Communiquez instantanément avec vos matchs
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-rose-pale p-6 rounded-lg border-2 border-marron-fonce hover:shadow-lg transition">
              <Shield className="w-12 h-12 text-marron-fonce mb-4" />
              <h4 className="text-xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Sécurité Maximale
              </h4>
              <p className="text-marron-fonce text-sm">
                Authentification 2FA et protection de vos données
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-rose-pale p-6 rounded-lg border-2 border-marron-fonce hover:shadow-lg transition">
              <Zap className="w-12 h-12 text-marron-fonce mb-4" />
              <h4 className="text-xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Expérience Rapide
              </h4>
              <p className="text-marron-fonce text-sm">
                Interface fluide et intuitive pour une meilleure expérience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Variante 4: Marron + Jaune */}
      <section className="py-20 px-4 bg-gradient-to-r from-marron-fonce to-marron-fonce">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-jaune-or" style={{ fontFamily: 'Abril Fatface' }}>
            Témoignages
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-jaune-or p-8 rounded-lg">
              <p className="text-marron-fonce mb-4 italic">
                "SocialMatch m'a permis de rencontrer quelqu'un d'incroyable. L'interface est simple et sécurisée!"
              </p>
              <div className="font-bold text-marron-fonce">Marie D.</div>
            </div>
            <div className="bg-jaune-or p-8 rounded-lg">
              <p className="text-marron-fonce mb-4 italic">
                "J'aime la sécurité avec la 2FA et la messagerie instantanée. Vraiment une plateforme de qualité."
              </p>
              <div className="font-bold text-marron-fonce">Jean P.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Variante 5: Beige + Marron + Jaune */}
      <section className="py-20 px-4 bg-beige-clair border-t-4 border-marron-fonce">
        <div className="container max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>
            Prêt à trouver votre match ?
          </h3>
          <p className="text-lg text-marron-fonce mb-8">
            Rejoignez des milliers d'utilisateurs qui ont déjà trouvé leur connexion parfaite.
          </p>
          <Button
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-marron-fonce text-jaune-or hover:bg-rose-pale hover:text-marron-fonce px-12 py-6 text-lg transition"
          >
            Créer mon compte maintenant
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-marron-fonce text-jaune-or py-12 px-4">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4" style={{ fontFamily: 'Abril Fatface' }}>SocialMatch</h4>
              <p className="text-sm">Votre plateforme de rencontre sécurisée et moderne.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ fontFamily: 'Abril Fatface' }}>Liens</h4>
              <ul className="text-sm space-y-2">
                <li><a href="/cgv" className="hover:underline">CGV</a></li>
                <li><a href="/cgu" className="hover:underline">CGU</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ fontFamily: 'Abril Fatface' }}>Suivez-nous</h4>
              <div className="flex gap-4 text-sm">
                <a href="#" className="hover:underline">Facebook</a>
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-jaune-or pt-8 text-center text-sm">
            <p>&copy; 2026 SocialMatch. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
