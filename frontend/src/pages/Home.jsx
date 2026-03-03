import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Heart, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { weddingData } from '../data/mockData';

const Home = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const weddingDate = new Date(weddingData.couple.weddingDate);
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${weddingData.images.hero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0306]/80 via-[#2A0306]/60 to-[#2A0306]/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8">
            <p className="text-[#E5E1C7] text-lg md:text-xl mb-4 tracking-widest font-light">
              WE'RE GETTING MARRIED
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#E5E1C7] mb-4">
              {weddingData.couple.bride} & {weddingData.couple.groom}
            </h1>
            <div className="flex items-center justify-center gap-4 text-[#D4B99D] text-lg md:text-xl mt-6">
              <Calendar className="w-5 h-5" />
              <span>August 28 & 29, 2025</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-[#D4B99D] text-lg md:text-xl mt-3">
              <MapPin className="w-5 h-5" />
              <span>{weddingData.couple.location}</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex justify-center gap-4 md:gap-8 my-12">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#E5E1C7]/10 backdrop-blur-md border border-[#D4B99D]/30 rounded-lg p-4 md:p-6 min-w-[70px] md:min-w-[90px]">
                  <div className="text-3xl md:text-4xl font-bold text-[#E5E1C7]">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-[#D4B99D] mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/anand-karaj">
            <Button className="bg-[#A16C56] hover:bg-[#A16C56]/90 text-[#E5E1C7] px-8 py-6 text-lg transition-all duration-300 hover:scale-105">
              View Schedule
            </Button>
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4 bg-[#E5E1C7]">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-12 h-12 text-[#A16C56] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] mb-6">Welcome</h2>
          <p className="text-lg md:text-xl text-[#2A0306]/80 leading-relaxed">
            With hearts full of joy and gratitude, we invite you to join us for two beautiful days 
            of love, tradition, and celebration. Your presence would mean the world to us as we 
            begin this new chapter surrounded by those we cherish most.
          </p>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#E5E1C7] to-[#D4B99D]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A0306] text-center mb-16">
            Celebration Events
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Anand Karaj Card */}
            <Card className="overflow-hidden border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${weddingData.images.ceremony})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0306]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-[#E5E1C7]">
                  <p className="text-sm tracking-widest mb-1">AUGUST 28</p>
                  <h3 className="text-2xl font-serif">Anand Karaj Ceremony</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#A16C56] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2A0306]">Thursday, August 28, 2025</p>
                    <p className="text-sm text-[#2A0306]/70">11:00 AM - Ceremony begins</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#A16C56] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2A0306]">{weddingData.anandKaraj.venue.name}</p>
                    <p className="text-sm text-[#2A0306]/70">{weddingData.anandKaraj.venue.address}</p>
                  </div>
                </div>
                <p className="text-[#2A0306]/80 text-sm leading-relaxed">
                  Join us for the sacred Sikh wedding ceremony followed by Langar (community lunch).
                </p>
                <Link to="/anand-karaj">
                  <Button variant="outline" className="w-full mt-4 border-[#A16C56] text-[#A16C56] hover:bg-[#A16C56] hover:text-[#E5E1C7]">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Reception Card */}
            <Card className="overflow-hidden border-2 border-[#A16C56]/20 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${weddingData.images.reception})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0306]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-[#E5E1C7]">
                  <p className="text-sm tracking-widest mb-1">AUGUST 29</p>
                  <h3 className="text-2xl font-serif">Evening Reception</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#A16C56] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2A0306]">Friday, August 29, 2025</p>
                    <p className="text-sm text-[#2A0306]/70">6:00 PM - Cocktails begin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#A16C56] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2A0306]">{weddingData.reception.venue.name}</p>
                    <p className="text-sm text-[#2A0306]/70">{weddingData.reception.venue.address}</p>
                  </div>
                </div>
                <p className="text-[#2A0306]/80 text-sm leading-relaxed">
                  An evening of celebration, dinner, and dancing under the stars.
                </p>
                <Link to="/reception">
                  <Button variant="outline" className="w-full mt-4 border-[#A16C56] text-[#A16C56] hover:bg-[#A16C56] hover:text-[#E5E1C7]">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#2A0306] to-[#101F12]">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="w-12 h-12 text-[#D4B99D] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-[#E5E1C7] mb-6">
            Save the Date
          </h2>
          <p className="text-lg text-[#D4B99D] mb-8 leading-relaxed">
            Please confirm your attendance by July 15, 2025
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

export default Home;
