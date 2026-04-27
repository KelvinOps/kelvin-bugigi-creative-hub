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
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  const renderAuthDesktop = () => {
    if (loading) return <div className="w-20 h-8 rounded-full bg-border/30 animate-pulse" />;
    if (user && isAdmin) return (
      <>
        <Link to="/admin"
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all ${
            location.pathname === "/admin"
              ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
              : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50"
          }`}
        >
          <Shield size={11} /> Admin
        </Link>
        <button onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border/50 text-muted-foreground font-mono text-[11px] uppercase tracking-wider hover:text-foreground hover:border-border transition-all">
          <LogOut size={11} /> Sign Out
        </button>
      </>
    );
    if (user && !isAdmin) return (
      <button onClick={handleSignOut}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border/50 text-muted-foreground font-mono text-[11px] uppercase tracking-wider hover:text-foreground transition-all">
        <LogOut size={11} /> Sign Out
      </button>
    );
    return (
      <Link to="/auth"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border/50 hover:border-amber-400/30 transition-all">
        <LogIn size={11} /> Login
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: "hsl(222 28% 9% / 0.88)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid hsl(38 95% 58% / 0.07)",
        boxShadow: "0 8px 40px hsl(222 28% 4% / 0.5)",
      } : {}}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, hsl(38,95%,58%), hsl(16,88%,60%), hsl(38,95%,58%))",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        initial={{ width: "0%" }}
        animate={{ width: scrolled ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />

      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-black text-lg shadow-lg"
            style={{
              background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
              boxShadow: "0 4px 16px hsl(38 95% 58% / 0.3)",
            }}
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            K
          </motion.div>
          <span className="font-display font-bold text-lg text-foreground group-hover:text-amber-400 transition-colors duration-300">
            BUGIGI
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors duration-200"
                style={{ color: isActive ? "hsl(38 95% 62%)" : "hsl(224 14% 56%)" }}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ color: "hsl(38 10% 90%)" }}
                >
                  {link.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "hsl(38 95% 58% / 0.12)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-2">
          {renderAuthDesktop()}
          <Link
            to="/contact"
            className="inline-flex px-5 py-2.5 rounded-full font-display font-bold text-sm text-black hover:opacity-90 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-500/20 ml-1"
            style={{ background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))" }}
          >
            Hire Me
          </Link>
        </div>

        {/* Hamburger */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground relative z-50"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "100dvh", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-0 z-40 flex flex-col"
            style={{ background: "hsl(222 28% 7% / 0.97)", backdropFilter: "blur(30px)" }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(38 95% 50% / 0.06), transparent)", filter: "blur(60px)" }} />
            </div>

            <div className="container mx-auto px-6 pt-24 pb-12 flex flex-col gap-2 relative z-10 flex-1 justify-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-3 font-display text-3xl font-bold py-2.5 transition-colors group"
                    style={{ color: location.pathname === link.path ? "hsl(38 95% 58%)" : "hsl(38 20% 82%)" }}
                  >
                    <span className="font-mono text-xs text-muted-foreground/30 w-6">{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3 mt-8 pt-8 border-t border-border/30"
              >
                {!loading && user && isAdmin && (
                  <Link to="/admin" className="flex items-center gap-2 font-mono text-sm uppercase text-amber-400">
                    <Shield size={14} /> Admin Dashboard
                  </Link>
                )}
                {!loading && user && (
                  <button onClick={handleSignOut} className="flex items-center gap-2 font-mono text-sm uppercase text-muted-foreground">
                    <LogOut size={14} /> Sign Out
                  </button>
                )}
                {!loading && !user && (
                  <Link to="/auth" className="flex items-center gap-2 font-mono text-sm uppercase text-amber-400">
                    <LogIn size={14} /> Admin Login
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="mt-2 px-6 py-4 rounded-full font-display font-bold text-center text-black"
                  style={{ background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))" }}
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;