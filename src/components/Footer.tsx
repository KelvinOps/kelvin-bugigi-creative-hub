import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(222 28% 8%)" }}>
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(38 95% 58% / 0.5), hsl(16 88% 60% / 0.4), transparent)",
        }}
      />

      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(38 80% 45% / 0.05), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-primary-foreground text-lg transition-transform group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
                  boxShadow: "0 4px 14px hsl(38 95% 58% / 0.25)",
                }}
              >
                K
              </div>
              <span className="font-display font-semibold text-lg text-foreground group-hover:text-amber-400 transition-colors">
                BUGIGI
              </span>
            </Link>
            <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-xs">
              Software Developer, Graphic Designer, Fine Artist, and Vocational Trainer based in Eldoret, Kenya.
            </p>

            {/* Decorative divider */}
            <div
              className="mt-6 h-px w-20"
              style={{
                background: "linear-gradient(90deg, hsl(38 95% 58% / 0.5), transparent)",
              }}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-mono text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "hsl(38 95% 65%)" }}
            >
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {["Home", "About", "Skills", "Portfolio", "Services", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="group flex items-center gap-1 text-muted-foreground font-body text-lg transition-colors hover:text-amber-400"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-xs" style={{ color: "hsl(38 95% 58%)" }}>›</span>
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-mono text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "hsl(38 95% 65%)" }}
            >
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:kbugigi@gmail.com"
                className="flex items-center gap-3 text-muted-foreground font-body text-lg transition-colors hover:text-amber-400 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    background: "hsl(38 95% 58% / 0.12)",
                    border: "1px solid hsl(38 95% 58% / 0.2)",
                  }}
                >
                  <Mail size={14} style={{ color: "hsl(38 95% 58%)" }} />
                </div>
                kbugigi@gmail.com
              </a>
              <a
                href="tel:+254729114157"
                className="flex items-center gap-3 text-muted-foreground font-body text-lg transition-colors hover:text-amber-400"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "hsl(16 88% 60% / 0.12)",
                    border: "1px solid hsl(16 88% 60% / 0.2)",
                  }}
                >
                  <Phone size={14} style={{ color: "hsl(16 88% 60%)" }} />
                </div>
                +254 729 114 157
              </a>
              <div className="flex items-center gap-3 text-muted-foreground font-body text-lg">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "hsl(200 80% 60% / 0.12)",
                    border: "1px solid hsl(200 80% 60% / 0.2)",
                  }}
                >
                  <MapPin size={14} style={{ color: "hsl(200 80% 60%)" }} />
                </div>
                Eldoret, Kenya
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full font-display font-semibold text-xs text-primary-foreground hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
                boxShadow: "0 4px 14px hsl(38 95% 58% / 0.25)",
              }}
            >
              Start a project <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid hsl(224 18% 18%)" }}
        >
          <p className="text-muted-foreground font-mono text-xs">
            © 2026 Kelvin Bugigi. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: "hsl(38 95% 58% / 0.6)" }}>
            Crafted with ♥ and dedication
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;