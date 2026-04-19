// Mock data for wedding website
export const weddingData = {
  couple: {
    bride: "Mehak",
    groom: "Simarpal",
    weddingDate: "2026-08-28",
    receptionDate: "2026-08-29",
    location: "Ekeby & Limhamn, Sweden"
  },

  anandKaraj: {
    title: "Anand Karaj",
    subtitle: "The Sikh Wedding Ceremony",
    date: "August 28, 2026",
    description: "The Anand Karaj is the blissful union of two souls, a joyful and spiritual ceremony where vows are taken in the presence of the Guru Granth Sahib. It represents the sacred bond and commitment between two individuals embarking on a journey of love, faith, and togetherness.",
    venue: {
      name: "Ekeby Gurdwara",
      address: "Allégatan 6, 260 51 Ekeby",
      coordinates: { lat: 56.0022, lng: 12.9932 },
      mapLink: "https://maps.app.goo.gl/Jn7XRLLj8h3epUKr7?g_st=ic"
    },
    timeline: [
      { time: "09:00 AM", event: "Breakfast & Gathering", description: "Light refreshments and warm welcomes" },
      { time: "11:00 AM", event: "Anand Karaj Ceremony", description: "Sacred wedding ceremony in the presence of Guru Granth Sahib" },
      { time: "01:00 PM", event: "Langar (Community Lunch)", description: "Traditional vegetarian meal served to all" }
    ],
    dressCode: {
      title: "Dress Code",
      description: "Traditional Indian attire or modest formal wear. Vibrant colors are encouraged!",
      details: [
        "Ladies: Suits or modest dresses",
        "Gentlemen: Kurta Pajama, Sherwani, or formal suits"
      ]
    },
    gurdwaraGuidelines: [
      {
        title: "Head Covering Required",
        description: "All guests must cover their heads as a sign of respect. Scarves will be provided at the entrance. Please note that caps or hats are not allowed."
      },
      {
        title: "Washing Hands",
        description: "Washing hands before entering the prayer hall is necessary and a sign of respect."
      },
      {
        title: "Modest Attire",
        description: "Please ensure shoulders and legs are covered. Avoid shorts, short skirts, or revealing clothing."
      },
      {
        title: "Shoes Removed",
        description: "Remove your shoes before entering the prayer hall. Shoe storage will be available."
      },
      {
        title: "Respectful Seating",
        description: "Sit cross-legged or with legs folded on the floor."
      },
      {
        title: "Photography",
        description: "Photos are welcome, but please be respectful and avoid flash during the ceremony."
      },
      {
        title: "No Tobacco or Alcohol",
        description: "The Gurdwara is a sacred space. Please refrain from bringing tobacco or alcohol. We also kindly ask you to refrain from consuming or bringing snus and E-cigarettes/Vapes to the Gurdwara, and to avoid using them before arrival."
      }
    ]
  },

  reception: {
    title: "Reception",
    subtitle: "Evening Celebration",
    date: "August 29, 2026",
    description: "Join us for an evening of celebration, warmth, and joyful moments as we dance the night away and toast to new beginnings.",
    venue: {
      name: "Luftkastellet",
      address: "Luftkastellet, Utsiktsvägen 10, 216 30 Limhamn",
      coordinates: { lat: 55.5694, lng: 12.8967 },
      mapLink: "https://maps.app.goo.gl/5Ge6zNn9cmTLttqCA?g_st=iw"
    },
    timeline: [
      {
        time: "06:00 PM",
        event: "Reception Starts",
        description: "Join us for an evening of celebration, dinner, and dancing"
      }
    ],
    dressCode: {
      title: "Dress Code",
      description: "Cocktail attire or elegant evening wear. Feel free to continue with traditional attire!",
      details: [
        "Ladies: Cocktail dresses, elegant outfits, or formal suits",
        "Gentlemen: Suits, tuxedos, or traditional formal wear"
      ]
    }
  },

  images: {
    hero: "/assets/images/S&M-9417.jpg",
    heroAlt1: "https://images.unsplash.com/photo-1722952934661-dde241aeb591",
    heroAlt2: "https://images.unsplash.com/photo-1726694065237-2f1be185c5c2",
    ceremony: "/assets/images/S&M-8910.jpg",
    gurdwara: "/assets/images/S&M-8910.jpg",
    celebration: "/assets/images/S&M-9205.jpg",
    reception: "/assets/images/S&M-9205.jpg",
    anandKarajVenue: "/assets/images/ekeby3.jpg",
    receptionVenue: "/assets/images/S&M-9539.jpg",
    florals: "https://images.unsplash.com/photo-1719909538926-cf546f6239b3",
    floralPetals: "https://images.unsplash.com/photo-1521120162284-524a90fd16cf",
    floralWhite: "https://images.unsplash.com/photo-1671366654727-085735ecf340"
  }
};

import axios from 'axios';

const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:8000/api'
  : '/api';

// Mock RSVP submission replaced with real API call
export const submitRSVP = async (rsvpData) => {
  try {
    const response = await axios.post(`${API_URL}/rsvps/`, rsvpData);
    console.log('RSVP Submitted Successfully:', response.data);
    return { success: true, message: 'RSVP received successfully!' };
  } catch (error) {
    console.error('RSVP Submission Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit RSVP');
  }
};
// Fetch all RSVPs (Admin only)
export const fetchRSVPs = async () => {
  try {
    const response = await axios.get(`${API_URL}/rsvps/`);
    return response.data;
  } catch (error) {
    console.error('Fetch RSVPs Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch RSVPs');
  }
};

// Delete RSVP (Admin only)
export const deleteRSVP = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/rsvps/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete RSVP Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete RSVP');
  }
};

// Update RSVP (Admin only)
export const updateRSVP = async (id, rsvpData) => {
  try {
    const response = await axios.put(`${API_URL}/rsvps/${id}`, rsvpData);
    return response.data;
  } catch (error) {
    console.error('Update RSVP Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update RSVP');
  }
};
// Update RSVP Status (Admin only)
export const updateRSVPStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/rsvps/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Update RSVP Status Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update RSVP status');
  }
};
