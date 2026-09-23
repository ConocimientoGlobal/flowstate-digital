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

// Get business ID from query parameter ?business=id
function getBusinessFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('business') || null;
}

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
  const businessId = getBusinessFromQuery() || 
                   (path.includes('hotel') ? 'hotel-boutique-palermo' :
                    path.includes('cabana') ? 'complejo-cabanas-marea' :
                    path.includes('restaurant') ? 'restaurant-soho' :
                    'hotel-boutique-palermo'); // default
  
  if (path.endsWith('flowstate_gbp_comercio.html')) {
    initGBPDemo(businessId);
  } else if (path.endsWith('flowstate_whatsapp_restaurante.html')) {
    initWhatsAppDemo(businessId);
  } else if (path.endsWith('flowstate_tripadvisor_hotel.html')) {
    initTripAdvisorDemo(businessId);
  } else if (path.endsWith('booking-demo.html')) {
    initBookingDemo(businessId);
  } else if (path.endsWith('airbnb-demo.html')) {
    initAirbnbDemo(businessId);
  } else if (path.endsWith('trivago-demo.html')) {
    initTrivagoDemo(businessId);
  }
}

// Google Business Profile Demo
function initGBPDemo(businessId) {
  // Get business data
  const business = getBusiness(businessId);
  if (!business) return;
  
  // Populate dynamic elements
  document.title = `${business.name} — Google Business Profile`;
  
  // Update header
  const headerTitle = document.querySelector('.header h1');
  if (headerTitle) {
    headerTitle.innerHTML = `${business.name} <span class="verified-badge">Verificado</span>`;
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
  
  // Update posts section (if exists)
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
  
  // Update highlights
  const highlightsGrid = document.querySelector('.highlights-grid');
  if (highlightsGrid && business.highlights) {
    highlightsGrid.innerHTML = business.highlights.map(h => `
      <div class="highlight-item">
        <div class="highlight-number">${h.number}</div>
        <div class="highlight-label">${h.label}</div>
      </div>
    `).join('');
  }
  
  // Add platform navigation
  addPlatformNavigation(businessId);
}

// WhatsApp Business Demo
function initWhatsAppDemo(businessId) {
  const business = getBusiness(businessId);
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
  
  // Update catalog (if exists)
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
  
  // Update quick replies
  const quickRepliesContainer = document.querySelector('.quick-replies');
  if (quickRepliesContainer && business.quickReplies) {
    quickRepliesContainer.innerHTML = business.quickReplies.map(q => `
      <div class="quick-reply">${q}</div>
    `).join('');
  }
  
  // Update automated messages (if exists)
  const greetingEl = document.querySelector('.encryption');
  if (greetingEl && business.automatedMessages) {
    greetingEl.textContent = business.automatedMessages.greeting;
  }
  
  // Add platform navigation
  addPlatformNavigation(businessId);
}

// TripAdvisor Demo
function initTripAdvisorDemo(businessId) {
  const business = getBusiness(businessId);
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
          ${business.rating % 1 >= 0.5 ? `<div class="bubble-rating" style="background:#34e0a1;width:6px;"></div>` : ''}
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
  
  // Update room types (if exists)
  const roomSection = document.querySelectorAll('.room-card');
  if (roomSection.length > 0 && business.roomTypes) {
    roomSection.forEach((card, index) => {
      const room = business.roomTypes[index];
      if (room) {
        card.innerHTML = `
          <img src="${room.image}" alt="${room.name}">
          <div class="room-info">
            <div class="room-name">${room.name}</div>
            <div class="room-details">${room.size} • ${room.bed} • ${room.view}</div>
            <div class="room-price-row">
              <div><div class="room-price">${room.price}</div><div class="room-price-note">por noche</div></div>
              <button class="room-cta">Ver disponibilidad</button>
            </div>
          </div>
        `;
      }
    });
  }
  
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
  addPlatformNavigation(businessId);
}

// Booking Demo
function initBookingDemo(businessId) {
  const business = getBusiness(businessId);
  if (!business) return;
  
  // Update header
  const headerTitle = document.querySelector('.header .logo');
  if (headerTitle) {
    headerTitle.textContent = 'Booking';
  }
  
  // Update search bar default values (could be made dynamic)
  // For simplicity, we keep static values but could be enhanced
  
  // Update results header
  const resultsHeader = document.querySelector('.results-header h2');
  if (resultsHeader) {
    resultsHeader.textContent = `1 resultado encontrado`;
  }
  
  // Update property card
  const propertyCard = document.querySelector('.property-card');
  if (propertyCard) {
    // Update image
    const img = propertyCard.querySelector('.property-image');
    if (img && business.images[0]) {
      img.src = business.images[0];
      img.alt = business.name;
    }
    
    // Update name
    const nameEl = propertyCard.querySelector('.property-name');
    if (nameEl) {
      nameEl.textContent = business.name;
    }
    
    // Update location
    const locationEl = propertyCard.querySelector('.property-location');
    if (locationEl) {
      locationEl.textContent = business.location;
    }
    
    // Update rating
    const ratingEls = propertyCard.querySelectorAll('.property-rating svg');
    if (ratingEls.length >= 5) {
      ratingEls.forEach((svg, index) => {
        svg.parentNode.style.fill = index < Math.floor(business.rating) ? 'currentColor' : '#e0e0e0';
      });
    }
    const ratingContainer = propertyCard.querySelector('.property-rating');
    if (ratingContainer) {
      ratingContainer.innerHTML = `${Array(5).fill(0).map((_, i) => 
        `<svg class="star" viewBox="0 0 24 24"><path fill="${i < Math.floor(business.rating) ? 'currentColor' : '#e0e0e0'}" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
      ).join('')}${business.rating % 1 >= 0.5 ? '<svg class="star" viewBox="0 0 24 24"><path fill="#e0e0e0" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' : ''} ${business.rating.toString().replace('.', ',')} (${business.reviewCount} reseñas)`;
    }
    
    // Update price
    const priceEl = propertyCard.querySelector('.property-price');
    if (priceEl) {
      // For complex, we might show a range; for simplicity show first unit price if available
      let priceText = '$53 USD/nocha'; // default
      if (business.roomTypes && business.roomTypes.length > 0) {
        priceText = business.roomTypes[0].price;
      }
      priceEl.textContent = priceText;
    }
    
    // Update details
    const detailsEl = propertyCard.querySelector('.property-details');
    if (detailsEl && business.services) {
      detailsEl.innerHTML = business.services.map(s => 
        `<span class="property-detail">✓ ${s}</span>`
      ).join('');
    }
    
    // Update actions - replace alert with proper modals
    const actionBtns = propertyCard.querySelectorAll('.action-btn');
    if (actionBtns.length >= 2) {
      actionBtns[0].onclick = () => showModal('Detalles del alojamiento', getHotelDetailsHTML(business));
      actionBtns[1].onclick = () => showModal('Galería de fotos', getGalleryHTML(business.images));
    }
    
    // Update CTA
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      ctaSection.innerHTML = `
        <button class="cta-btn primary">Reservar ahora</button>
        <button class="cta-btn secondary" style="margin-left:8px;">Ver disponibilidad en otras fechas</button>
      `;
    }
  }
  
  // Update amenities list
  const amenitiesEl = document.querySelector('.amenities');
  if (amenitiesEl && business.services) {
    amenitiesEl.innerHTML = business.services.map(s => 
      `<span class="amenity">${s}</span>`
    ).join('');
  }
  
  // Update policies
  const policiesEl = document.querySelector('.policies');
  if (policiesEl) {
    policiesEl.innerHTML = `
      <div class="policy-item">
        <span class="policy-label">Política de cancelación:</span> Gratuita hasta 24 horas antes del check-in
      </div>
      <div class="policy-item">
        <span class="policy-label">Check-in:</span> Desde las 15:00 horas
      </div>
      <div class="policy-item">
        <span class="policy-label">Check-out:</span> Hasta las 11:00 horas
      </div>
      <div class="policy-item">
        <span class="policy-label">Niños:</span> Menores de 12 años se alojan gratis en cama existente
      </div>
    `;
  }
  
  // Add platform navigation
  addPlatformNavigation(businessId);
}

// Airbnb Demo
function initAirbnbDemo(businessId) {
  const business = getBusiness(businessId);
  if (!business) return;
  
  // Update header
  const headerLogo = document.querySelector('.header .logo');
  if (headerLogo) {
    headerLogo.textContent = 'Airbnb';
  }
  
  // Update hero
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && business.images[0]) {
    heroImg.src = business.images[0];
    heroImg.alt = business.name;
  }
  
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.textContent = business.name;
  }
  
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle && business.units) {
    // Show first unit as example
    const unit = business.units[0];
    heroSubtitle.textContent = `${unit.name} · ${unit.capacity} · ${unit.bedrooms} dormitorio(s) · ${unit.bathrooms} baño(s)`;
  }
  
  // Update badges
  const heroBadges = document.querySelector('.hero-badges');
  if (heroBadges) {
    heroBadges.innerHTML = `
      <span class="hero-badge">Superhost</span>
      <span class="hero-badge">WiFi</span>
      <span class="hero-badge">Cocina</span>
      <span class="hero-badge">Estacionamiento</span>
    `;
  }
  
  // Update details
  const detailRows = document.querySelectorAll('.detail-row');
  if (detailRows.length >= 6 && business.units) {
    const unit = business.units[0]; // first unit as example
    detailRows[0].querySelector('.detail-value').textContent = 'Cabaña completa';
    detailRows[1].querySelector('.detail-value').textContent = `${unit.bedrooms}`;
    detailRows[2].querySelector('.detail-value').textContent = `${unit.beds}`;
    detailRows[3].querySelector('.detail-value').textContent = `${unit.bathrooms} baño(s)`;
    detailRows[4].querySelector('.detail-value').textContent = `${unit.capacity} huéspedes`;
    detailRows[5].querySelector('.detail-value').textContent = business.location;
  }
  
  // Update stats
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length >= 3) {
    statValues[0].textContent = business.rating.toString().replace('.', ',');
    statValues[1].textContent = `${business.reviewCount}`;
    statValues[2].textContent = 'Excelente';
  }
  
  // Update description
  const descriptionTitle = document.querySelector('.description h3');
  if (descriptionTitle) {
    descriptionTitle.textContent = 'Sobre este espacio';
  }
  const descriptionPs = document.querySelectorAll('.description p');
  if (descriptionPs.length >= 2) {
    descriptionPs[0].textContent = `Acogedora cabaña de madera en el corazón del Delta Tigre, ideal para desconectar de la ciudad y conectar con la naturaleza. Disfruta de los sonidos del río, observa la fauna local y relájate en tu propio deck privado.`;
    descriptionPs[1].textContent = `La cabaña cuenta con quincho para asados, deck con vista al agua y acceso directo a canales para paseos en kayak. Perfecta para parejas o pequeños grupos que buscan una experiencia auténtica de turismo rural.`;
  }
  
  // Update amenities grid
  const amenitiesGrid = document.querySelector('.amenities-grid');
  if (amenitiesGrid && business.services) {
    amenitiesGrid.innerHTML = business.services.map(s => `
      <div class="amenity">
        <div class="amenity-icon">✓</div>
        <div class="amenity-label">${s}</div>
      </div>
    `).join('');
  }
  
  // Update gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length >= 4 && business.images.length >= 4) {
    galleryItems.forEach((item, index) => {
      if (business.images[index]) {
        const img = item.querySelector('img');
        if (img) {
          img.src = business.images[index];
          img.alt = `${business.name} ${index+1}`;
        }
        const play = item.querySelector('.play');
        if (play) {
          play.textContent = '▶';
        }
      }
    });
  }
  
  // Update reviews
  const reviewCards = document.querySelectorAll('.review-card');
  if (reviewCards.length >= 3 && business.reviews) {
    business.reviews.forEach((review, index) => {
      if (reviewCards[index]) {
        const header = reviewCards[index].querySelector('.review-header');
        const textEl = reviewCards[index].querySelector('.review-text');
        const replyEl = reviewCards[index].querySelector('.review-reply');
        if (header) {
          header.innerHTML = `
            <span class="review-author">${review.avatar}</span>
            <span class="review-date">${review.meta.split('·')[0].trim()}</span>
            <span class="review-rating">${review.meta.split('·')[1].trim()}</span>
          `;
        }
        if (textEl) {
          textEl.textContent = review.text;
        }
        if (replyEl && review.reply) {
          replyEl.innerHTML = `
            <div class="review-reply-label">${review.reply.label}</div>
            <div class="review-reply-text">${review.reply.text}</div>
          `;
        }
      }
    });
  }
  
  // Update host
  const hostName = document.querySelector('.host-name');
  if (hostName) {
    hostName.textContent = business.name;
  }
  const hostBio = document.querySelector('.host-bio');
  if (hostBio) {
    hostBio.textContent = `Especialistas en presencia digital para propiedades de hospitality. Gestionamos esta propiedad para maximizar su visibilidad y reservas directas.`;
  }
  
  // Update booking section dates (keep as is)
  // Update price total
  const priceTotal = document.querySelector('.price-amount');
  if (priceTotal && business.units && business.units.length > 0) {
    priceTotal.textContent = business.units[0].price;
  }
  
  // Add platform navigation
  addPlatformNavigation(businessId);
}

// Trivago Demo
function initTrivagoDemo(businessId) {
  // For Trivago, we want to show comparisons of the three businesses that are lodging types
  // We'll filter to hotel and cabana complex (excluding restaurant)
  const lodgingBusinesses = businesses.filter(b => 
    b.type === 'hotel' || b.type === 'cabana_complex'
  );
  
  // Update header
  const headerLogo = document.querySelector('.header .logo');
  if (headerLogo) {
    headerLogo.textContent = 'Trivago';
  }
  
  // Update search bar default values (static for demo)
  // Could be made dynamic but we keep as is
  
  // Update results header
  const resultsHeader = document.querySelector('.results-header h2');
  if (resultsHeader) {
    resultsHeader.textContent = `${lodgingBusinesses.length} resultados encontrados`;
  }
  
  const resultsCount = document.querySelector('.results-header .count');
  if (resultsCount) {
    resultsCount.textContent = 'Del más barato al más caro';
  }
  
  const resultsSort = document.querySelector('.results-header .sort');
  if (resultsSort) {
    resultsSort.innerHTML = `Ordenar por: <span>Mejor valoración</span>`;
  }
  
  // Update property cards
  const propertyCards = document.querySelectorAll('.property-card');
  if (propertyCards.length >= lodgingBusinesses.length) {
    lodgingBusinesses.forEach((business, index) => {
      const card = propertyCards[index];
      if (!card) return;
      
      // Update image
      const img = card.querySelector('.property-image');
      if (img && business.images[0]) {
        img.src = business.images[0];
        img.alt = business.name;
      }
      
      // Update badge (optional)
      const badge = card.querySelector('.property-badge');
      if (badge) {
        if (business.id === 'hotel-boutique-palermo') {
          badge.textContent = 'Valoración destacada';
        } else if (business.id === 'complejo-cabanas-marea') {
          badge.textContent = 'Mejor precio';
        }
      }
      
      // Update name
      const nameEl = card.querySelector('.property-name');
      if (nameEl) {
        nameEl.textContent = business.name;
      }
      
      // Update location
      const locationEl = card.querySelector('.property-location');
      if (locationEl) {
        locationEl.textContent = business.location;
      }
      
      // Update rating
      const ratingEls = card.querySelectorAll('.property-rating svg');
      if (ratingEls.length >= 5) {
        ratingEls.forEach((svg, i) => {
          svg.parentNode.style.fill = i < Math.floor(business.rating) ? 'currentColor' : '#e0e0e0';
        });
      }
      const ratingContainer = card.querySelector('.property-rating');
      if (ratingContainer) {
        ratingContainer.innerHTML = `${Array(5).fill(0).map((_, i) => 
          `<svg class="star" viewBox="0 0 24 24"><path fill="${i < Math.floor(business.rating) ? 'currentColor' : '#e0e0e0'}" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
        ).join('')}${business.rating % 1 >= 0.5 ? '<svg class="star" viewBox="0 0 24 24"><path fill="#e0e0e0" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' : ''} ${business.rating.toString().replace('.', ',')} (${business.reviewCount} reseñas)`;
      }
      
      // Update price
      const priceEl = card.querySelector('.property-price');
      if (priceEl) {
        let priceText = '$53 USD/nocha';
        if (business.roomTypes && business.roomTypes.length > 0) {
          priceText = business.roomTypes[0].price;
        }
        priceEl.textContent = priceText;
      }
      
      // Update price highlight (show from price)
      const priceHighlight = card.querySelector('.property-price.price-highlight');
      if (priceHighlight) {
        priceHighlight.textContent = `Desde ${business.roomTypes && business.roomTypes.length > 0 ? business.roomTypes[0].price : '$53 USD/nocha'}`;
      }
      
      // Update details
      const detailsEl = card.querySelector('.property-details');
      if (detailsEl && business.services) {
        detailsEl.innerHTML = business.services.map(s => 
          `<span class="property-detail">✓ ${s}</span>`
        ).join('');
      }
      
      // Update actions - replace alert with proper modals
      const actionBtns = card.querySelectorAll('.action-btn');
      if (actionBtns.length >= 2) {
        actionBtns[0].onclick = () => showModal(`Precio de ${business.name}`, getPriceHTML(business));
        actionBtns[1].onclick = () => showModal(`Detalles de ${business.name}`, getDetailsHTML(business));
      }
    });
  }
  
  // Update comparison view (if exists)
  const comparisonView = document.getElementById('comparison-view');
  if (comparisonView && lodgingBusinesses.length >= 2) {
    // We'll show comparison between first two lodging businesses
    const [b1, b2] = lodgingBusinesses.slice(0, 2);
    const table = comparisonView.querySelector('.comparison-table tbody');
    if (table) {
      table.innerHTML = `
        <tr>
          <td>Tipo</td>
          <td>${b1.type === 'hotel' ? 'Hotel boutique' : 'Complejo de cabañas'}</td>
          <td>${b2.type === 'hotel' ? 'Hotel boutique' : 'Complejo de cabañas'}</td>
          <td>Restaurante</td>
        </tr>
        <tr>
          <td>Ubicación</td>
          <td>${b1.location}</td>
          <td>${b2.location}</td>
          <td>Palermo Soho, Buenos Aires</td>
        </tr>
        <tr>
          <td>Precio por noche/persona</td>
          <td>${b1.roomTypes && b1.roomTypes.length > 0 ? b1.roomTypes[0].price : 'N/A'}</td>
          <td>${b2.roomTypes && b2.roomTypes.length > 0 ? b2.roomTypes[0].price : 'N/A'}</td>
          <td>$29 USD/persona</td>
        </tr>
        <tr>
          <td>Valoración</td>
          <td>${b1.rating.toString().replace('.', ',')} (${b1.reviewCount} reseñas)</td>
          <td>${b2.rating.toString().replace('.', ',')} (${b2.reviewCount} reseñas)</td>
          <td>4,6 (89 reseñas)</td>
        </tr>
        <tr>
          <td>Desayuno incluido</td>
          <td>${b1.services.some(s => s.toLowerCase().includes('desayuno')) ? 'Sí' : 'No'}</td>
          <td>${b2.services.some(s => s.toLowerCase().includes('desayuno')) ? 'Sí' : 'No'}</td>
          <td>Sí (incluido en el menú)</td>
        </tr>
        <tr>
          <td>WiFi gratis</td>
          <td>${b1.services.some(s => s.includes('WiFi gratis')) ? 'Sí' : 'No'}</td>
          <td>${b2.services.some(s => s.includes('WiFi gratis')) ? 'Sí' : 'No'}</td>
          <td>Sí</td>
        </tr>
        <tr>
          <td>Estacionamiento</td>
          <td>${b1.services.some(s => s.includes('Estacionamiento')) ? 'Sí' : 'No'}</td>
          <td>${b2.services.some(s => s.includes('Estacionamiento')) ? 'Sí' : 'No'}</td>
          <td>No (estacionamiento en calle)</td>
        </tr>
        <tr>
          <td>Pet friendly</td>
          <td>${b1.services.some(s => s.includes('Pet friendly')) ? 'Sí' : 'No'}</td>
          <td>${b2.services.some(s => s.includes('Pet friendly')) ? 'Sí' : 'No'}</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Check-in/Horario de apertura</td>
          <td>${b1.hours && b1.hours.Lunes ? b1.hours.Lunes : '24 horas'}</td>
          <td>${b2.hours && b2.hours.Lunes ? b2.hours.Lunes : '24 horas'}</td>
          <td>12:00 - 23:00</td>
        </tr>
        <tr>
          <td>Check-out/Horario de cierre</td>
          <td>${b1.hours && b1.hours.Lunes ? b1.hours.Lunes : '24 horas'}</td>
          <td>${b2.hours && b2.hours.Lunes ? b2.hours.Lunes : '24 horas'}</td>
          <td>12:00 - 23:00</td>
        </tr>
        <tr>
          <td>Experiencias incluidas</td>
          <td>${b1.services.filter(s => !s.includes('WiFi') && !s.includes('Estacionamiento') && !s.includes('Desayuno')).slice(0,2).join(', ') || 'N/A'}</td>
          <td>${b2.services.filter(s => !s.includes('WiFi') && !s.includes('Estacionamiento') && !s.includes('Desayuno')).slice(0,2).join(', ') || 'N/A'}</td>
          <td>Menú criollo, opciones gourmet</td>
        </tr>
      `;
    }
  }
  
  // Add platform navigation (for the selected business in comparison, if any)
  // For simplicity, we'll not add platform navigation in Trivago demo as it's a comparator
  // But we could add a small note.
}

