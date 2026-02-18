import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export default function ProtectedRoute({ children, requireProfile = false }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: userLoading } = trpc.auth.me.useQuery();
  const { data: profile, isLoading: profileLoading } = trpc.profile.get.useQuery(undefined, {
    enabled: !!user && requireProfile,
  });

  useEffect(() => {
    if (userLoading) return;

    // Not logged in → redirect to login
    if (!user) {
      window.location.href = getLoginUrl();
      return;
    }

    // Profile required but not complete → redirect to onboarding
    if (requireProfile && !profileLoading && (!profile || !profile.isProfileComplete)) {
      setLocation("/onboarding");
    }
  }, [user, userLoading, profile, profileLoading, requireProfile, setLocation]);

  if (userLoading || (requireProfile && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5C0029] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5C0029] font-['Nunito']">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (requireProfile && (!profile || !profile.isProfileComplete)) {
    return null; // Will redirect to onboarding
  }

  return <>{children}</>;
}
