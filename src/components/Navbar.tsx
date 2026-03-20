import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home",      path: "/" },
  { label: "About",     path: "/about" },
  { label: "Skills",    path: "/skills" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services",  path: "/services" },
  { label: "Contact",   path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const renderAuthDesktop = () => {
    if (loading) return <div className="w-20 h-8 rounded-full bg-border/40 animate-pulse" />;

    if (user && isAdmin) return (
      <>
        <Link
          to="/admin"
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            location.pathname === "/admin"
              ? "text-amber-400 border"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
          }`}
          style={location.pathname === "/admin" ? { borderColor: "hsl(38 95% 58% / 0.35)", background: "hsl(38 95% 58% / 0.08)" } : {}}
        >
          <Shield size={12} /> Admin
        </Link>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-muted-foreground font-mono text-xs uppercase tracking-wider hover:text-foreground hover:bg-white/5 transition-all"
        >
          <LogOut size={12} /> Sign Out
        </button>
      </>
    );

    if (user && !isAdmin) return (
      <button
        onClick={handleSignOut}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-muted-foreground font-mono text-xs uppercase tracking-wider hover:text-foreground hover:bg-white/5 transition-all"
      >
        <LogOut size={12} /> Sign Out
      </button>
    );

    return (
      <Link
        to="/auth"
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
        style={{ boxShadow: "0 4px 15px hsl(38 95% 58% / 0.25)" }}
      >
        <LogIn size={14} /> Login
      </Link>
    );
  };

  const renderAuthMobile = () => {
    if (loading) return null;
    if (user && isAdmin) return (
      <>
        <Link to="/admin" className="flex items-center gap-2 font-mono text-sm uppercase" style={{ color: "hsl(38 95% 58%)" }}>
          <Shield size={14} /> Admin Dashboard
        </Link>
        <button onClick={handleSignOut} className="flex items-center gap-2 font-mono text-sm uppercase text-muted-foreground hover:text-foreground">
          <LogOut size={14} /> Sign Out
        </button>
      </>
    );
    if (user && !isAdmin) return (
      <button onClick={handleSignOut} className="flex items-center gap-2 font-mono text-sm uppercase text-muted-foreground hover:text-foreground">
        <LogOut size={14} /> Sign Out
      </button>
    );
    return (
      <Link to="/auth" className="flex items-center gap-2 font-mono text-sm uppercase" style={{ color: "hsl(38 95% 58%)" }}>
        <LogIn size={14} /> Admin Login
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: "hsl(222 28% 9% / 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid hsl(38 95% 58% / 0.08)",
        boxShadow: "0 4px 30px hsl(222 28% 4% / 0.4)",
      } : {
        background: "transparent",
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(38 95% 58% / 0.4), hsl(16 88% 60% / 0.3), transparent)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-primary-foreground text-lg shadow-lg transition-transform group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
              boxShadow: "0 4px 14px hsl(38 95% 58% / 0.3)",
            }}
          >
            K
          </div>
          <span className="font-display font-semibold text-lg text-foreground group-hover:text-amber-400 transition-colors">
            BUGIGI
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                style={{
                  color: isActive
                    ? "hsl(38 95% 62%)"
                    : hoveredLink === link.path
                    ? "hsl(38 10% 85%)"
                    : "hsl(224 14% 56%)",
                  background: isActive ? "hsl(38 95% 58% / 0.10)" : "transparent",
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "hsl(38 95% 58% / 0.10)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-2">
          {renderAuthDesktop()}
          <Link
            to="/contact"
            className="inline-flex px-5 py-2.5 rounded-full font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
              boxShadow: "0 4px 14px hsl(38 95% 58% / 0.25)",
            }}
          >
            Hire Me
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-16 z-40"
            style={{
              background: "hsl(222 28% 8% / 0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="container mx-auto px-6 py-12 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    className="block font-display text-3xl font-bold py-2 transition-colors"
                    style={{
                      color: location.pathname === link.path
                        ? "hsl(38 95% 58%)"
                        : "hsl(38 40% 88%)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="flex flex-col gap-3 mt-4 pt-6" style={{ borderTop: "1px solid hsl(224 18% 20%)" }}>
                {renderAuthMobile()}
              </div>

              <Link
                to="/contact"
                className="mt-4 px-6 py-4 rounded-full font-display font-semibold text-center text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
                  boxShadow: "0 8px 20px hsl(38 95% 58% / 0.3)",
                }}
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;