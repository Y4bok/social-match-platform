import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5C0029] text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Claudine
            </h3>
            <p className="text-sm text-gray-300">
              Le réseau social professionnel dédié aux experts de la distribution.
              Connectez-vous, partagez et développez votre réseau.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-[#F2ED6F] transition-colors">
                    Accueil
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/feed">
                  <a className="text-gray-300 hover:text-[#F2ED6F] transition-colors">
                    Feed
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/discover">
                  <a className="text-gray-300 hover:text-[#F2ED6F] transition-colors">
                    Découvrir
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-[#F2ED6F] transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold mb-4">Informations Légales</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cgu">
                  <a className="text-gray-300 hover:text-[#F2ED6F] transition-colors">
                    Conditions Générales d'Utilisation
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cgv">
                  <a className="text-gray-300 hover:text-[#F2ED6F] transition-colors">
                    Conditions Générales de Vente
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#F2ED6F] transition-colors"
                >
                  Politique de Confidentialité
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#F2ED6F] transition-colors"
                >
                  Mentions Légales
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-300">
          <p>
            © {currentYear} Claudine. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Fait avec <Heart className="w-4 h-4 text-[#F2ED6F] fill-current" /> pour les professionnels de la distribution
          </p>
        </div>
      </div>
    </footer>
  );
}
