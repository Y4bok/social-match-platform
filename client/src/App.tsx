import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";
import CGV from "./pages/CGV";
import CGU from "./pages/CGU";
import Feed from "./pages/Feed";
import Groups from "./pages/Groups";
import Onboarding from "./pages/Onboarding";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/discover"} component={Discover} />
      <Route path={"/messages"} component={Messages} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/cgv"} component={CGV} />
      <Route path={"/cgu"} component={CGU} />
      <Route path={"/feed"} component={Feed} />
      <Route path={"/groups"} component={Groups} />
      <Route path={"/onboarding"} component={Onboarding} />
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
