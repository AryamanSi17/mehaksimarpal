# Wedding Website PRD - Mehak & Simarpal

## Project Overview
**Project Name:** Mehak & Simarpal Wedding Website  
**Date Created:** March 3, 2026  
**Status:** MVP Complete (Frontend Only)

## Original Problem Statement
Build a full responsive website for an elegant Sikh wedding celebration, based on the provided PDF design specifications. The website should feature a sophisticated color palette (burgundy, cream, forest green, dusty rose) and include comprehensive information about both the Anand Karaj ceremony and evening reception.

## User Personas
1. **Wedding Guests** - Need clear information about events, venues, timings, dress codes, and ability to RSVP
2. **Family Members** - Want detailed timeline, cultural guidelines, and venue locations
3. **Out-of-town Guests** - Require venue addresses, Google Maps integration, and comprehensive day schedules

## Core Requirements

### Design Requirements (Static)
- Color Palette:
  - Deep Burgundy/Maroon: #2A0306
  - Dark Forest Green: #101F12
  - Off-White/Cream: #E5E1C7
  - Camel/Beige: #899064
  - Dusty Rose/Mauve: #D4B99D
  - Terracotta/Muted Rose: #A16C56
- Fully responsive design (mobile, tablet, desktop)
- Elegant typography with serif fonts for headings
- Smooth transitions and hover effects
- Professional wedding photography integration

### Functional Requirements
1. **Navigation**: Header with logo and menu (Home, Anand Karaj, Reception, RSVP)
2. **Home Page**: Hero section with countdown, welcome message, event overview cards
3. **Anand Karaj Page**: Ceremony details, timeline, Gurdwara guidelines, dress code, venue map
4. **Reception Page**: Evening timeline, venue details, dress code, image gallery
5. **RSVP Page**: Multi-guest form with food preferences/allergies, event selection
6. **Footer**: Quick links, contact info, copyright

## What's Been Implemented

### ✅ Completed Features (March 3, 2026)

#### Frontend Components
- `/app/frontend/src/data/mockData.js` - Wedding data and mock RSVP submission
- `/app/frontend/src/pages/Home.jsx` - Hero with live countdown, welcome section, event cards
- `/app/frontend/src/pages/AnandKaraj.jsx` - Ceremony page with timeline, venue map, accordion guidelines
- `/app/frontend/src/pages/Reception.jsx` - Reception page with evening timeline and venue details
- `/app/frontend/src/pages/RSVP.jsx` - Interactive form with multiple guests, food preferences
- `/app/frontend/src/components/Header.jsx` - Responsive navigation with mobile menu
- `/app/frontend/src/components/Footer.jsx` - Site footer with links and contact info
- `/app/frontend/src/App.js` - Main app with routing
- `/app/frontend/src/App.css` - Custom styles and smooth scroll behavior

#### Key Features Delivered
✅ Live countdown timer to wedding date  
✅ Responsive design across all devices  
✅ Google Maps integration for both venues  
✅ Comprehensive timeline for both events (breakfast, ceremony, lunch, reception)  
✅ Gurdwara guidelines with stylish accordion component  
✅ Multi-guest RSVP form with dynamic add/remove guests  
✅ Food preference and allergy tracking  
✅ Event selection checkboxes (Anand Karaj & Reception)  
✅ Beautiful image integration with curated wedding photography  
✅ Smooth animations and hover effects  
✅ Custom scrollbar styling  
✅ Toast notifications for RSVP confirmations  
✅ Mobile-responsive navigation menu  
✅ Form validation with user feedback  

#### Mock Data Implementation
- RSVP submissions stored in localStorage for demo purposes
- All event data, timelines, and venue information in mockData.js
- Dummy addresses for venues with Google Maps coordinates

## Prioritized Backlog

### P0 Features (Backend Development - Next Phase)
1. **Backend API Development**
   - Create MongoDB models for RSVPs
   - Implement RSVP submission endpoint
   - Add email notification service for RSVP confirmations
   - Admin dashboard to view all RSVPs
   
2. **Database Integration**
   - Store guest information
   - Track attendance for each event
   - Store food preferences/allergies
   - Generate guest reports

### P1 Features (Enhancements)
1. Photo gallery section with actual couple photos
2. Story/How we met section
3. Gift registry information
4. Travel & accommodation recommendations
5. FAQ section
6. Admin authentication and RSVP management panel

### P2 Features (Nice-to-have)
1. Guest messaging/guestbook
2. Photo upload by guests
3. Live event updates
4. Social media integration
5. Wedding day live stream link
6. Post-wedding thank you page

## Next Tasks
1. **Backend Development**
   - Set up MongoDB models for RSVP data
   - Create POST /api/rsvp endpoint
   - Integrate email service for confirmations
   - Connect frontend forms to backend API
   - Add GET /api/rsvp endpoint for admin viewing

2. **Testing**
   - Test RSVP form submission end-to-end
   - Verify email notifications
   - Test on multiple devices and browsers
   - Performance testing

3. **Content Updates**
   - Replace placeholder images with actual couple photos
   - Update venue addresses if needed
   - Finalize timeline details
   - Add any additional Gurdwara guidelines

## Technical Architecture

### Frontend Stack
- React 19.0.0
- React Router DOM 7.5.1
- Shadcn UI components
- Tailwind CSS
- Lucide React icons
- Sonner for toast notifications
- Axios for API calls

### Backend Stack (To be implemented)
- FastAPI (Python)
- MongoDB with Motor (async driver)
- Pydantic for data validation
- Email service (to be chosen)

### Design Patterns
- Component-based architecture
- Mock data layer for easy backend integration
- Responsive-first design approach
- Mobile menu with hamburger navigation

## Success Metrics
- Website loads in under 2 seconds
- 90%+ mobile responsiveness score
- RSVP form submission success rate > 95%
- Zero console errors in production
- Cross-browser compatibility (Chrome, Safari, Firefox, Edge)

---
*Last Updated: March 3, 2026*
