import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CGV from "./pages/CGV";
import CGU from "./pages/CGU";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";
import { useAuth } from "./_core/hooks/useAuth";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;
  if (!isAuthenticated) return <NotFound />;

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/cgv"} component={CGV} />
      <Route path={"/cgu"} component={CGU} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/dashboard"} component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path={"/profile/edit"} component={() => <ProtectedRoute component={ProfileEdit} />} />
      <Route path={"/discover"} component={() => <ProtectedRoute component={Discover} />} />
      <Route path={"/messages"} component={() => <ProtectedRoute component={Messages} />} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
