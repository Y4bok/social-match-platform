import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Users, Zap, Shield, TrendingUp, MessageCircle, Award, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated) {
    navigate("/feed", { replace: true });
    return null;
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5E6D3] via-[#F3E8EE] to-[#F5E6D3]">
        <div className="container mx-auto text-center">
          <h1
            className="text-5xl md:text-7xl font-bold text-[#5C0029] mb-6"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            Bienvenue sur Claudine
          </h1>
          <p className="text-2xl md:text-3xl text-[#5C0029] mb-6" style={{ fontFamily: "'Abril Fatface', serif" }}>
            Le réseau professionnel de la <span className="text-[#F2ED6F] bg-[#5C0029] px-3 py-1 rounded">Distribution</span>
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connectez-vous avec les experts de la distribution. Partagez vos connaissances, développez votre réseau professionnel et trouvez les opportunités qui vous correspondent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
              size="lg"
              className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white text-lg px-8 py-6"
            >
              Rejoindre Claudine
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="outline"
              className="border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white text-lg px-8 py-6"
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2
            className="text-4xl font-bold text-center text-[#5C0029] mb-12"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            Pourquoi Claudine ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-shadow border-[#F3E8EE]">
              <div className="w-14 h-14 rounded-full bg-[#5C0029] flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-[#F2ED6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#5C0029] mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>
                Réseau Professionnel
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Connectez-vous avec des milliers de professionnels de la distribution. Élargissez votre réseau et créez des opportunités.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-[#F3E8EE]">
              <div className="w-14 h-14 rounded-full bg-[#5C0029] flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-[#F2ED6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#5C0029] mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>
                Partage de Connaissances
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Partagez vos expériences, posez des questions et apprenez des meilleurs experts du secteur.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-[#F3E8EE]">
              <div className="w-14 h-14 rounded-full bg-[#5C0029] flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-[#F2ED6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#5C0029] mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>
                Opportunités de Carrière
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Découvrez les dernières opportunités professionnelles et faites évoluer votre carrière dans la distribution.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-[#F3E8EE]">
              <div className="w-14 h-14 rounded-full bg-[#5C0029] flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#F2ED6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#5C0029] mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>
                Sécurité et Confidentialité
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Vos données sont protégées. Nous respectons votre vie privée et garantissons la sécurité de vos informations.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-[#F3E8EE]">
              <div className="w-14 h-14 rounded-full bg-[#5C0029] flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-[#F2ED6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#5C0029] mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>
                Groupes Thématiques
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Rejoignez des groupes spécialisés selon vos intérêts : logistique, retail, e-commerce, supply chain et plus.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-[#F3E8EE]">
              <div className="w-14 h-14 rounded-full bg-[#5C0029] flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-[#F2ED6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#5C0029] mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>
                Expertise Reconnue
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Mettez en avant votre expertise et gagnez en visibilité auprès des acteurs clés de l'industrie.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#5C0029] to-[#5C0029]/90">
        <div className="container mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            Prêt à rejoindre la communauté ?
          </h2>
          <p className="text-xl text-[#F2ED6F] mb-10 max-w-2xl mx-auto">
            Inscrivez-vous gratuitement et commencez à développer votre réseau professionnel dès aujourd'hui.
          </p>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="bg-[#F2ED6F] hover:bg-[#F2ED6F]/90 text-[#5C0029] text-lg px-10 py-6 font-bold"
          >
            Créer mon compte gratuitement
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#5C0029] mb-2" style={{ fontFamily: "'Abril Fatface', serif" }}>
                10K+
              </div>
              <p className="text-lg text-gray-700">Professionnels Actifs</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#5C0029] mb-2" style={{ fontFamily: "'Abril Fatface', serif" }}>
                500+
              </div>
              <p className="text-lg text-gray-700">Entreprises Partenaires</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#5C0029] mb-2" style={{ fontFamily: "'Abril Fatface', serif" }}>
                50+
              </div>
              <p className="text-lg text-gray-700">Groupes Thématiques</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
