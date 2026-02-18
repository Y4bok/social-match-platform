import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  FileText,
  Users,
  Settings,
  Edit,
  Save,
  MapPin,
  Briefcase,
  Mail,
  Calendar,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  // Mock data - replace with real data from backend
  const [profileData, setProfileData] = useState({
    name: user?.name || "Utilisateur",
    email: user?.email || "user@example.com",
    bio: "Professionnel de la distribution avec 10 ans d'expérience",
    location: "Paris, France",
    company: "Distribution Pro",
    position: "Directeur Logistique",
    joinedDate: "Janvier 2024",
  });

  const [myPosts] = useState([
    {
      id: 1,
      content: "Excellente journée de formation sur la supply chain !",
      likes: 45,
      comments: 12,
      timestamp: "Il y a 2 jours",
    },
    {
      id: 2,
      content: "Nouveau projet de digitalisation lancé cette semaine.",
      likes: 78,
      comments: 23,
      timestamp: "Il y a 5 jours",
    },
  ]);

  const [myGroups] = useState([
    {
      id: 1,
      name: "Logistique & Supply Chain",
      members: 2450,
      image: null,
    },
    {
      id: 2,
      name: "E-commerce & Distribution",
      members: 1820,
      image: null,
    },
    {
      id: 3,
      name: "Innovation Retail",
      members: 980,
      image: null,
    },
  ]);

  const handleSaveProfile = () => {
    // TODO: Save to backend
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <Card className="p-8 mb-6 border-[#F3E8EE]">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                {profileData.name.substring(0, 2).toUpperCase()}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1
                      className="text-3xl font-bold text-[#5C0029] mb-2"
                      style={{ fontFamily: "'Abril Fatface', serif" }}
                    >
                      {profileData.name}
                    </h1>
                    <p className="text-lg text-gray-700 mb-1">{profileData.position}</p>
                    <p className="text-gray-600">{profileData.company}</p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white mt-4 md:mt-0"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">{profileData.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#5C0029]" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#5C0029]" />
                    <span>{profileData.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#5C0029]" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#5C0029]" />
                    <span>Membre depuis {profileData.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white border border-[#F3E8EE]">
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-[#5C0029] data-[state=active]:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Informations
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-[#5C0029] data-[state=active]:text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Publications
              </TabsTrigger>
              <TabsTrigger
                value="groups"
                className="data-[state=active]:bg-[#5C0029] data-[state=active]:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Groupes
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-[#5C0029] data-[state=active]:text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            {/* Informations Tab */}
            <TabsContent value="info">
              <Card className="p-6 border-[#F3E8EE]">
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-6"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  Informations Personnelles
                </h2>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                        className="border-[#F3E8EE] focus:border-[#5C0029]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        className="border-[#F3E8EE] focus:border-[#5C0029]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Poste</Label>
                      <Input
                        id="position"
                        value={profileData.position}
                        onChange={(e) =>
                          setProfileData({ ...profileData, position: e.target.value })
                        }
                        className="border-[#F3E8EE] focus:border-[#5C0029]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) =>
                          setProfileData({ ...profileData, company: e.target.value })
                        }
                        className="border-[#F3E8EE] focus:border-[#5C0029]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({ ...profileData, location: e.target.value })
                        }
                        className="border-[#F3E8EE] focus:border-[#5C0029]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({ ...profileData, bio: e.target.value })
                        }
                        className="border-[#F3E8EE] focus:border-[#5C0029]"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-[#5C0029] text-[#5C0029]"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-[#5C0029] mb-1">Nom complet</h3>
                      <p className="text-gray-700">{profileData.name}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5C0029] mb-1">Email</h3>
                      <p className="text-gray-700">{profileData.email}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5C0029] mb-1">Poste</h3>
                      <p className="text-gray-700">{profileData.position}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5C0029] mb-1">Entreprise</h3>
                      <p className="text-gray-700">{profileData.company}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5C0029] mb-1">Localisation</h3>
                      <p className="text-gray-700">{profileData.location}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5C0029] mb-1">Biographie</h3>
                      <p className="text-gray-700">{profileData.bio}</p>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="posts">
              <Card className="p-6 border-[#F3E8EE]">
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-6"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  Mes Publications
                </h2>
                <div className="space-y-4">
                  {myPosts.map((post) => (
                    <Card key={post.id} className="p-4 border-[#F3E8EE]">
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{post.likes} j'aime</span>
                        <span>{post.comments} commentaires</span>
                        <span className="ml-auto">{post.timestamp}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Groupes Tab */}
            <TabsContent value="groups">
              <Card className="p-6 border-[#F3E8EE]">
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-6"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  Mes Groupes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myGroups.map((group) => (
                    <Card key={group.id} className="p-4 border-[#F3E8EE] hover:shadow-lg transition-shadow">
                      <div className="w-full h-24 rounded-lg bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] mb-3 flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="font-bold text-[#5C0029] mb-2">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.members} membres</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Paramètres Tab */}
            <TabsContent value="settings">
              <Card className="p-6 border-[#F3E8EE]">
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-6"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  Paramètres du Compte
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#5C0029] mb-3">Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-700">Recevoir les notifications par email</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-700">Notifications de nouveaux messages</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-700">Notifications de nouveaux followers</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#5C0029] mb-3">Confidentialité</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-700">Profil public</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-700">Masquer mon email</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#5C0029] mb-3">Sécurité</h3>
                    <Button
                      variant="outline"
                      className="border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white"
                    >
                      Changer le mot de passe
                    </Button>
                  </div>

                  <div>
                    <Button className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white">
                      Enregistrer les paramètres
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
