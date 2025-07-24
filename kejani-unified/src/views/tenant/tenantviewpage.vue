<template>
  <header class="navbar"><div class="container"><div class="logo">Quick Find</div><nav class="nav-links"><ul><li><a href="#" class="nav-link" :class="{ active: activeSection === 'home' }" @click.prevent="setActiveSection('home')">Home</a></li><li><a href="#" class="nav-link" :class="{ active: activeSection === 'about' }" @click.prevent="setActiveSection('about')">About</a></li><li><a href="#" class="nav-link" :class="{ active: activeSection === 'faq' }" @click.prevent="setActiveSection('faq')">FAQs</a></li></ul></nav></div></header>

  <main>
    <section id="home" v-show="activeSection === 'home'"><div class="hero-section"><div class="hero-content"><h1>Welcome, {{ username }} to Quick Find</h1><p>Discover your ideal accommodation with ease. Secure, affordable, and just for you.</p></div></div><div class="container"><div class="dashboard-grid"><div class="lady-img-wrapper"><h2 class="section-title">Find Your Perfect Home</h2><div class="filter-controls"><div class="select-group"><label for="university-select">University:</label><select id="university-select" v-model="selectedUniversity"><option value="">Select University</option><option v-for="uni in universities" :key="uni" :value="uni">{{ uni }}</option></select></div><div class="select-group"><label for="location-select">Location:</label><select id="location-select" v-model="selectedLocation" :disabled="!selectedUniversity || availableLocations.length === 0"><option value="">Select Location</option><option v-for="loc in availableLocations" :key="loc" :value="loc">{{ loc }}</option></select></div></div><div class="filter-buttons"><button :class="{ active: availabilityFilter === 'all' }" @click="availabilityFilter = 'all'">All Homes</button><button :class="{ active: availabilityFilter === 'available' }" @click="availabilityFilter = 'available'">Available</button><button :class="{ active: availabilityFilter === 'not-available' }" @click="availabilityFilter = 'not-available'">Not Available</button></div><div class="house-listings-grid"><div class="house-card" v-for="house in filteredHomes" :key="house.id"><div class="house-image-wrapper"><img :src="house.image" :alt="house.title" /><span :class="['availability-tag', house.availability === 'Available' ? 'tag-available' : 'tag-not-available']">{{ house.availability === 'Available' ? 'Available Rooms: ' + house.roomsAvailable : 'Fully Booked' }}</span></div><div class="house-card-content"><h3>{{ house.title }}</h3><p class="location-text">{{ house.location }}, {{ house.university }}</p><p class="price">KSh {{ house.price }} / month</p><div class="features-list"><span v-for="(feature, index) in house.features" :key="index" class="feature-tag">{{ feature }}</span></div><button class="inquire-btn" @click="showCaretakerDetails(house)">Inquire Now</button></div></div><p v-if="filteredHomes.length === 0" class="no-results">No homes found matching your criteria.</p></div></div></div></div></section>

    <div class="caretaker-modal-overlay" v-if="showCaretakerModal" @click.self="showCaretakerModal = false"><div class="caretaker-modal-content"><h3>Caretaker Details for {{ selectedHouseForInquiry.title }}</h3><p><strong>Name:</strong> {{ selectedHouseForInquiry.caretaker.name }}</p><p><strong>Phone:</strong> <a :href="'tel:' + selectedHouseForInquiry.caretaker.phone">{{ selectedHouseForInquiry.caretaker.phone }}</a></p><p><strong>Email:</strong> <a :href="'mailto:' + selectedHouseForInquiry.caretaker.email">{{ selectedHouseForInquiry.caretaker.email }}</a></p><button class="close-modal-btn" @click="showCaretakerModal = false">Close</button></div></div>

    <section id="about" class="container" v-show="activeSection === 'about'"><h2 class="section-title">About Us</h2><div class="about-content"><div class="about-text"><h3>Our Mission</h3><p>Quick Find is dedicated to simplifying the process of finding student accommodation. We connect students with verified and suitable housing options near their universities, ensuring comfort, safety, and affordability.</p><p>We believe that finding a home away from home should be an exciting journey, not a stressful one. Our platform provides comprehensive listings, clear details, and direct contact with caretakers to make your search seamless.</p><p>Founded in 2024, our team is passionate about supporting students by providing a reliable and user-friendly service. We are constantly expanding our network and improving our features to better serve the student community.</p></div><div class="about-image"><img src="https://cdn.pixabay.com/photo/2021/08/04/13/06/house-6521799_1280.jpg" alt="About Quick Find" /></div></div></section>

    <section id="faq" class="container" v-show="activeSection === 'faq'"><h2 class="section-title">Frequently Asked Questions</h2><div class="faq-search-wrapper"><svg class="faq-search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input type="search" placeholder="Search FAQs..." class="faq-search" v-model="faqSearchTerm" /></div><div v-for="(category, catIndex) in filteredFaqs" :key="catIndex" class="faq-category"><h3>{{ category.category }}</h3><div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="faq-item"><button class="faq-question" :class="{ active: item.isOpen }" @click="toggleFaq(catIndex, itemIndex)">{{ item.question }}<span class="icon" :style="{ transform: item.isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }">&#9660;</span></button><div class="faq-answer" v-show="item.isOpen"><p>{{ item.answer }}</p></div></div></div><div class="faq-cta-wrapper"><a href="mailto:support@quickfind.com" class="faq-cta">Still need help? Contact Us</a></div></section>
  </main>

  <footer>&copy; 2025 Quick Find. All rights reserved.</footer>
