<template>
  <header class="navbar">
    <div class="container">
      <div class="logo">Quick Find</div>
      <nav class="nav-links">
        <ul>
          <li>
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeSection === 'home' }"
              @click.prevent="setActiveSection('home')"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeSection === 'about' }"
              @click.prevent="setActiveSection('about')"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeSection === 'faq' }"
              @click.prevent="setActiveSection('faq')"
              >FAQs</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section id="home" v-show="activeSection === 'home'">
      <div class="hero-section">
        <div class="hero-content">
          <h1>Welcome, {{ username }}, to Quick Find</h1>
          <p>
            Discover your ideal accommodation with ease. Secure, affordable, and
            just for you.
          </p>
        </div>
      </div>

      <div class="container">
        <h2 class="section-title">Find Your Perfect Home</h2>
        <div class="filter-controls">
          <div class="select-group">
            <label for="university-select">University:</label>
            <select id="university-select" v-model="selectedUniversity">
              <option value="">Select University</option>
              <option v-for="uni in universities" :key="uni.id" :value="uni.id">
                {{ uni.name }}
              </option>
            </select>
          </div>
          <div class="select-group">
            <label for="location-select">Location:</label>
            <select
              id="location-select"
              v-model="selectedLocation"
              :disabled="!selectedUniversity || availableLocations.length === 0"
            >
              <option value="">Select Location</option>
              <option
                v-for="loc in availableLocations"
                :key="loc.id"
                :value="loc.id"
              >
                {{ loc.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="filter-buttons">
          <button
            :class="{ active: availabilityFilter === 'all' }"
            @click="availabilityFilter = 'all'"
          >
            All Homes
          </button>
          <button
            :class="{ active: availabilityFilter === 'available' }"
            @click="availabilityFilter = 'available'"
          >
            Available
          </button>
          <button
            :class="{ active: availabilityFilter === 'not-available' }"
            @click="availabilityFilter = 'not-available'"
          >
            Not Available
          </button>
        </div>

        <div class="house-listings-grid">
          <div
            class="house-card"
            v-for="house in filteredHomes"
            :key="house.id"
          >
            <div class="house-image-wrapper">
              <img
                :src="house.primaryImageUrl || placeholderImage"
                :alt="house.title || house.name"
              />
              <span
                :class="[
                  'availability-tag',
                  house.isAvailable ? 'tag-available' : 'tag-not-available',
                ]"
              >
                <template v-if="house.isAvailable"
                  >Available Rooms:
                  {{ house.availableRooms ?? "N/A" }}</template
                >
                <template v-else>Fully Booked</template>
              </span>
            </div>

            <div class="house-card-content">
              <h3>{{ house.name || house.title }}</h3>
              <p class="location-text">
                {{ house.locationName || "Unknown Location" }},
                {{ house.universityName || "Unknown University" }}
              </p>
              <p class="price">KSh {{ house.price }} / month</p>
              <div class="features-list">
                <span
                  v-for="(feature, index) in house.features || []"
                  :key="index"
                  class="feature-tag"
                  >{{ feature }}</span
                >
              </div>
              <button class="inquire-btn" @click="showCaretakerDetails(house)">
                Inquire Now
              </button>
            </div>
          </div>
          <p
            v-if="
              selectedUniversity &&
              selectedLocation &&
              !filteredHomes.length &&
              noHostelsMessage
            "
            class="no-results"
          >
            {{ noHostelsMessage }}
          </p>
          <p v-else-if="filteredHomes.length === 0" class="no-results">
            Choose University and Location first.
          </p>
        </div>
      </div>
      <div
        class="caretaker-modal-overlay"
        v-if="showCaretakerModal && selectedHouseForInquiry"
        @click.self="showCaretakerModal = false"
      >
        <div class="caretaker-modal-content">
          <h3>Caretaker Details for {{ selectedHouseForInquiry.name }}</h3>
          <p>
            <strong>Name:</strong>
            {{ selectedHouseForInquiry.caretaker?.name || "Not Provided" }}
          </p>
          <p>
            <strong>Phone:</strong>
            <a :href="'tel:' + selectedHouseForInquiry.caretaker?.phone">{{
              selectedHouseForInquiry.caretaker?.phone || "Not Provided"
            }}</a>
          </p>
          <p>
            <strong>Email:</strong>
            <a :href="'mailto:' + selectedHouseForInquiry.caretaker?.email">{{
              selectedHouseForInquiry.caretaker?.email || "Not Provided"
            }}</a>
          </p>
          <hr class="modal-divider" />
          <p>
            <strong>Hostel Type:</strong>
            {{ selectedHouseForInquiry.hostelType || "N/A" }}
          </p>
          <p>
            <strong>Monthly Rent:</strong> KSh
            {{ selectedHouseForInquiry.price || "N/A" }}
          </p>
          <p>
            <strong>Deposit:</strong> KSh
            {{ selectedHouseForInquiry.deposit || "N/A" }}
          </p>
          <p>
            <strong>Available Rooms:</strong>
            {{ selectedHouseForInquiry.availableRooms ?? "N/A" }}
          </p>
          <p>
            <strong>WhatsApp:</strong>
            <a
              :href="`https://wa.me/${selectedHouseForInquiry.caretaker?.phone.replace(
                /\D/g,
                ''
              )}?text=Hi,%20I%27m%20interested%20in%20your%20hostel:%20${
                selectedHouseForInquiry.name
              }`"
              target="_blank"
              rel="noopener"
              class="whatsapp-link"
              >Chat on WhatsApp</a
            >
          </p>
          <button class="close-modal-btn" @click="showCaretakerModal = false">
            Close
          </button>
        </div>
      </div>
    </section>

    <section id="about" class="container" v-show="activeSection === 'about'">
      <h2 class="section-title">About Us</h2>
      <div class="about-wrapper text-left">
        <div class="about-text">
          <h3>Our Mission</h3>
          <p>
            At Quick Find, we're committed to making housing more
            accessible, secure, and convenient. We understand the hustle of
            finding a reliable hostel near your university, so we've built a
            platform that brings options closer to you, helping you compare and
            choose the perfect place with ease.
          </p>
        </div>
        <div class="about-image">
          <img
            src="https://images.unsplash.com/photo-1581092795360-8209e5445d0f?auto=format&fit=crop&w=800&q=80"
            alt="Our Mission"
          />
        </div>
      </div>
    </section>

    <section id="faq" class="container" v-show="activeSection === 'faq'">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-list text-left">
        <div class="faq-item">
          <button @click="toggleFaq(0)" :aria-expanded="activeFaq === 0">
            How do I book a hostel?
          </button>
          <p v-show="activeFaq === 0">
            Simply select a university and location, view the homes, and contact
            the caretaker directly from the listing.
          </p>
        </div>
        <div class="faq-item">
          <button @click="toggleFaq(1)" :aria-expanded="activeFaq === 1">
            Are the listed hostels verified?
          </button>
          <p v-show="activeFaq === 1">
            Yes, all listings are approved by the platform and often submitted
            by official caretakers or admins.
          </p>
        </div>
        <div class="faq-item">
          <button @click="toggleFaq(2)" :aria-expanded="activeFaq === 2">
            What if a caretaker doesn't respond?
          </button>
          <p v-show="activeFaq === 2">
            You can report issues through the contact form or try another
            listing in the same area.
          </p>
        </div>
        <div class="faq-item">
          <button @click="toggleFaq(3)" :aria-expanded="activeFaq === 3">
            Is there a charge to use this platform?
          </button>
          <p v-show="activeFaq === 3">
            No. Quick Find is completely free for students looking for
            accommodation.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useUniversityStore } from "@/stores/additionStore.ts";
const universityStore = useUniversityStore();
const username = ref("Guest"),
  activeSection = ref("home"),
  selectedUniversity = ref(""),
  selectedLocation = ref(""),
  availabilityFilter = ref("all"),
  locations = ref([]),
  homes = ref([]),
  noHostelsMessage = ref(""),
  showCaretakerModal = ref(false),
  selectedHouseForInquiry = ref(null),
  inquiryMessage = ref(""),
  activeFaq = ref(null);
const toggleFaq = (index) => {
    activeFaq.value = activeFaq.value === index ? null : index;
  },
  universities = computed(() => universityStore.universities),
  availableLocations = computed(() => locations.value),
  filteredHomes = computed(() => {
    if (availabilityFilter.value === "available")
      return homes.value.filter((h) => h.isAvailable);
    else if (availabilityFilter.value === "not-available")
      return homes.value.filter((h) => !h.isAvailable);
    return homes.value;
  });
onMounted(async () => {
  await universityStore.fetchUniversities();
});
watch(selectedUniversity, async (newUni) => {
  selectedLocation.value = "";
  homes.value = [];
  noHostelsMessage.value = "";
  if (newUni) locations.value = await universityStore.getLocations(newUni);
  else locations.value = [];
});
watch(selectedLocation, async (newLoc) => {
  noHostelsMessage.value = "";
  if (selectedUniversity.value && newLoc) {
    const rawHomes = await universityStore.getHostels(
      selectedUniversity.value,
      newLoc
    );
    if (rawHomes.length === 0) noHostelsMessage.value = "No hostels here";
    homes.value = rawHomes.map((h) => ({
      id: h.id,
      name: h.name || "Untitled",
      primaryImageUrl:
        h.primaryImageUrl ||
        h.imageUrls?.[0] ||
        "https://via.placeholder.com/300x200?text=No+Image",
      universityName:
        universities.value.find((u) => u.id === selectedUniversity.value)
          ?.name || "Unknown",
      locationName:
        locations.value.find((l) => l.id === newLoc)?.name || "Unknown",
      price: h.price ?? "N/A",
      deposit: h.deposit ?? "N/A",
      hostelType: h.hostelType || "N/A",
      features: h.features || [],
      isAvailable: !!h.isAvailable,
      availableRooms: h.availableRooms ?? 0,
      caretaker: {
        name: h.caretaker?.name || "Not Provided",
        phone: h.caretaker?.phone || "Not Provided",
        email: h.caretaker?.email || "Not Provided",
      },
    }));
  } else homes.value = [];
});
function setActiveSection(sectionId) {
  activeSection.value = sectionId;
}
function showCaretakerDetails(house) {
  selectedHouseForInquiry.value = {
    ...house,
    caretaker: {
      name: house.caretaker?.name || "Not Provided",
      phone: house.caretaker?.phone || "Not Provided",
      email: house.caretaker?.email || "Not Provided",
    },
  };
  showCaretakerModal.value = true;
}
async function submitInquiry() {
  if (!inquiryMessage.value.trim()) {
    alert("Please enter a message.");
    return;
  }
  console.log("Inquiry submitted:", {
    house: selectedHouseForInquiry.value.name,
    caretaker: selectedHouseForInquiry.value.caretaker,
    message: inquiryMessage.value,
  });
  alert("Your inquiry has been sent!");
  inquiryMessage.value = "";
  showCaretakerModal.value = false;
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f8fc;
  color: #333;
  line-height: 1.6;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
}
.navbar {
  background-color: #1a237e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}
.logo {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
}
.nav-links ul {
  list-style: none;
  display: flex;
  gap: 25px;
}
.nav-links a {
  text-decoration: none;
  color: #bbdefb;
  font-weight: 600;
  font-size: 17px;
  transition: all 0.3s ease;
}
.nav-links a:hover,
.nav-links a.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}
.hero-section {
  background: url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80")
    no-repeat center center/cover;
  color: white;
  text-align: center;
  padding: 120px 20px;
  position: relative;
}
.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(26, 35, 126, 0.7);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
}
.hero-section h1 {
  font-size: 52px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}
.hero-section p {
  font-size: 20px;
  max-width: 750px;
  margin: 0 auto;
}
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
}
.select-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 280px;
  text-align: left;
}
.select-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #1a237e;
}
.select-group select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}
.filter-buttons button {
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #e3f2fd;
  border: 1px solid #42a5f5;
  color: #1a237e;
  font-weight: bold;
  transition: all 0.3s ease;
}
.filter-buttons button.active,
.filter-buttons button:hover {
  background-color: #1a237e;
  color: white;
}
.house-listings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-items: center;
}
@media (max-width: 992px) {
  .house-listings-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .house-listings-grid {
    grid-template-columns: 1fr;
  }
}
.house-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 340px;
  width: 100%;
}
.house-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.house-image-wrapper {
  width: 100%;
  height: 200px;
  position: relative;
}
.house-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.availability-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #4caf50;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
}
.tag-not-available {
  background-color: #f44336;
}
.house-card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.house-card-content h3 {
  font-size: 22px;
  color: #1a237e;
  margin-bottom: 10px;
}
.location-text {
  color: #757575;
  font-size: 14px;
}
.price {
  color: #0d47a1;
  font-weight: 700;
  font-size: 18px;
  margin: 10px 0;
}
.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}
.feature-tag {
  background: #e3f2fd;
  color: #1a237e;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 13px;
}
.inquire-btn {
  background-color: #ffc107;
  color: #333;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.inquire-btn:hover {
  background-color: #ffb300;
}
.no-results {
  grid-column: 1/-1;
  color: #999;
  font-size: 18px;
  padding: 30px;
}
.caretaker-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.caretaker-modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 95%;
  max-width: 500px;
  text-align: left;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}
.modal-divider {
  margin: 20px 0;
  border: 0;
  height: 1px;
  background: #ddd;
}
.close-modal-btn {
  margin-top: 20px;
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.close-modal-btn:hover {
  background-color: #b71c1c;
}
.whatsapp-link {
  color: #25d366;
  font-weight: 600;
  text-decoration: none;
}
.whatsapp-link:hover {
  text-decoration: underline;
}
.section-title {
  font-size: 36px;
  color: #1a237e;
  margin-bottom: 40px;
  font-weight: 700;
}
.text-left {
  text-align: left;
}
.about-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin-top: 20px;
}
@media (min-width: 768px) {
  .about-wrapper {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  .about-text {
    flex: 1;
    padding-right: 30px;
  }
}
.about-image {
  flex: 1;
  max-width: 100%;
}
.about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.about-text h3 {
  font-size: 28px;
  color: #1a237e;
  margin-bottom: 15px;
}
.about-text p {
  font-size: 17px;
  color: #555;
  line-height: 1.8;
}
.faq-list {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.faq-item {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.faq-item button {
  width: 100%;
  text-align: left;
  padding: 18px 25px;
  background-color: #f9f9f9;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #1a237e;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq-item button:hover {
  background-color: #eeeeee;
}
.faq-item button::after {
  content: "▼";
  font-size: 14px;
  transition: transform 0.3s ease;
}
.faq-item button[aria-expanded="true"]::after {
  transform: rotate(180deg);
}
.faq-item p {
  padding: 15px 25px 20px;
  font-size: 16px;
  color: #666;
  border-top: 1px solid #f0f0f0;
  margin-top: -1px;
}
</style>
