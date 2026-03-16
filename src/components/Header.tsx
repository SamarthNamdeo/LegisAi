import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-textprimary/10">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl text-textprimary hover:text-primary transition-colors">
            {'<LegisAI/>'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-textprimary hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="font-paragraph text-base text-textprimary hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard" 
              className="font-paragraph px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {'{ access_platform => }'}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-textprimary hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pt-6 border-t border-textprimary/10 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-paragraph text-base text-textprimary hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-paragraph text-base text-textprimary hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-paragraph px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-block text-center"
            >
              {'{ access_platform => }'}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
