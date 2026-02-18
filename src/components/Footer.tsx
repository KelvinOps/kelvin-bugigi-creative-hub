import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-amber opacity-60" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-amber flex items-center justify-center font-display font-bold text-primary-foreground text-lg">
                K
              </div>
              <span className="font-display font-semibold text-lg text-foreground">BUGIGI</span>
            </Link>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Software Developer, Graphic Designer, Fine Artist, and Vocational Trainer based in Eldoret, Kenya.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Home", "About", "Skills", "Portfolio", "Services", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary font-body text-lg transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a href="mailto:kbugigi@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary font-body text-lg transition-colors">
                <Mail size={16} className="text-primary" /> kbugigi@gmail.com
              </a>
              <a href="tel:+254729114157" className="flex items-center gap-3 text-muted-foreground hover:text-primary font-body text-lg transition-colors">
                <Phone size={16} className="text-primary" /> +254 729 114 157
              </a>
              <div className="flex items-center gap-3 text-muted-foreground font-body text-lg">
                <MapPin size={16} className="text-primary" /> Eldoret, Kenya
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex mt-4 px-5 py-2.5 rounded-full bg-gradient-amber font-display font-semibold text-xs text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground font-mono text-xs">
            © 2026 Kelvin Bugigi. All rights reserved.
          </p>
          <p className="text-muted-foreground font-mono text-xs">
            Crafted with ♥ and dedication
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
