import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Music } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { weddingData } from '../data/mockData';

const Reception = () => {
  const { reception } = weddingData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E1C7] to-[#D4B99D]/40">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${weddingData.images.celebration})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0306]/70 via-[#2A0306]/50 to-[#E5E1C7]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-[#E5E1C7] text-lg md:text-xl mb-3 tracking-widest">AUGUST 29, 2026</p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#E5E1C7] mb-4">
            {reception.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[#D4B99D] font-light">
            {reception.subtitle}
          </p>
        </div>
      </section>

      {/* About Reception */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <Music className="w-12 h-12 text-[#A16C56] mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-[#2A0306]/80 leading-relaxed font-light">
                {reception.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Evening Timeline */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] text-center mb-12">
            Evening Timeline
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {reception.timeline.map((item, index) => (
              <Card 
                key={index} 
                className="border-2 border-[#A16C56]/20 bg-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#A16C56] rounded-full">
                      <Clock className="w-6 h-6 text-[#E5E1C7]" />
                    </div>
                    <span className="text-2xl font-bold text-[#2A0306]">{item.time}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#2A0306] mb-3">{item.event}</h3>
                  <p className="text-[#2A0306]/70 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Details */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] text-center mb-12">
            Venue Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-sm shadow-xl">
              <div 
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${weddingData.images.reception})` }}
              ></div>
              <CardContent className="p-8">
                <MapPin className="w-10 h-10 text-[#A16C56] mb-4" />
                <h3 className="text-2xl font-serif text-[#2A0306] mb-4">
                  {reception.venue.name}
                </h3>
                <p className="text-[#2A0306]/80 mb-6">{reception.venue.address}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${reception.venue.coordinates.lat},${reception.venue.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#A16C56] hover:bg-[#A16C56]/90 text-[#E5E1C7]">
                    Open in Google Maps
                  </Button>
                </a>
              </CardContent>
            </Card>

            <div className="rounded-lg overflow-hidden border-2 border-[#A16C56]/20 shadow-xl h-[500px]">
              <iframe
                title="Reception Venue Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${reception.venue.coordinates.lat},${reception.venue.coordinates.lng}&zoom=15`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2A0306] mb-4">
                {reception.dressCode.title}
              </h2>
              <p className="text-lg text-[#2A0306]/80 mb-6">
                {reception.dressCode.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {reception.dressCode.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-[#E5E1C7]/50 rounded-lg">
                    <div className="w-2 h-2 bg-[#A16C56] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#2A0306]">{detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Image Gallery Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] text-center mb-12">
            What to Expect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: weddingData.images.reception, title: "Elegant Setting" },
              { img: weddingData.images.florals, title: "Beautiful Decor" },
              { img: weddingData.images.celebration, title: "Joyful Celebration" }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative h-80 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0306]/80 to-transparent flex items-end">
                  <p className="text-[#E5E1C7] text-xl font-serif p-6">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#2A0306] to-[#101F12]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#E5E1C7] mb-6">
            Join the Celebration
          </h2>
          <p className="text-lg text-[#D4B99D] mb-8">
            We can't wait to celebrate with you!
          </p>
          <Link to="/rsvp">
            <Button className="bg-[#A16C56] hover:bg-[#A16C56]/90 text-[#E5E1C7] px-10 py-6 text-lg transition-all duration-300 hover:scale-105">
              RSVP Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Reception;
