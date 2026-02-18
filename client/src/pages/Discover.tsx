import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, MapPin, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";

export default function Discover() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const [professionals] = useState([
    {
      id: 1,
      name: "Marie Dupont",
      position: "Directrice Logistique",
      company: "LogiTech Solutions",
      location: "Paris, France",
      avatar: "MD",
      followers: 1250,
      isFollowing: false,
    },
    {
      id: 2,
      name: "Jean Martin",
      position: "Responsable Distribution",
      company: "DistribPro",
      location: "Lyon, France",
      avatar: "JM",
      followers: 890,
      isFollowing: false,
    },
    {
      id: 3,
      name: "Sophie Bernard",
      position: "Experte Supply Chain",
      company: "Supply Chain Experts",
      location: "Marseille, France",
      avatar: "SB",
      followers: 2100,
      isFollowing: true,
    },
  ]);

  const filteredProfessionals = professionals.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1
              className="text-4xl font-bold text-[#5C0029] mb-2"
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Découvrir des Professionnels
            </h1>
            <p className="text-gray-700">
              Trouvez et connectez-vous avec des experts de la distribution
            </p>
          </div>

          <Card className="p-4 mb-6 border-[#F3E8EE]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher par nom, poste ou entreprise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#F3E8EE] focus:border-[#5C0029]"
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => (
              <Card key={prof.id} className="p-6 border-[#F3E8EE] hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center text-white text-2xl font-bold mb-3">
                    {prof.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-[#5C0029] text-center">{prof.name}</h3>
                  <p className="text-sm text-gray-600 text-center mb-1">{prof.position}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 text-[#5C0029]" />
                    <span>{prof.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#5C0029]" />
                    <span>{prof.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserPlus className="w-4 h-4 text-[#5C0029]" />
                    <span>{prof.followers} abonnés</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {prof.isFollowing ? (
                    <Button
                      variant="outline"
                      className="flex-1 border-[#5C0029] text-[#5C0029] hover:bg-[#F3E8EE]"
                    >
                      Abonné
                    </Button>
                  ) : (
                    <Button className="flex-1 bg-[#5C0029] hover:bg-[#5C0029]/90 text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Suivre
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white"
                  >
                    Profil
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
