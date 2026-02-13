import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function CGV() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3E8EE] via-[#F5E6D3] to-[#F2ED6F]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#5C0029]/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-[#5C0029] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">❤️</span>
            </div>
            <span className="font-abril text-2xl font-bold text-[#5C0029]">SocialMatch</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-[#5C0029] hover:text-[#F2ED6F] transition">
              Accueil
            </button>
            <button onClick={() => navigate("/contact")} className="text-[#5C0029] hover:text-[#F2ED6F] transition">
              Contact
            </button>
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")} className="bg-[#5C0029] hover:bg-[#5C0029]/90">
                Dashboard
              </Button>
            ) : (
              <Button asChild className="bg-[#5C0029] hover:bg-[#5C0029]/90">
                <a href={getLoginUrl()}>Se connecter</a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="font-abril text-4xl md:text-5xl text-[#5C0029] mb-2">Conditions Générales de Vente</h1>
          <p className="text-[#5C0029]/60 text-sm mb-8">Dernière mise à jour : 13 février 2026</p>

          <div className="space-y-8 text-[#5C0029]/80 font-nunito">
            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent l'utilisation de la plateforme SocialMatch et des services proposés. En accédant à notre plateforme, vous acceptez sans réserve les présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">2. Services Proposés</h2>
              <p>
                SocialMatch est une plateforme de rencontre permettant aux utilisateurs de :
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Créer un profil personnel</li>
                <li>Consulter les profils d'autres utilisateurs</li>
                <li>Exprimer leur intérêt via le système de "like"</li>
                <li>Communiquer avec les utilisateurs matchés</li>
                <li>Gérer leurs préférences et paramètres de confidentialité</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">3. Inscription et Compte Utilisateur</h2>
              <p>
                Pour utiliser SocialMatch, vous devez créer un compte en fournissant des informations exactes et à jour. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.
              </p>
              <p className="mt-3">
                Vous acceptez de ne pas créer plusieurs comptes ou d'usurper l'identité d'une autre personne. Nous nous réservons le droit de supprimer tout compte jugé frauduleux ou contraire à nos conditions.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">4. Comportement Attendu</h2>
              <p>
                En utilisant SocialMatch, vous vous engagez à :
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Respecter les autres utilisateurs et ne pas les harceler</li>
                <li>Ne pas poster de contenu offensant, discriminatoire ou illégal</li>
                <li>Ne pas utiliser la plateforme à des fins commerciales ou de spam</li>
                <li>Respecter les droits d'auteur et la propriété intellectuelle</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">5. Modération et Suppression de Contenu</h2>
              <p>
                SocialMatch se réserve le droit de modérer, modifier ou supprimer tout contenu jugé contraire à ces conditions. Les utilisateurs contrevenants peuvent être avertis, suspendus ou bannis définitivement.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">6. Limitation de Responsabilité</h2>
              <p>
                SocialMatch n'est pas responsable des interactions entre utilisateurs après leur rencontre sur la plateforme. Nous ne garantissons pas que les utilisateurs fourniront des informations exactes ou que les rencontres seront satisfaisantes.
              </p>
              <p className="mt-3">
                La plateforme est fournie "en l'état" sans garantie d'aucune sorte, explicite ou implicite.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">7. Propriété Intellectuelle</h2>
              <p>
                Tous les contenus de SocialMatch (textes, images, logos, design) sont la propriété exclusive de SocialMatch ou de ses partenaires. Toute reproduction ou utilisation sans autorisation est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">8. Données Personnelles</h2>
              <p>
                L'utilisation de vos données personnelles est régie par notre Politique de Confidentialité. En utilisant SocialMatch, vous consentez à la collecte et au traitement de vos données selon nos conditions.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">9. Modifications des Conditions</h2>
              <p>
                SocialMatch se réserve le droit de modifier ces conditions à tout moment. Les modifications seront notifiées aux utilisateurs et entreront en vigueur après publication.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">10. Droit Applicable</h2>
              <p>
                Ces conditions sont régies par la loi française. Tout litige sera soumis aux tribunaux compétents de France.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">11. Contact</h2>
              <p>
                Pour toute question concernant ces CGV, veuillez nous contacter via notre formulaire de contact ou à l'adresse email : contact@socialmatch.fr
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#5C0029]/10">
            <Button
              onClick={() => navigate("/")}
              className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white font-nunito"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#5C0029] text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2026 SocialMatch. Tous droits réservés.</p>
          <div className="mt-4 flex justify-center gap-6">
            <button onClick={() => navigate("/cgu")} className="hover:text-[#F2ED6F] transition">
              CGU
            </button>
            <button onClick={() => navigate("/cgv")} className="hover:text-[#F2ED6F] transition">
              CGV
            </button>
            <button onClick={() => navigate("/contact")} className="hover:text-[#F2ED6F] transition">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
