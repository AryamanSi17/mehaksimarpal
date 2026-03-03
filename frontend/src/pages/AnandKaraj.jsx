import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { weddingData } from '../data/mockData';

const AnandKaraj = () => {
  const { anandKaraj } = weddingData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E1C7] to-[#D4B99D]/40">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${weddingData.images.gurdwara})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0306]/70 via-[#2A0306]/50 to-[#E5E1C7]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-[#E5E1C7] text-lg md:text-xl mb-3 tracking-widest">AUGUST 28, 2025</p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#E5E1C7] mb-4">
            {anandKaraj.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[#D4B99D] font-light">
            {anandKaraj.subtitle}
          </p>
        </div>
      </section>

      {/* About Anand Karaj */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-8 h-8 text-[#A16C56]" />
                <h2 className="text-3xl md:text-4xl font-serif text-[#2A0306]">
                  About the Ceremony
                </h2>
              </div>
              <p className="text-lg text-[#2A0306]/80 leading-relaxed">
                {anandKaraj.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] text-center mb-12">
            Day Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#A16C56]/30 transform md:-translate-x-1/2"></div>
            
            {anandKaraj.timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#A16C56] rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg z-10"></div>
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <Card className="border-2 border-[#A16C56]/20 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-5 h-5 text-[#A16C56]" />
                        <span className="text-xl font-bold text-[#2A0306]">{item.time}</span>
                      </div>
                      <h3 className="text-xl font-serif text-[#2A0306] mb-2">{item.event}</h3>
                      <p className="text-[#2A0306]/70">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
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
              <CardContent className="p-8">
                <MapPin className="w-10 h-10 text-[#A16C56] mb-4" />
                <h3 className="text-2xl font-serif text-[#2A0306] mb-4">
                  {anandKaraj.venue.name}
                </h3>
                <p className="text-[#2A0306]/80 mb-6">{anandKaraj.venue.address}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${anandKaraj.venue.coordinates.lat},${anandKaraj.venue.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#A16C56] hover:bg-[#A16C56]/90 text-[#E5E1C7]">
                    Open in Google Maps
                  </Button>
                </a>
              </CardContent>
            </Card>

            <div className="rounded-lg overflow-hidden border-2 border-[#A16C56]/20 shadow-xl h-[400px]">
              <iframe
                title="Venue Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${anandKaraj.venue.coordinates.lat},${anandKaraj.venue.coordinates.lng}&zoom=14`}
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
                {anandKaraj.dressCode.title}
              </h2>
              <p className="text-lg text-[#2A0306]/80 mb-6">
                {anandKaraj.dressCode.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {anandKaraj.dressCode.details.map((detail, index) => (
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

      {/* Gurdwara Guidelines */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] text-center mb-12">
            Gurdwara Guidelines
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {anandKaraj.gurdwaraGuidelines.map((guideline, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-[#A16C56]/20 bg-white rounded-lg px-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-lg font-semibold text-[#2A0306] hover:text-[#A16C56] py-4">
                  {guideline.title}
                </AccordionTrigger>
                <AccordionContent className="text-[#2A0306]/80 pb-4">
                  {guideline.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#2A0306] to-[#101F12]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#E5E1C7] mb-6">
            Will You Join Us?
          </h2>
          <p className="text-lg text-[#D4B99D] mb-8">
            Please let us know if you'll be attending this sacred ceremony
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

export default AnandKaraj;
