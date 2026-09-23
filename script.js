// FlowState Digital - Shared Functions and UI Logic
// Handles navigation, data binding, and interactive elements

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Load shared data if not already loaded
  if (!window.businesses) {
    // Data will be loaded from data.js
  }
  
  // Set up navigation
  setupNavigation();
  
  // Initialize any platform-specific demos
  initPlatformDemos();
});

// Navigation setup
function setupNavigation() {
  // Add "FlowState Digital" footer/header to all pages if needed
  const flowstateBranding = `
    <div class="flowstate-brand">
      <span class="flowstate-label">FlowState Digital · Demo conceptual</span>
      <a href="index.html" class="flowstate-home">← Volver al portfolio</a>
    </div>
  `;
  
  // Add branding to pages that don't have it (except index.html)
  if (!document.querySelector('.flowstate-brand') && 
      !window.location.pathname.endsWith('index.html')) {
    const brandDiv = document.createElement('div');
    brandDiv.className = 'flowstate-brand';
    brandDiv.innerHTML = flowstateBranding;
    
    // Insert at beginning of body
    document.body.insertBefore(brandDiv, document.body.firstChild);
    
    // Add styles if not present
    if (!document.getElementById('flowstate-brand-styles')) {
      const style = document.createElement('style');
      style.id = 'flowstate-brand-styles';
      style.textContent = `
        .flowstate-brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
          font-size: 14px;
          color: #6c757d;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        .flowstate-label {
          font-weight: 600;
          color: #495057;
        }
        .flowstate-home {
          color: #0d6efd;
          text-decoration: none;
          font-weight: 500;
        }
        .flowstate-home:hover {
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .flowstate-brand {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Handle back button in flowstate-brand
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('flowstate-home')) {
      e.preventDefault();
      window.location.href = 'index.html';
    }
  });
}

// Initialize platform-specific demos
function initPlatformDemos() {
  const path = window.location.pathname;
  
  if (path.endsWith('flowstate_gbp_comercio.html')) {
    initGBPDemo();
  } else if (path.endsWith('flowstate_whatsapp_restaurante.html')) {
    initWhatsAppDemo();
  } else if (path.endsWith('flowstate_tripadvisor_hotel.html')) {
    initTripAdvisorDemo();
  }
}

// Google Business Profile Demo
function initGBPDemo() {
  // Get business data
  const business = getBusiness('cabana-marea');
  if (!business) return;
  
  // Populate dynamic elements
  document.title = `${business.name} — Google Business Profile`;
  
  // Update header
  const headerTitle = document.querySelector('.header h1');
  if (headerTitle) {
    headerTitle.innerHTML = `${business.name} <span class="verified-badge">✓</span>`;
  }
  
  const categoryEl = document.querySelector('.category');
  if (categoryEl) {
    categoryEl.textContent = business.category;
  }
  
  const ratingNum = document.querySelector('.rating-num');
  if (ratingNum) {
    ratingNum.textContent = business.rating;
  }
  
  const reviewCount = document.querySelector('.review-count');
  if (reviewCount) {
    reviewCount.textContent = `(${business.reviewCount})`;
  }
  
  // Update photos
  const photosGrid = document.querySelector('.photos-grid');
  if (photosGrid && business.images) {
    photosGrid.innerHTML = business.images.map(img => 
      `<img src="${img}" alt="${business.name}">`
    ).join('');
  }
  
  // Update posts section
  const postsContainer = document.querySelector('.posts-container');
  if (postsContainer && business.posts) {
    postsContainer.innerHTML = business.posts.map(post => `
      <div class="post-card">
        <img src="${post.image}" alt="${post.title}">
        <div class="post-body">
          <span class="post-type">${post.type}</span>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-desc">${post.desc}</p>
          <div class="post-time">${post.time}</div>
        </div>
      </div>
    `).join('');
  }
  
  // Update reviews
  const reviewsContainer = document.querySelector('.reviews-container');
  if (reviewsContainer && business.reviews) {
    reviewsContainer.innerHTML = business.reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">${review.avatar}</div>
          <div class="review-info">
            <div class="review-name">${review.name}</div>
            <div class="review-meta">${review.meta}</div>
          </div>
        </div>
        <div class="review-stars">
          ${Array(5).fill(0).map((_, i) => 
            `<svg class="star-svg" viewBox="0 0 24 24"><path fill="${i < Math.floor(business.rating) ? '#fbbc04' : '#e5e7eb'}" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
          ).join('')}
          ${business.rating % 1 >= 0.5 ? '<svg class="star-svg" viewBox="0 0 24 24"><path fill="#fbbc04" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' : ''}
          ${business.rating % 1 < 0.5 && business.rating % 1 > 0 ? '<svg class="star-svg" viewBox="0 0 24 24"><path fill="#fbbc04" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' : ''}
        </div>
        <div class="review-text">${review.text}</div>
        ${review.reply ? `
        <div class="review-reply">
          <div class="review-reply-label">${review.reply.label}</div>
          <div class="review-reply-text">${review.reply.text}</div>
        </div>
        ` : ''}
      </div>
    `).join('');
  }
  
  // Update Q&A
  const qaContainer = document.querySelector('.questions-section');
  if (qaContainer && business.qa) {
    qaContainer.innerHTML = `
      <div class="section-title">
        <span class="material-icons">question_answer</span>
        Preguntas y respuestas
      </div>
      ${business.qa.map(q => `
        <div class="qa-item">
          <div class="qa-question">
            ${q.question}
            <span class="material-icons">expand_more</span>
          </div>
          <div class="qaanswer">${q.answer}</div>
        </div>
      `).join('')}
    `;
  }
  
  // Add platform navigation
  addPlatformNavigation('cabana-marea');
}

// WhatsApp Business Demo
function initWhatsAppDemo() {
  const business = getBusiness('restaurant-soho');
  if (!business) return;
  
  // Update header info
  const headerName = document.querySelector('.header-name');
  if (headerName) {
    headerName.textContent = business.name;
  }
  
  const headerStatus = document.querySelector('.header-status');
  if (headerStatus) {
    headerStatus.textContent = `${business.openStatus} • ${business.category}`;
  }
  
  // Update profile stats
  const profileName = document.querySelector('.profile-name');
  if (profileName) {
    profileName.textContent = business.name;
  }
  
  const profileBio = document.querySelector('.profile-bio');
  if (profileBio) {
    profileBio.textContent = `Especialistas en presencia digital para ${business.type === 'restaurant' ? 'restaurantes turísticos' : 'negocios de hospitalidad'}. • Gestión de GB, WhatsApp, Instagram • Contenido audiovisual con Mau Producciones • Resultados medibles, sin paquetes cerrados.`;
  }
  
  // Update catalog
  const catalogItems = document.querySelector('.catalog-items');
  if (catalogItems && business.catalog) {
    catalogItems.innerHTML = business.catalog.map(item => `
      <div class="catalog-item">
        <img src="${business.images[0]}" alt="${item.name}">
        <div class="info">
          <div class="name">${item.name}</div>
          <div class="desc">${item.desc}</div>
          <div class="price">${item.price}</div>
          <button class="add-btn">+</button>
        </div>
      </div>
    `).join('');
  }
  
  // Add platform navigation
  addPlatformNavigation('restaurant-soho');
}

// TripAdvisor Demo
function initTripAdvisorDemo() {
  const business = getBusiness('hotel-boutique-palermo');
  if (!business) return;
  
  // Update hotel name
  const hotelName = document.querySelector('.hotel-name');
  if (hotelName) {
    hotelName.textContent = business.name;
  }
  
  // Update location
  const locationSpan = document.querySelector('.location-row span');
  if (locationSpan) {
    locationSpan.textContent = business.location;
  }
  
  // Update rating
  const ratingText = document.querySelector('.rating-text');
  if (ratingText) {
    ratingText.textContent = business.rating.toString().replace('.', ',');
  }
  
  const reviewCount = document.querySelector('.review-count');
  if (reviewCount) {
    reviewCount.textContent = `(${business.reviewCount} reseñas)`;
  }
  
  // Update hotel card description
  const hotelCard = document.querySelector('.hotel-card');
  if (hotelCard) {
    hotelCard.innerHTML = `
      <h1 class="hotel-name">${business.name}</h1>
      <div class="location-row">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <span>${business.location}</span>
      </div>
      <div class="rating-row">
        <div class="bubbles">
          ${Array(5).fill(0).map((_, i) => 
            `<div class="bubble-rating" style="background:${i < Math.floor(business.rating) ? '#34e0a1' : '#e0e0e0'};"></div>`
          ).join('')}
          ${business.rating % 1 >= 0.5 ? '<div class="bubble-rating" style="background:#34e0a1;width:6px;"></div>' : ''}
        </div>
        <span class="rating-text">${business.rating.toString().replace('.', ',')}</span>
        <span class="review-count">(${business.reviewCount} reseñas)</span>
        <div class="award"><span>🏆 Travellers' Choice 2026</span></div>
      </div>
    `;
  }
  
  // Update amenities
  const amenitiesGrid = document.querySelector('.amenities');
  if (amenitiesGrid && business.amenities) {
    amenitiesGrid.innerHTML = business.amenities.map(amenity => `
      <div class="amenity">
        <div class="amenity-icon">
          ${amenity.svg}
        </div>
        <span>${amenity.icon}</span>
      </div>
    `).join('');
  }
  
  // Update room types
  const roomSection = document.querySelector('.room-card'); // This needs adjustment based on actual structure
  // For now, we'll leave the existing structure and enhance it later
  
  // Update reviews
  const reviewsHeader = document.querySelector('.reviews-header');
  if (reviewsHeader) {
    reviewsHeader.innerHTML = `
      <div class="reviews-summary">
        <div class="reviews-big">${business.rating.toString().replace('.', ',')}</div>
        <div>
          <div class="reviews-stars">
            ${Array(5).fill(0).map((_, i) => 
              `<svg class="star" viewBox="0 0 24 24"><path fill="${i < Math.floor(business.rating) ? 'currentColor' : '#e0e0e0'}" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            ).join('')}
            ${business.rating % 1 >= 0.5 ? '<svg class="star" viewBox="0 0 24 24" style="fill:#e0e0e0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' : ''}
          </div>
          <div class="reviews-total">Basado en ${business.reviewCount} reseñas</div>
        </div>
      </div>
    `;
  }
  
  // Add platform navigation
  addPlatformNavigation('hotel-boutique-palermo');
}

// Add navigation between platforms for a business
function addPlatformNavigation(businessId) {
  // Check if we already have platform navigation
  if (document.querySelector('.platform-navigation')) return;
  
  // Create platform navigation
  const navDiv = document.createElement('div');
  navDiv.className = 'platform-navigation';
  navDiv.style.cssText = `
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 20px 0;
    flex-wrap: wrap;
  `;
  
  const platforms = [
    { id: 'gbp', name: 'Google', icon: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L12 13.17l6.36-6.36L20 11z', url: 'flowstate_gbp_comercio.html' },
    { id: 'wa', name: 'WhatsApp', icon: 'M20 6L9 17l-5-5', url: 'flowstate_whatsapp_restaurante.html' },
    { id: 'ta', name: 'TripAdvisor', icon: 'M22 12.05c0 1.26-.71 2.39-1.77 2.98a11.94 11.94 0 01-6 0c-1.06-.59-1.77-1.72-1.77-2.98 0-1.26.71-2.39 1.77-2.98a11.91 11.91 0 016 0c1.06.59 1.77 1.72 1.77 2.98zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6z', url: 'flowstate_tripadvisor_hotel.html' }
  ];
  
  navDiv.innerHTML = platforms.map(p => `
    <a href="${p.url}" class="platform-btn ${businessId === 'cabana-marea' && p.id === 'gbp' || businessId === 'restaurant-soho' && p.id === 'wa' || businessId === 'hotel-boutique-palermo' && p.id === 'ta' ? 'active' : ''}">
      <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="${p.icon}"/></svg>
      <span>${p.name}</span>
    </a>
  `).join('');
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .platform-navigation {
      margin: 20px 0;
    }
    .platform-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      text-decoration: none;
      color: #495057;
      font-size: 14px;
      min-width: 80px;
    }
    .platform-btn:hover {
      background: #e9ecef;
      border-color: #adb5bd;
    }
    .platform-btn.active {
      background: #0d6efd;
      border-color: #0b5ed7;
      color: white;
    }
    .platform-btn.active svg {
      stroke: white;
    }
    @media (max-width: 480px) {
      .platform-navigation {
        margin: 10px 0;
      }
      .platform-btn {
        padding: 6px 10px;
        font-size: 13px;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // Insert navigation after header or at appropriate place
  const headerEl = document.querySelector('.header, .app-bar, .nav, .header');
  if (headerEl) {
    headerEl.insertAdjacentElement('afterend', navDiv);
  } else {
    // Fallback: insert after first major section
    const firstSection = document.querySelector('.business-info, .profile, .hotel-card');
    if (firstSection) {
      firstSection.insertAdjacentElement('afterend', navDiv);
    } else {
      document.body.insertBefore(navDiv, document.body.firstChild);
    }
  }
}

// Utility function to get business data
function getBusiness(id) {
  return window.getBusiness ? window.getBusiness(id) : null;
}

// Make functions available globally
window.setupNavigation = setupNavigation;
window.initPlatformDemos = initPlatformDemos;
window.initGBPDemo = initGBPDemo;
window.initWhatsAppDemo = initWhatsAppDemo;
window.initTripAdvisorDemo = initTripAdvisorDemo;
window.addPlatformNavigation = addPlatformNavigation;