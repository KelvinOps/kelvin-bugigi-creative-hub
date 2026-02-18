// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-amber flex items-center justify-center font-display font-bold text-primary-foreground text-lg">
            K
          </div>
          <span className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            BUGIGI
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right-side buttons */}
        <div className="hidden md:flex items-center gap-2">
          {!loading && (
            <>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                        location.pathname === "/admin"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <Settings size={12} /> Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-muted-foreground font-mono text-xs uppercase tracking-wider hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <LogOut size={12} /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-muted-foreground font-mono text-xs uppercase tracking-wider hover:text-foreground hover:bg-secondary transition-all"
                >
                  <LogIn size={12} /> Login
                </Link>
              )}
            </>
          )}
          <Link
            to="/contact"
            className="inline-flex px-5 py-2.5 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-2">
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
            className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl z-40"
          >
            <div className="container mx-auto px-6 py-12 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block font-display text-3xl font-bold py-2 transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile auth buttons */}
              {!loading && (
                <div className="flex flex-col gap-3 mt-4 border-t border-border pt-6">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 font-mono text-sm uppercase text-primary"
                        >
                          <Settings size={14} /> Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 font-mono text-sm uppercase text-muted-foreground hover:text-foreground"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="flex items-center gap-2 font-mono text-sm uppercase text-muted-foreground hover:text-foreground"
                    >
                      <LogIn size={14} /> Login
                    </Link>
                  )}
                </div>
              )}

              <Link
                to="/contact"
                className="mt-4 px-6 py-4 rounded-full bg-gradient-amber font-display font-semibold text-center text-primary-foreground"
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