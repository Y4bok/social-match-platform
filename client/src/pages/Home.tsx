import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Users, Zap, Shield, TrendingUp, MessageCircle, Award } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-clair via-rose-pale to-beige-clair">
      {/* Navigation */}
      <nav className="bg-marron-fonce text-jaune-or shadow-lg border-b-4 border-jaune-or">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold" style={{ fontFamily: 'Abril Fatface' }}>
            ❤️ Claudine
          </div>
          <div className="flex gap-4">
            <a href="/cgv" className="hover:text-white transition">CGV</a>
            <a href="/cgu" className="hover:text-white transition">CGU</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <a href={getLoginUrl()} className="bg-jaune-or text-marron-fonce px-4 py-2 rounded-lg font-bold hover:bg-white transition">
              Se connecter
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 
            className="text-6xl font-bold text-marron-fonce mb-4"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Claudine
          </h1>
          <p className="text-3xl text-marron-fonce mb-6" style={{ fontFamily: 'Abril Fatface' }}>
            Le réseau professionnel de la <span className="text-jaune-or">Distribution</span>
          </p>
          <p className="text-xl text-marron-fonce mb-8 max-w-2xl mx-auto">
            Connectez-vous avec les experts de la distribution. Partagez vos connaissances, développez votre réseau professionnel et trouvez les opportunités qui vous correspondent.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button 
              className="bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce text-lg px-8 py-6"
              onClick={() => window.location.href = getLoginUrl()}
            >
              Commencer gratuitement
            </Button>
            <Button 
              variant="outline"
              className="border-marron-fonce text-marron-fonce hover:bg-marron-fonce hover:text-jaune-or text-lg px-8 py-6"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              En savoir plus
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-marron-fonce text-jaune-or p-6 border-2 border-jaune-or">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-lg">Professionnels actifs</p>
            </Card>
            <Card className="bg-jaune-or text-marron-fonce p-6 border-2 border-marron-fonce">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-lg">Connexions établies</p>
            </Card>
            <Card className="bg-rose-pale text-marron-fonce p-6 border-2 border-marron-fonce">
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-lg">Satisfaction utilisateurs</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-marron-fonce/5">
        <div className="container mx-auto">
          <h2 
            className="text-5xl font-bold text-marron-fonce text-center mb-16"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Pourquoi choisir Claudine ?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <Users className="w-12 h-12 text-marron-fonce mb-4" />
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Réseau Professionnel
              </h3>
              <p className="text-marron-fonce">
                Connectez-vous avec des milliers de professionnels de la distribution. Élargissez votre réseau et trouvez les bons contacts.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <MessageCircle className="w-12 h-12 text-marron-fonce mb-4" />
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Partage de Contenu
              </h3>
              <p className="text-marron-fonce">
                Publiez vos articles, insights et actualités. Engagez-vous avec la communauté et devenez un leader d'opinion.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <Zap className="w-12 h-12 text-marron-fonce mb-4" />
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Opportunités
              </h3>
              <p className="text-marron-fonce">
                Découvrez des offres d'emploi, des partenariats et des projets exclusifs pour les membres de Claudine.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <TrendingUp className="w-12 h-12 text-marron-fonce mb-4" />
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Croissance Professionnelle
              </h3>
              <p className="text-marron-fonce">
                Améliorez vos compétences, restez informé des tendances et développez votre expertise dans la distribution.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <Shield className="w-12 h-12 text-marron-fonce mb-4" />
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Sécurité & Confidentialité
              </h3>
              <p className="text-marron-fonce">
                Vos données sont protégées avec les plus hauts standards de sécurité. Contrôlez votre vie privée.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <Award className="w-12 h-12 text-marron-fonce mb-4" />
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                Communautés Thématiques
              </h3>
              <p className="text-marron-fonce">
                Rejoignez des groupes spécialisés par secteur, région ou domaine d'expertise pour des discussions ciblées.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-marron-fonce to-marron-fonce/80">
        <div className="container mx-auto text-center">
          <h2 
            className="text-5xl font-bold text-jaune-or mb-6"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Prêt à rejoindre Claudine ?
          </h2>
          <p className="text-xl text-jaune-or mb-8">
            Inscrivez-vous gratuitement et commencez à développer votre réseau professionnel dès aujourd'hui.
          </p>
          <Button 
            className="bg-jaune-or text-marron-fonce hover:bg-white hover:text-marron-fonce text-lg px-8 py-6 font-bold"
            onClick={() => window.location.href = getLoginUrl()}
          >
            S'inscrire maintenant
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-marron-fonce text-jaune-or py-8 border-t-4 border-jaune-or">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4" style={{ fontFamily: 'Abril Fatface' }}>Claudine</h4>
              <p>Le réseau professionnel de la distribution</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="/cgv" className="hover:text-white">CGV</a></li>
                <li><a href="/cgu" className="hover:text-white">CGU</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Aide</a></li>
                <li><a href="#" className="hover:text-white">Communauté</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suivez-nous</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-jaune-or pt-8 text-center">
            <p>&copy; 2026 Claudine. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
