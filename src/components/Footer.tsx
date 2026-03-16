import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-darkbackground border-t border-secondary-foreground/10">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-2xl text-secondary-foreground hover:text-primary transition-colors inline-block mb-4">
              {'<LegisAI/>'}
            </Link>
            <p className="font-paragraph text-sm text-secondary-foreground/70">
              Advanced legislative intelligence platform powered by AI technology for policy research and compliance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-paragraph text-base text-secondary-foreground font-semibold mb-4">Platform</h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-paragraph text-base text-secondary-foreground font-semibold mb-4">Resources</h3>
            <nav className="flex flex-col gap-3">
              <a 
                href="#" 
                className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                API Reference
              </a>
              <a 
                href="#" 
                className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                Support
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-paragraph text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} LegisAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
