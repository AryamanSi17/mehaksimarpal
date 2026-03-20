import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, UserPlus, Trash2, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { submitRSVP } from '../data/mockData';
import { toast } from 'sonner';

const RSVP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    attendingAnandKaraj: false,
    attendingReception: false,
    guests: [{ name: '', foodPreference: '' }]
  });

  const addGuest = () => {
    if (formData.guests.length < 5) {
      setFormData({
        ...formData,
        guests: [...formData.guests, { name: '', foodPreference: '' }]
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
    if (!formData.attendingAnandKaraj && !formData.attendingReception) {
      toast.error('Please select at least one event to attend');
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
      
      // Reset form
      setFormData({
        email: '',
        attendingAnandKaraj: false,
        attendingReception: false,
        guests: [{ name: '', foodPreference: '' }]
      });

      // Navigate to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E1C7] via-[#D4B99D]/30 to-[#E5E1C7] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-[#A16C56] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif text-[#2A0306] mb-4">RSVP</h1>
          <p className="text-xl text-[#2A0306]/70">Please Confirm Your Attendance</p>
          <p className="text-lg text-[#2A0306]/60 mt-2">Kindly respond by July 15, 2026</p>
        </div>

        <Card className="border-2 border-[#A16C56]/20 bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-[#2A0306] to-[#A16C56] text-[#E5E1C7] rounded-t-lg">
            <CardTitle className="text-2xl font-serif text-center">Event Selection</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-[#2A0306]">
                  Which events will you attend? *
                </Label>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border-2 border-[#A16C56]/20 rounded-lg hover:bg-[#E5E1C7]/30 transition-colors">
                    <Checkbox 
                      id="anandKaraj"
                      checked={formData.attendingAnandKaraj}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, attendingAnandKaraj: checked })
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="anandKaraj" className="cursor-pointer">
                        <p className="font-semibold text-[#2A0306]">Anand Karaj Ceremony</p>
                        <p className="text-sm text-[#2A0306]/70">Friday, August 28, 2026 • 11:00 AM</p>
                        <p className="text-sm text-[#2A0306]/70">Ekeby Gurdwara</p>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border-2 border-[#A16C56]/20 rounded-lg hover:bg-[#E5E1C7]/30 transition-colors">
                    <Checkbox 
                      id="reception"
                      checked={formData.attendingReception}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, attendingReception: checked })
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="reception" className="cursor-pointer">
                        <p className="font-semibold text-[#2A0306]">Evening Reception</p>
                        <p className="text-sm text-[#2A0306]/70">Saturday, August 29, 2026 • 6:00 PM</p>
                        <p className="text-sm text-[#2A0306]/70">Elite Hotel Savoy, Malmö</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold text-[#2A0306]">
                    Guest Information *
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
                  <Card key={index} className="border-2 border-[#A16C56]/20 bg-[#E5E1C7]/20">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-[#2A0306]">Guest {index + 1}</h3>
                        {formData.guests.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeGuest(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

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
                        <Textarea
                          id={`food-${index}`}
                          value={guest.foodPreference}
                          onChange={(e) => updateGuest(index, 'foodPreference', e.target.value)}
                          placeholder="E.g., Vegetarian, Gluten-free, Nut allergy, etc."
                          className="border-[#A16C56]/30 focus:border-[#A16C56] min-h-[80px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Email Address */}
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
                <p className="text-sm text-[#2A0306]/60">
                  We'll send a confirmation to this email address
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#2A0306] to-[#A16C56] hover:from-[#2A0306]/90 hover:to-[#A16C56]/90 text-[#E5E1C7] py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send RSVP
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-[#2A0306]/70">
            Questions? Please contact us at{' '}
            <a href="mailto:wedding@mehaksimarpal.com" className="text-[#A16C56] hover:underline">
              wedding@mehaksimarpal.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
