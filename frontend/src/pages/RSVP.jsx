import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, UserPlus, Trash2, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { submitRSVP, weddingData } from '../data/mockData';
import { toast } from 'sonner';

const RSVP = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    guests: [{ name: '', foodPreference: '', attendingAnandKaraj: true, attendingReception: true, isChild: false, age: '' }]
  });

  const addGuest = () => {
    if (formData.guests.length < 5) {
      setFormData({
        ...formData,
        guests: [...formData.guests, { name: '', foodPreference: '', attendingAnandKaraj: true, attendingReception: true, isChild: false, age: '' }]
      });
    } else {
      toast.error('Maximum 5 guests allowed');
    }
  };

  const removeGuest = (index) => {
    if (formData.guests.length > 1) {
      const updatedGuests = formData.guests.filter((_, i) => i !== index);
      setFormData({ ...formData, guests: updatedGuests });
    }
  };

  const updateGuest = (index, field, value) => {
    const updatedGuests = formData.guests.map((guest, i) => 
      i === index ? { ...guest, [field]: value } : guest
    );
    setFormData({ ...formData, guests: updatedGuests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const hasAnyAttendance = formData.guests.some(guest => guest.attendingAnandKaraj || guest.attendingReception);
    if (!hasAnyAttendance) {
      toast.error('At least one guest must attend at least one event');
      return;
    }

    if (!formData.email) {
      toast.error('Please provide your email address');
      return;
    }

    const hasEmptyNames = formData.guests.some(guest => !guest.name.trim());
    if (hasEmptyNames) {
      toast.error('Please provide names for all guests');
      return;
    }

    setLoading(true);

    try {
      const result = await submitRSVP(formData);
      toast.success(result.message);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        email: '',
        guests: [{ name: '', foodPreference: '', attendingAnandKaraj: true, attendingReception: true }]
      });

    } catch (error) {
      toast.error(error.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E5E1C7] via-[#D4B99D]/30 to-[#E5E1C7] flex items-center justify-center p-4">
        <Card className="max-w-xl w-full border-2 border-[#A16C56]/20 bg-white/95 backdrop-blur-md shadow-2xl p-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-[#A16C56] animate-pulse" />
          </div>
          <h2 className="text-4xl font-serif text-[#2A0306] mb-4">Thank You!</h2>
          <p className="text-xl text-[#2A0306]/70 mb-8">
            Your RSVP has been received. We are so excited to celebrate with you!
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-[#2A0306] hover:bg-[#2A0306]/90 text-[#E5E1C7] py-6 text-lg"
            >
              Return Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="w-full border-[#A16C56] text-[#A16C56] hover:bg-[#A16C56]/10"
            >
              Submit Another RSVP
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E1C7] via-[#D4B99D]/30 to-[#E5E1C7] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-[#A16C56] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif text-[#2A0306] mb-4">RSVP</h1>
          <p className="text-xl text-[#2A0306]/70">Please Confirm Your Attendance</p>
          <p className="text-lg text-[#2A0306]/60 mt-2">Kindly respond by July 15, 2026</p>
          <div className="mt-8 p-4 bg-white/40 backdrop-blur-sm border border-[#A16C56]/20 rounded-lg inline-block">
            <p className="text-[#A16C56] font-serif text-lg italic tracking-wide">
              No boxed gifts, please
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Guest Information */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-2xl font-serif text-[#2A0306]">
                Guest Information
              </Label>
              <Button
                type="button"
                onClick={addGuest}
                variant="outline"
                size="sm"
                className="border-[#A16C56] text-[#A16C56] hover:bg-[#A16C56] hover:text-[#E5E1C7]"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </div>

            {formData.guests.map((guest, index) => (
              <Card key={index} className="border-2 border-[#A16C56]/20 bg-white/90 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#2A0306] to-[#A16C56] text-[#E5E1C7] py-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-serif">Guest {index + 1}</CardTitle>
                    {formData.guests.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeGuest(index)}
                        variant="ghost"
                        size="sm"
                        className="text-[#E5E1C7] hover:bg-white/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Full Name *</Label>
                      <Input
                        id={`name-${index}`}
                        value={guest.name}
                        onChange={(e) => updateGuest(index, 'name', e.target.value)}
                        placeholder="Enter full name"
                        className="border-[#A16C56]/30 focus:border-[#A16C56]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`food-${index}`}>Food Preferences / Allergies</Label>
                      <Input
                        id={`food-${index}`}
                        value={guest.foodPreference}
                        onChange={(e) => updateGuest(index, 'foodPreference', e.target.value)}
                        placeholder="E.g., Vegetarian, Nut allergy"
                        className="border-[#A16C56]/30 focus:border-[#A16C56]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <Label className="text-base font-semibold text-[#2A0306]">Attending Events:</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 p-3 border border-[#A16C56]/20 rounded-lg bg-[#E5E1C7]/10">
                        <Checkbox 
                          id={`anand-${index}`}
                          checked={guest.attendingAnandKaraj}
                          onCheckedChange={(checked) => updateGuest(index, 'attendingAnandKaraj', checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={`anand-${index}`} className="cursor-pointer">
                            <p className="font-semibold text-sm text-[#2A0306]">{weddingData.anandKaraj.title}</p>
                            <p className="text-xs text-[#2A0306]/70">Aug 28 • 9:00 AM</p>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border border-[#A16C56]/20 rounded-lg bg-[#E5E1C7]/10">
                        <Checkbox 
                          id={`reception-${index}`}
                          checked={guest.attendingReception}
                          onCheckedChange={(checked) => updateGuest(index, 'attendingReception', checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={`reception-${index}`} className="cursor-pointer">
                            <p className="font-semibold text-sm text-[#2A0306]">{weddingData.reception.title}</p>
                            <p className="text-xs text-[#2A0306]/70">Aug 29 • 6:00 PM</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Child Section - Only for Reception */}
                  {guest.attendingReception && (
                    <div className="space-y-4 pt-4 border-t border-[#A16C56]/10">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id={`child-${index}`}
                          checked={guest.isChild}
                          onCheckedChange={(checked) => updateGuest(index, 'isChild', checked)}
                        />
                        <Label htmlFor={`child-${index}`} className="cursor-pointer font-medium text-[#2A0306]">
                          Is this a child?
                        </Label>
                      </div>
                      
                      {guest.isChild && (
                        <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <Label htmlFor={`age-${index}`}>Age of Child *</Label>
                          <Input
                            id={`age-${index}`}
                            value={guest.age}
                            onChange={(e) => updateGuest(index, 'age', e.target.value)}
                            placeholder="Enter age"
                            className="border-[#A16C56]/30 focus:border-[#A16C56]"
                            required={guest.isChild}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Email Address */}
          <Card className="border-2 border-[#A16C56]/20 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-[#2A0306]">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="border-[#A16C56]/30 focus:border-[#A16C56]"
                    required
                  />
                  <p className="text-sm text-[#2A0306]/60 italic font-light">
                    We'll send a confirmation to this email address.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#2A0306] to-[#A16C56] hover:from-[#2A0306]/90 hover:to-[#A16C56]/90 text-[#E5E1C7] py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit RSVP
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-[#2A0306]/70">
            Questions? Please contact us at{' '}
            <a href="mailto:mehaksimarpal@gmail.com" className="hover:text-[#A16C56] transition-colors">mehaksimarpal@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
