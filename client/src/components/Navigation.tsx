import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Home,
  Users,
  MessageSquare,
  UserCircle,
  LogOut,
  Menu,
  X,
  FileText,
  Mail,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const { user, isLoading } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { path: "/", label: "Accueil", icon: Home, public: true },
    { path: "/feed", label: "Feed", icon: FileText, public: false },
    { path: "/discover", label: "Découvrir", icon: Users, public: false },
    { path: "/groups", label: "Groupes", icon: UsersRound, public: false },
    { path: "/messages", label: "Messages", icon: MessageSquare, public: false },
    { path: "/contact", label: "Contact", icon: Mail, public: true },
  ];

  const publicLinks = navLinks.filter((link) => link.public);
  const privateLinks = navLinks.filter((link) => !link.public);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] flex items-center justify-center">
                <span className="text-white font-bold text-xl" style={{ fontFamily: "'Abril Fatface', serif" }}>
                  C
                </span>
              </div>
              <span
                className="text-2xl font-bold text-[#5C0029] hidden sm:block"
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                Claudine
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Public Links */}
            {publicLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} href={link.path}>
                  <a
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive(link.path)
                        ? "bg-[#5C0029] text-white"
                        : "text-gray-700 hover:bg-[#F3E8EE]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                  </a>
                </Link>
              );
            })}

            {/* Private Links (only if logged in) */}
            {user &&
              privateLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.path} href={link.path}>
                    <a
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive(link.path)
                          ? "bg-[#5C0029] text-white"
                          : "text-gray-700 hover:bg-[#F3E8EE]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  </Link>
                );
              })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <>
                <Link href="/profile">
                  <a
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive("/profile")
                        ? "bg-[#5C0029] text-white"
                        : "text-gray-700 hover:bg-[#F3E8EE]"
                    }`}
                  >
                    <UserCircle className="w-4 h-4" />
                    <span className="font-medium">Profil</span>
                  </a>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/api/auth/logout";
                  }}
                  className="border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  window.location.href = getLoginUrl();
                }}
                className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white"
              >
                Se connecter
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#F3E8EE] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#5C0029]" />
            ) : (
              <Menu className="w-6 h-6 text-[#5C0029]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {/* Public Links */}
              {publicLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.path} href={link.path}>
                    <a
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive(link.path)
                          ? "bg-[#5C0029] text-white"
                          : "text-gray-700 hover:bg-[#F3E8EE]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  </Link>
                );
              })}

              {/* Private Links (only if logged in) */}
              {user &&
                privateLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.path} href={link.path}>
                      <a
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isActive(link.path)
                            ? "bg-[#5C0029] text-white"
                            : "text-gray-700 hover:bg-[#F3E8EE]"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </a>
                    </Link>
                  );
                })}

              {/* User Actions */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {isLoading ? (
                  <div className="w-full h-10 rounded-lg bg-gray-200 animate-pulse" />
                ) : user ? (
                  <>
                    <Link href="/profile">
                      <a
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isActive("/profile")
                            ? "bg-[#5C0029] text-white"
                            : "text-gray-700 hover:bg-[#F3E8EE]"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserCircle className="w-5 h-5" />
                        <span className="font-medium">Profil</span>
                      </a>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white"
                      onClick={() => {
                        window.location.href = "/api/auth/logout";
                      }}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-[#5C0029] hover:bg-[#5C0029]/90 text-white"
                    onClick={() => {
                      window.location.href = getLoginUrl();
                    }}
                  >
                    Se connecter
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
