import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin } from 'lucide-react';
import { weddingData } from '../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#2A0306] to-[#101F12] text-[#E5E1C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#A16C56]" />
              <span className="text-2xl font-serif">Mehak & Simarpal</span>
            </div>
            <p className="text-[#D4B99D] text-sm">
              Celebrating love, tradition, and new beginnings
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-[#D4B99D] hover:text-[#A16C56] transition-colors">
                Home
              </Link>
              <Link to="/anand-karaj" className="text-[#D4B99D] hover:text-[#A16C56] transition-colors">
                Anand Karaj
              </Link>
              <Link to="/reception" className="text-[#D4B99D] hover:text-[#A16C56] transition-colors">
                Reception
              </Link>
              <Link to="/rsvp" className="text-[#D4B99D] hover:text-[#A16C56] transition-colors">
                RSVP
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-2 text-[#D4B99D]">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:mehaksimarpal@gmail.com" className="hover:text-[#A16C56] transition-colors">
                  mehaksimarpal@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <MapPin className="w-4 h-4" />
                <span>{weddingData.couple.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4B99D]/20 pt-8 text-center">
          <p className="text-[#D4B99D] text-sm">
            © {currentYear} Mehak & Simarpal. Made with <Heart className="w-4 h-4 inline text-[#A16C56]" /> for our special day.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
