import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-7xl font-['Abril_Fatface'] text-[#C1502E] mb-6">
              Claudine
            </h1>
            <p className="text-2xl text-[#C1502E] mb-8 font-['Nunito']">
              Accédez aux profils des<br />
              employés d'autres enseignes.
            </p>
            <Button
              asChild
              className="bg-transparent border-2 border-[#C1502E] text-[#C1502E] hover:bg-[#C1502E] hover:text-white text-lg px-8 py-6 font-['Nunito']"
            >
              <a href={getLoginUrl()}>Inscrivez vous !</a>
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/rsNfalXJByqSJiBD.png"
              alt="Mobile app"
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Inscription Section */}
      <section className="bg-[#5C0029] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-['Abril_Fatface'] text-white mb-8">
            Inscrivez-vous gratuitement
          </h2>
        </div>
      </section>

      {/* Comment ça marche Section */}
      <section className="bg-[#D97652] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/awvtAIRbdJvZegCQ.png"
                alt="Comment ça marche"
                className="w-96 h-96 rounded-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-5xl font-['Abril_Fatface'] mb-8">
                Comment ça<br />marche ?
              </h2>
              <div className="space-y-4 text-xl font-['Nunito']">
                <p>Crée ton profil en quelques secondes :</p>
                <p>Ton prénom (ou un pseudo)</p>
                <p>L'enseigne où tu travailles</p>
                <p>Le pourcentage de ta réduction employé</p>
                <p className="font-bold">Les enseignes qui t'intéressent</p>
              </div>
              <Button
                asChild
                className="mt-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#D97652] text-lg px-8 py-6 font-['Nunito']"
              >
                <a href={getLoginUrl()}>Inscrivez vous !</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mise en relation Section */}
      <section className="bg-[#E6A896] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-['Abril_Fatface'] mb-6">
                Mise en<br />relation
              </h2>
              <p className="text-xl font-['Nunito'] mb-4">
                Nous trouvons le membre de l'enseigne<br />
                qui vous intéresse et nous vous mettons<br />
                en relation.
              </p>
              <p className="text-xl font-['Nunito'] font-bold">
                Vous discutez entre vous !
              </p>
              <Button
                asChild
                className="mt-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#E6A896] text-lg px-8 py-6 font-['Nunito']"
              >
                <a href={getLoginUrl()}>Inscrivez vous !</a>
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/kJpDHMZgHzLfZUTt.png"
                alt="It's a deal"
                className="w-full max-w-md rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rencontre Section */}
      <section className="bg-[#C1502E] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/kJpDHMZgHzLfZUTt.png"
                alt="Rencontre"
                className="w-96 h-96 rounded-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-5xl font-['Abril_Fatface'] mb-6">
                Rencontre
              </h2>
              <p className="text-xl font-['Nunito'] mb-4">
                Les échanges se font directement en<br />
                <span className="font-bold">boutique</span> : chaque membre se déplace<br />
                dans l'enseigne de l'autre.
              </p>
              <Button
                asChild
                className="mt-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#C1502E] text-lg px-8 py-6 font-['Nunito']"
              >
                <a href={getLoginUrl()}>Inscrivez vous !</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vous allez adorer échanger Section */}
      <section className="bg-[#E6A896] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-['Abril_Fatface'] mb-6">
                Vous allez adorer<br />échanger !
              </h2>
              <p className="text-xl font-['Nunito'] mb-4">
                Tu ne vends rien, tu n'achètes rien.
              </p>
              <p className="text-xl font-['Nunito'] font-bold">
                Nous vous mettons en relation.
              </p>
              <Button
                asChild
                className="mt-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#E6A896] text-lg px-8 py-6 font-['Nunito']"
              >
                <a href={getLoginUrl()}>Inscrivez vous !</a>
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/kJpDHMZgHzLfZUTt.png"
                alt="Shopping"
                className="w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi ça marche Section */}
      <section className="bg-[#5C0029] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-['Abril_Fatface'] text-white text-center mb-16">
            Pourquoi ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/BxfwPLMvDDBFqHzD.png"
                  alt="Anonymat garanti"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-['Abril_Fatface'] text-white">
                Anonymat garanti
              </h3>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/BxfwPLMvDDBFqHzD.png"
                  alt="Mises en relation sécurisées"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-['Abril_Fatface'] text-white">
                Mises en relation<br />sécurisées
              </h3>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/BxfwPLMvDDBFqHzD.png"
                  alt="Gratuit pour les membres fondateurs"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-['Abril_Fatface'] text-white">
                Gratuit pour les<br />membres fondateurs
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#D97652] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-['Abril_Fatface'] text-[#F2ED6F] mb-12">
            VOUS ALLEZ ADORER ÉCHANGER !
          </h2>
          <div className="flex justify-center mb-12">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663204377934/BxfwPLMvDDBFqHzD.png"
              alt="Welcome home"
              className="w-96 h-96 rounded-lg object-cover"
            />
          </div>
          <p className="text-3xl font-['Abril_Fatface'] text-white mb-4">
            WELCOME HOME!
          </p>
          <Button
            asChild
            className="bg-transparent border-2 border-[#F2ED6F] text-[#F2ED6F] hover:bg-[#F2ED6F] hover:text-[#D97652] text-lg px-12 py-6 font-['Nunito']"
          >
            <a href={getLoginUrl()}>Inscrivez vous !</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#D97652] py-12 border-t-4 border-[#5C0029]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-white">
              <p className="text-xl font-['Nunito'] mb-2">
                <Mail className="inline mr-2" />
                Email: info@claudineunited.com
              </p>
              <p className="text-xl font-['Nunito']">
                <Instagram className="inline mr-2" />
                @claudine_united
              </p>
            </div>
            <div className="flex justify-end items-center gap-6">
              <a href="https://instagram.com/claudine_united" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F2ED6F] transition">
                <Instagram size={32} />
              </a>
              <a href="https://twitter.com/claudine_united" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F2ED6F] transition">
                <Twitter size={32} />
              </a>
              <a href="https://facebook.com/claudine_united" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F2ED6F] transition">
                <Facebook size={32} />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white text-sm font-['Nunito']">
              READYYY TO CHANGE THE WORLD
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
