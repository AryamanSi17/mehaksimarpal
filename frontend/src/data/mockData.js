// Mock data for wedding website
export const weddingData = {
  couple: {
    bride: "Mehak",
    groom: "Simarpal",
    weddingDate: "2025-08-28",
    receptionDate: "2025-08-29",
    location: "Ekeby & Malmö, Sweden"
  },
  
  anandKaraj: {
    title: "Anand Karaj",
    subtitle: "The Sikh Wedding Ceremony",
    date: "August 28, 2025",
    description: "The Anand Karaj is the blissful union of two souls, a joyful and spiritual ceremony where vows are taken in the presence of the Guru Granth Sahib. It represents the sacred bond and commitment between two individuals embarking on a journey of love, faith, and togetherness.",
    venue: {
      name: "Ekeby Gurdwara",
      address: "Ekeby Kyrkväg 10, 590 16 Ekeby, Sweden",
      coordinates: { lat: 58.4108, lng: 15.5489 }
    },
    timeline: [
      { time: "09:00 AM", event: "Breakfast & Gathering", description: "Light refreshments and warm welcomes" },
      { time: "11:00 AM", event: "Anand Karaj Ceremony", description: "Sacred wedding ceremony in the presence of Guru Granth Sahib" },
      { time: "01:00 PM", event: "Langar (Community Lunch)", description: "Traditional vegetarian meal served to all" },
      { time: "03:00 PM", event: "Afternoon Tea", description: "Refreshments and mingling" }
    ],
    dressCode: {
      title: "Dress Code",
      description: "Traditional Indian attire or modest formal wear. Vibrant colors are encouraged!",
      details: [
        "Ladies: Suits, Sarees, or modest dresses",
        "Gentlemen: Kurta Pajama, Sherwani, or formal suits"
      ]
    },
    gurdwaraGuidelines: [
      {
        title: "Head Covering Required",
        description: "All guests must cover their heads as a sign of respect. Scarves will be provided at the entrance."
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
        description: "Sit cross-legged or with legs folded on the floor. Men and women typically sit on opposite sides."
      },
      {
        title: "Photography",
        description: "Photos are welcome, but please be respectful and avoid flash during the ceremony."
      },
      {
        title: "No Tobacco or Alcohol",
        description: "The Gurdwara is a sacred space. Please refrain from bringing tobacco or alcohol."
      }
    ]
  },
  
  reception: {
    title: "Reception",
    subtitle: "Evening Celebration",
    date: "August 29, 2025",
    description: "Join us for an evening of celebration, warmth, and joyful moments as we dance the night away and toast to new beginnings.",
    venue: {
      name: "Elite Hotel Savoy",
      address: "Norra Vallgatan 62, 211 22 Malmö, Sweden",
      coordinates: { lat: 55.6050, lng: 13.0038 }
    },
    timeline: [
      { 
        time: "06:00 PM", 
        event: "Cocktails & Mingling", 
        description: "Time for mingling and enjoying beautiful evening views with welcome drinks"
      },
      { 
        time: "07:30 PM", 
        event: "Dinner Service", 
        description: "Enjoy a delicious multi-course meal as we raise a toast to love and new beginnings"
      },
      { 
        time: "09:00 PM", 
        event: "Dancing & Celebration", 
        description: "Let's celebrate! Dance the night away with live DJ and entertainment"
      },
      { 
        time: "12:00 AM", 
        event: "Farewell", 
        description: "Thank you for celebrating with us!"
      }
    ],
    dressCode: {
      title: "Dress Code",
      description: "Cocktail attire or elegant evening wear. Feel free to continue with traditional attire!",
      details: [
        "Ladies: Cocktail dresses, elegant sarees, or formal suits",
        "Gentlemen: Suits, tuxedos, or traditional formal wear"
      ]
    }
  },

  images: {
    hero: "https://images.unsplash.com/photo-1665960213508-48f07086d49c",
    heroAlt1: "https://images.unsplash.com/photo-1722952934661-dde241aeb591",
    heroAlt2: "https://images.unsplash.com/photo-1726694065237-2f1be185c5c2",
    ceremony: "https://images.unsplash.com/photo-1587271315329-e32a009f7f22",
    gurdwara: "https://images.unsplash.com/photo-1642355099716-a88a41a17887",
    celebration: "https://images.unsplash.com/photo-1758924411346-4e49c4f3afde",
    reception: "https://images.unsplash.com/photo-1768777270907-235286662f98",
    florals: "https://images.unsplash.com/photo-1719909538926-cf546f6239b3",
    floralPetals: "https://images.unsplash.com/photo-1521120162284-524a90fd16cf",
    floralWhite: "https://images.unsplash.com/photo-1671366654727-085735ecf340"
  }
};

// Mock RSVP submission
export const submitRSVP = async (rsvpData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('RSVP Submitted:', rsvpData);
      // Store in localStorage for demo
      const existingRSVPs = JSON.parse(localStorage.getItem('rsvps') || '[]');
      existingRSVPs.push({ ...rsvpData, id: Date.now() });
      localStorage.setItem('rsvps', JSON.stringify(existingRSVPs));
      resolve({ success: true, message: 'RSVP received successfully!' });
    }, 1000);
  });
};