</template>

<script>
export default {
  name: 'QuickFindPage',
  data: () => ({
    activeSection: 'home', faqSearchTerm: '', username: 'Guest',
    selectedUniversity: '', selectedLocation: '', availabilityFilter: 'all',
    showCaretakerModal: false, selectedHouseForInquiry: null,
    universities: ['Kabarak University', 'Egerton University', 'Kenyatta University', 'University of Nairobi'],
    homes: [
      { id: 1, title: 'Comfort Hostel', university: 'Kabarak University', location: 'Main Gate', price: 8500, features: ['Good security', 'Near campus', 'Spacious rooms', 'Hot shower'], availability: 'Available', roomsAvailable: 5, image: 'https://images.unsplash.com/photo-1570129477488-c700145c2250?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'Jane Doe', phone: '+254712345678', email: 'jane.doe@example.com' } },
      { id: 2, title: 'Peaceful Bedsitters', university: 'Kabarak University', location: 'Gate B', price: 6000, features: ['Affordable', 'Quiet environment', 'Self-contained', 'Good water supply'], availability: 'Available', roomsAvailable: 2, image: 'https://images.unsplash.com/photo-1560520633-ac473522216e?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'John Smith', phone: '+254723456789', email: 'john.smith@example.com' } },
      { id: 3, title: 'Campus View Apartments', university: 'Egerton University', location: 'Njoro', price: 12000, features: ['Modern', 'Spacious', 'Balcony', 'Secure parking', 'Close to main road'], availability: 'Not Available', roomsAvailable: 0, image: 'https://images.unsplash.com/photo-1582268712211-744383c38b2d?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'Alice Brown', phone: '+254734567890', email: 'alice.brown@example.com' } },
      { id: 4, title: 'Student Plaza Hostels', university: 'University of Nairobi', location: 'Parklands', price: 9000, features: ['Fully furnished', 'Wifi included', 'Gym access', '24/7 caretaker'], availability: 'Available', roomsAvailable: 10, image: 'https://images.unsplash.com/photo-1596706864150-1372c2122608?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'Bob White', phone: '+254745678901', email: 'bob.white@example.com' } },
      { id: 5, title: 'Green Dorms', university: 'Kabarak University', location: 'Milimani', price: 7000, features: ['Quiet neighborhood', 'Access to shops', 'Walled compound'], availability: 'Available', roomsAvailable: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c794?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'Emily Green', phone: '+254756789012', email: 'emily.green@example.com' } },
      { id: 6, title: 'The Haven Bedsitters', university: 'Egerton University', location: 'Kampi ya Moto', price: 5500, features: ['Affordable', 'Spacious', 'Good water supply', 'Close to market'], availability: 'Not Available', roomsAvailable: 0, image: 'https://images.unsplash.com/photo-1560185007-c56f61645e75?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'Michael Blue', phone: '+254767890123', email: 'michael.blue@example.com' } },
      { id: 7, title: 'UON Hostel One', university: 'University of Nairobi', location: 'Kasarani', price: 7500, features: ['Near bus stop', 'Good amenities', 'Friendly community'], availability: 'Available', roomsAvailable: 8, image: 'https://images.unsplash.com/photo-1502672260268-ad001b913670?auto=format&fit=crop&w=600&q=80', caretaker: { name: 'Sarah Black', phone: '+254778901234', email: 'sarah.black@example.com' } }
    ],
    faqs: [
      { category: 'General Questions', items: [{ question: 'What is Quick Find?', answer: 'Quick Find is an online platform that helps university students find suitable and affordable accommodation near their campuses. We list hostels, bedsitters, and apartments from various trusted providers.', isOpen: false }, { question: 'How do I use Quick Find?', answer: 'Simply navigate to the "Home" section, select your university and location, and then filter to see available properties. You can view details and directly contact caretakers.', isOpen: false } ] },
      { category: 'Booking & Payments', items: [{ question: 'How do I book a hostel?', answer: 'After finding a suitable property, you can contact the caretaker directly using the provided phone number. Quick Find does not handle direct bookings or payments.', isOpen: false }, { question: 'What payment methods are accepted?', answer: 'Payment methods are determined by the individual property caretaker. Most commonly, M-Pesa and bank transfers are accepted in Kenya.', isOpen: false }, { question: 'Is there a booking fee?', answer: 'Quick Find does not charge any booking fees. Our service is free for students to find listings.', isOpen: false } ] },
      { category: 'Property Information', items: [{ question: 'How accurate is the information?', answer: 'We strive to provide accurate and up-to-date information. However, it\'s always recommended to verify details directly with the caretaker before making any commitments.', isOpen: false }, { question: 'Can I visit the property before booking?', answer: 'Yes, we highly recommend arranging a visit to the property. Contact the caretaker to schedule a viewing.', isOpen: false } ] }
    ]
  }),
  watch: {
    selectedUniversity(newUniversity) {
      if (!newUniversity) this.selectedLocation = '';
      else if (this.selectedLocation && !this.availableLocations.includes(this.selectedLocation)) this.selectedLocation = '';
    }
  },
  methods: {
    setActiveSection(sectionId) { this.activeSection = sectionId; },
    toggleFaq(catIndex, itemIndex) {
      this.faqs[catIndex].items.forEach((faqItem, idx) => { if (idx !== itemIndex && faqItem.isOpen) faqItem.isOpen = false; });
      this.faqs[catIndex].items[itemIndex].isOpen = !this.faqs[catIndex].items[itemIndex].isOpen;
    },
    showCaretakerDetails(house) { this.selectedHouseForInquiry = house; this.showCaretakerModal = true; }
  },
  computed: {
    filteredFaqs() {
      const searchTerm = this.faqSearchTerm.toLowerCase().trim();
      return searchTerm ? this.faqs.map(cat => ({ ...cat, items: cat.items.filter(item => item.question.toLowerCase().includes(searchTerm) || item.answer.toLowerCase().includes(searchTerm)) })).filter(cat => cat.items.length > 0) : this.faqs.map(cat => ({ ...cat, items: cat.items }));
    },
    availableLocations() {
      return this.selectedUniversity ? [...new Set(this.homes.filter(home => home.university === this.selectedUniversity).map(home => home.location))].sort() : [];
    },
    filteredHomes() {
      let homes = this.homes;
      if (this.selectedUniversity) homes = homes.filter(home => home.university === this.selectedUniversity);
      if (this.selectedLocation) homes = homes.filter(home => home.location === this.selectedLocation);
      if (this.availabilityFilter === 'available') homes = homes.filter(home => home.availability === 'Available');
      else if (this.availabilityFilter === 'not-available') homes = homes.filter(home => home.availability === 'Not Available');
      return homes;
    }
  }
};
</script>

<style scoped>
/* Basic Reset & Body Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F0F4F8; color: #333; line-height: 1.6; }
.container { max-width: 1200px; margin: auto; padding: 20px; }

/* Navbar Styles */
.navbar { background-color: #1A237E; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
.navbar .container { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; }
.logo { font-size: 28px; font-weight: bold; color: #FFF; }
.nav-links ul { list-style: none; display: flex; gap: 25px; }
.nav-links a { text-decoration: none; color: #BBDEFB; font-weight: 600; font-size: 17px; transition: color .3s ease, transform .2s ease; }
.nav-links a:hover { color: #FFF; transform: translateY(-2px); }
.nav-links a.active { color: #FFF; border-bottom: 2px solid #FFF; padding-bottom: 3px; }

/* Hero Section */
.hero-section { background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover; color: #FFF; text-align: center; padding: 120px 20px; position: relative; overflow: hidden; }
.hero-section::before { content: ""; position: absolute; inset: 0; background-color: rgba(26, 35, 126, 0.7); z-index: 1; }
.hero-content { position: relative; z-index: 2; }
.hero-section h1 { font-size: 55px; margin-bottom: 20px; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4); }
.hero-section p { font-size: 22px; max-width: 800px; margin: 0 auto; opacity: 0.9; }

/* Section Headings */
h2.section-title { text-align: center; margin: 40px 0 30px; font-size: 38px; color: #0D47A1; position: relative; padding-bottom: 10px; }
h2.section-title::after { content: ''; position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); width: 80px; height: 4px; background-color: #42A5F5; border-radius: 2px; }

/* Dashboard Grid */
#home .container { padding-top: 40px; }
.dashboard-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; align-items: flex-start; }
.lady-img-wrapper { min-width: 300px; }
.lady-img-wrapper img { width: 100%; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); object-fit: cover; transition: transform .3s ease; }
.lady-img-wrapper img:hover { transform: scale(1.02); }
.insights-text { margin-top: 20px; text-align: center; }
.insights-text p { margin-bottom: 15px; color: #555; }
.view-insights-btn { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #FFF; text-decoration: none; border-radius: 5px; transition: background-color .3s ease; }
.view-insights-btn:hover { background-color: #388E3C; }

/* Filters & Controls */
.filter-controls { display: flex; gap: 20px; margin-bottom: 25px; flex-wrap: wrap; }
.select-group { flex: 1; min-width: 200px; }
.select-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #1A237E; }
.select-group select { width: 100%; padding: 10px 15px; border: 1px solid #B0BEC5; border-radius: 6px; font-size: 16px; background-color: #FFF; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; cursor: pointer; }
.select-group select:focus { outline: none; border-color: #42A5F5; box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2); }
.select-group select:disabled { background-color: #ECEFF1; cursor: not-allowed; }

.filter-buttons { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; justify-content: center; }
.filter-buttons button { padding: 10px 20px; border: 1px solid #42A5F5; border-radius: 25px; background-color: #E3F2FD; color: #1A237E; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.filter-buttons button:hover { background-color: #BBDEFB; border-color: #2196F3; }
.filter-buttons button.active { background-color: #1A237E; color: #FFF; border-color: #1A237E; box-shadow: 0 4px 8px rgba(26, 35, 126, 0.3); }

/* House Listings Grid & Card */
.house-listings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
.house-card { background: #FFF; border-radius: 12px; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1); overflow: hidden; transition: transform .3s ease, box-shadow .3s ease; display: flex; flex-direction: column; }
.house-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
.house-image-wrapper { width: 100%; height: 200px; position: relative; overflow: hidden; }
.house-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.availability-tag { position: absolute; top: 15px; left: 15px; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 700; color: #FFF; z-index: 10; }
.tag-available { background-color: #4CAF50; }
.tag-not-available { background-color: #F44336; }

.house-card-content { padding: 20px; display: flex; flex-direction: column; flex-grow: 1; }
.house-card-content h3 { font-size: 24px; margin-bottom: 8px; color: #1A237E; }
.location-text { font-size: 15px; color: #666; margin-bottom: 10px; }
.price { font-size: 20px; font-weight: 700; color: #0D47A1; margin-bottom: 15px; }
.features-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.feature-tag { background-color: #E3F2FD; color: #0D47A1; padding: 5px 10px; border-radius: 5px; font-size: 13px; white-space: nowrap; }
.inquire-btn { display: block; width: 100%; padding: 12px; background-color: #FFC107; color: #333; border: none; border-radius: 8px; font-size: 17px; font-weight: 700; cursor: pointer; transition: background-color .3s ease, transform .2s ease; margin-top: auto; }
.inquire-btn:hover { background-color: #FFB300; transform: translateY(-2px); }
.no-results { text-align: center; grid-column: 1 / -1; color: #777; font-size: 18px; padding: 30px; background-color: #FFF; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }

/* Caretaker Modal */
.caretaker-modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.caretaker-modal-content { background-color: #FFF; padding: 30px; border-radius: 10px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); max-width: 450px; width: 90%; text-align: center; position: relative; }
.caretaker-modal-content h3 { color: #1A237E; margin-bottom: 20px; font-size: 26px; }
.caretaker-modal-content p { font-size: 17px; margin-bottom: 10px; color: #555; }
.caretaker-modal-content p strong { color: #333; }
.caretaker-modal-content a { color: #42A5F5; text-decoration: none; font-weight: 600; }
.caretaker-modal-content a:hover { text-decoration: underline; }
.close-modal-btn { position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #777; transition: color .3s ease; }
.close-modal-btn:hover { color: #333; }

/* About Section */
.about-content { background-color: #FFF; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; flex-wrap: wrap; gap: 30px; align-items: center; }
.about-text { flex: 1 1 500px; font-size: 17px; color: #444; }
.about-text h3 { font-size: 30px; color: #1A237E; margin-bottom: 15px; }
.about-text p:not(:last-child) { margin-bottom: 15px; }
.about-image { flex: 1 1 300px; display: flex; justify-content: center; align-items: center; }
.about-image img { max-width: 100%; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); }

/* FAQ Section */
.faq-search-wrapper { margin-bottom: 30px; position: relative; }
.faq-search { width: 100%; padding: 14px 18px; font-size: 17px; border: 1px solid #B0BEC5; border-radius: 8px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.08); transition: border-color .3s ease, box-shadow .3s ease; padding-left: 45px; }
.faq-search:focus { outline: none; border-color: #42A5F5; box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2); }
.faq-search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #78909C; }
.faq-category { margin-bottom: 35px; background-color: #FFF; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 25px; }
.faq-category h3 { font-size: 26px; margin-bottom: 20px; color: #0D47A1; border-bottom: 1px solid #E3F2FD; padding-bottom: 10px; }
.faq-item { margin-bottom: 15px; }
.faq-question { display: flex; justify-content: space-between; align-items: center; background-color: #E3F2FD; padding: 15px 20px; font-size: 18px; font-weight: 600; border: none; width: 100%; text-align: left; cursor: pointer; border-radius: 6px; transition: background-color .3s ease, color .3s ease; color: #1A237E; }
.faq-question:hover { background-color: #BBDEFB; color: #1A237E; }
.faq-question.active { background-color: #42A5F5; color: #FFF; }
.faq-question .icon { font-size: 20px; transition: transform .3s ease; }
.faq-answer { padding: 15px 25px; background: #F8F9FA; border-left: 4px solid #42A5F5; border-radius: 0 0 6px 6px; color: #555; font-size: 16px; line-height: 1.5; }
.faq-cta-wrapper { text-align: center; margin-top: 50px; }
.faq-cta { background-color: #4CAF50; color: #FFF; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; transition: background-color .3s ease, transform .2s ease; display: inline-block; box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3); }
.faq-cta:hover { background-color: #388E3C; transform: translateY(-3px); }

/* Footer Styles */
footer { text-align: center; padding: 25px; font-size: 15px; color: #78909C; background-color: #E3F2FD; margin-top: 50px; border-top: 1px solid #CFD8DC; }

/* Responsive Design */
@media (max-width: 992px) {
    .dashboard-grid { grid-template-columns: 1fr; }
    .lady-img-wrapper img { max-width: 60%; margin: 0 auto 20px; display: block; }
    .about-content { flex-direction: column; text-align: center; }
    .about-image img { max-width: 80%; }
}
@media (max-width: 768px) {
    .navbar .container { flex-direction: column; gap: 15px; }
    .nav-links ul { flex-wrap: wrap; justify-content: center; gap: 15px; }
    .hero-section h1 { font-size: 40px; }
    .hero-section p { font-size: 18px; }
    h2.section-title { font-size: 30px; }
    .filter-controls { flex-direction: column; gap: 15px; }
    .filter-buttons { flex-direction: column; }
    .house-listings-grid { grid-template-columns: 1fr; }
    .house-card { flex-direction: row; align-items: center; }
    .house-image-wrapper { width: 40%; height: 150px; flex-shrink: 0; }
    .house-card-content { flex-grow: 1; padding: 15px; }
    .availability-tag { top: 10px; left: 10px; padding: 4px 8px; font-size: 12px; }
    .house-card-content h3 { font-size: 20px; }
    .price { font-size: 18px; }
    .features-list { margin-bottom: 10px; }
    .feature-tag { font-size: 12px; padding: 4px 8px; }
    .inquire-btn { font-size: 15px; padding: 10px; }
    .article-card, .faq-category { padding: 20px; }
    .faq-question { font-size: 16px; padding: 12px 15px; }
    .faq-answer { font-size: 14px; }
    .faq-cta { font-size: 16px; padding: 12px 24px; }
}
@media (max-width: 480px) {
    .container { padding: 15px; }
    .logo { font-size: 24px; }
    .nav-links a { font-size: 15px; }
    .hero-section { padding: 80px 15px; }
    .hero-section h1 { font-size: 32px; }
    .hero-section p { font-size: 16px; }
    h2.section-title { font-size: 26px; margin: 30px 0 20px; }
    .faq-search { font-size: 15px; padding: 12px 15px 12px 40px; }
    .house-card { flex-direction: column; align-items: stretch; }
    .house-image-wrapper { width: 100%; height: 200px; }
    .house-card-content { padding: 20px; }
}
</style>