// Helper function to create hotel details HTML
function getHotelDetailsHTML(business) {
  return `
    <div class="modal-content">
      <h3>${business.name}</h3>
      <p><strong>Dirección:</strong> ${business.location}</p>
      <p><strong>Teléfono:</strong> ${business.phone}</p>
      <p><strong>Sitio web:</strong> <a href="${business.website}" target="_blank">${business.website}</a></p>
      <p><strong>Descripción:</strong> ${business.description}</p>
      <div class="modal-section">
        <h4>Servicios:</h4>
        <ul>
          ${business.services.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      ${business.roomTypes ? `
      <div class="modal-section">
        <h4>Tipos de habitación:</h4>
        <ul>
          ${business.roomTypes.map(room => `
            <li>
              <strong>${room.name}</strong> - ${room.size}, ${room.bed}, ${room.view} - ${room.price}
              <ul>
                ${room.amenities.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </li>
          `).join('')}
        </ul>
      </div>
      ` : ''}
      ${business.specs ? `
      <div class="modal-section">
        <h4>Especificaciones:</h4>
        <ul>
          ${business.specs.map(spec => `<li><strong>${spec.label}:</strong> ${spec.value}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
    </div>
  `;
}

// Helper function to create gallery HTML
function getGalleryHTML(images) {
  return `
    <div class="modal-content">
      <h3>Galería de fotos</h3>
      <div class="gallery-grid">
        ${images.map(img => `<img src="${img}" alt="${business.name}">`).join('')}
      </div>
    </div>
  `;
}

// Helper function to create price HTML
function getPriceHTML(business) {
  let priceHTML = `<h3>Precios de ${business.name}</h3>`;
  if (business.roomTypes && business.roomTypes.length > 0) {
    priceHTML += `
      <div class="modal-content">
        <table class="price-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Tamaño</th>
              <th>Cama</th>
              <th>Vista</th>
              <th>Precio/noche</th>
            </tr>
          </thead>
          <tbody>
            ${business.roomTypes.map(room => `
              <tr>
                <td>${room.name}</td>
                <td>${room.size}</td>
                <td>${room.bed}</td>
                <td>${room.view}</td>
                <td>${room.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (business.units && business.units.length > 0) {
    priceHTML += `
      <div class="modal-content">
        <table class="price-table">
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Capacidad</th>
              <th>Dormitorios</th>
              <th>Baños</th>
              <th>Precio/noche</th>
            </tr>
          </thead>
          <tbody>
            ${business.units.map(unit => `
              <tr>
                <td>${unit.name}</td>
                <td>${unit.capacity}</td>
                <td>${unit.bedrooms}</td>
                <td>${unit.bathrooms}</td>
                <td>${unit.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
  return priceHTML;
}

// Helper function to create details HTML
function getDetailsHTML(business) {
  return `
    <div class="modal-content">
      <h3>Detalles de ${business.name}</h3>
      <p><strong>Descripción:</strong> ${business.description}</p>
      <div class="modal-section">
        <h4>Servicios:</h4>
        <ul>
          ${business.services.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      ${business.amenities ? `
      <div class="modal-section">
        <h4>Comodidades:</h4>
        <div class["amenities-grid">
          ${business.amenities.map(amenity => `
            <div class="amenity-item">
              ${amenity.svg}
              <span>${amenity.icon}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      ${business.highlights ? `
      <div class="modal-section">
        <h4>Destacados:</h4>
        <div class="highlights-grid">
          ${business.highlights.map(h => `
            <div class="highlight-item">
              <div class="highlight-number">${h.number}</div>
              <div class="highlight-label">${h.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  `;
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
    { id: 'ta', name: 'TripAdvisor', icon: 'M22 12.05c0 1.26-.71 2.39-1.77 2.98a11.94 11.94 0 01-6 0c-1.06-.59-1.77-1.72-1.77-2.98 0-1.26.71-2.39 1.77-2.98a11.91 11.91 0 016 0c1.06.59 1.77 1.72 1.77 2.98zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6z', url: 'flowstate_tripadvisor_hotel.html' },
    { id: 'bk', name: 'Booking', icon: 'M19 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6z', url: 'booking-demo.html' },
    { id: 'ab', name: 'Airbnb', icon: 'M5 12l7 7 7-7', url: 'airbnb-demo.html' },
    { id: 'tv', name: 'Trivago', icon: 'M12 15L5 9l7-7', url: 'trivago-demo.html' }
  ];
  
  navDiv.innerHTML = platforms.map(p => {
    // Determine if this platform is active for this business
    let isActive = false;
    if (businessId === 'hotel-boutique-palermo' || businessId === 'complejo-cabanas-marea' || businessId === 'restaurant-soho') {
      // All businesses have GBP, WhatsApp, Tripadvisor
      if (p.id === 'gbp' || p.id === 'wa' || p.id === 'ta') {
        isActive = true;
      }
      // Only hotel and complex have Booking, Airbnb, Trivago
      if ((businessId === 'hotel-boutique-palermo' || businessId === 'complejo-cabanas-marea') && 
          (p.id === 'bk' || p.id === 'ab' || p.id === 'tv')) {
        isActive = true;
      }
    }
    return `
      <a href="${p.url}?business=${businessId}" class="platform-btn ${isActive ? 'active' : ''}">
        <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="${p.icon}"/></svg>
        <span>${p.name}</span>
      </a>
    `;
  }).join('');
  
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

// Modal functions
function showModal(title, content) {
  // Remove any existing modal
  const existingModal = document.getElementById('custom-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'modal-backdrop';
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;
  
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.id = 'custom-modal';
  modalContainer.style.cssText = `
    background: white;
    border-radius: 12px;
    max-width: 90%;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    position: relative;
  `;
  
  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.style.cssText = `
    padding: 16px 20px;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = title;
  modalTitle.style.cssText = `
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #202124;
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  closeBtn.onclick = () => {
    backdrop.remove();
    modalContainer.remove();
  };
  
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeBtn);
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.innerHTML = content;
  modalContent.style.cssText = `
    padding: 20px;
  `;
  
  // Assemble modal
  modalContainer.appendChild(modalHeader);
  modalContainer.appendChild(modalContent);
  backdrop.appendChild(modalContainer);
  document.body.appendChild(backdrop);
  
  // Close on backdrop click
  backdrop.onclick = (e) => {
    if (e.target === backdrop) {
      backdrop.remove();
      modalContainer.remove();
    }
  };
  
  // Close on Escape key
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      backdrop.remove();
      modalContainer.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
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
window.initBookingDemo = initBookingDemo;
window.initAirbnbDemo = initAirbnbDemo;
window.initTrivagoDemo = initTrivagoDemo;
window.showModal = showModal;