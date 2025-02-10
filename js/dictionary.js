const dictionaryData = {
    terms: {
        bokeh: {
            title: "Bokeh",
            pronunciation: "BOH-keh",
            definition: "The aesthetic quality of the blur produced in out-of-focus parts of an image, creating soft, circular shapes of light.",
            category: "Photography",
            imagePath: "assets/images/bokeh/main.jpg",
            examples: [
                "assets/images/bokeh/example1.jpg",
                "assets/images/bokeh/example2.jpg"
            ]
        },
        kawaii: {
            title: "Kawaii",
            pronunciation: "ka-wa-EE",
            definition: "Japanese concept of cuteness, characterized by childlike features, soft colors, and rounded shapes in design and illustration.",
            category: "Design",
            imagePath: "assets/images/kawaii/main.jpg",
            examples: [
                "assets/images/kawaii/example1.jpg"
            ]
        },
        parallax: {
            title: "Parallax Scrolling",
            pronunciation: "PAIR-uh-laks",
            definition: "A web design technique where background content moves at a different speed than foreground content while scrolling.",
            category: "Web Design",
            imagePath: "assets/images/parallax/main.gif"
        },
        knolling: {
            title: "Knolling",
            pronunciation: "NOHL-ing",
            definition: "The process of arranging related objects in parallel or 90-degree angles as a method of organization.",
            category: "Photography",
            imagePath: "assets/images/knolling/main.jpg",
            examples: [
                "assets/images/knolling/example1.jpg"
            ]
        },
        snakeCase: {
            title: "Snake Case",
            pronunciation: "SNAKE-case",
            definition: "A naming convention where words_are_separated_by_underscores, commonly used in programming.",
            category: "Development",
            imagePath: "assets/images/snake-case/main.jpg"
        },
        colourGel: {
            title: "Colour Gel",
            pronunciation: "KUH-lr jel",
            definition: "Transparent, colored material placed over lights to create colored lighting effects in photography and film.",
            category: "Photography",
            imagePath: "assets/images/colour-gel/main.jpg",
            examples: [
                "assets/images/colour-gel/example1.jpg"
            ]
        },
        hamburgerMenu: {
            title: "Hamburger Menu",
            pronunciation: "HAM-bur-gur MEH-nyoo",
            definition: "The three-line menu icon (☰) used to toggle navigation menus, especially on mobile interfaces.",
            category: "UI Design",
            imagePath: "assets/images/hamburger-menu/main.jpg"
        },
        dutchAngle: {
            title: "Dutch Angle",
            pronunciation: "DUHCH ANG-guhl",
            definition: "A camera technique where the frame is rotated to create a tilted perspective, often used to create tension or disorientation.",
            category: "Cinematography",
            imagePath: "assets/images/dutch-angle/main.jpg",
            examples: [
                "assets/images/dutch-angle/example1.jpg"
            ]
        },
        moire: {
            title: "Moiré Effect",
            pronunciation: "mwar-AY",
            definition: "A visual perception that occurs when viewing a set of lines or dots that is superimposed on another similar pattern.",
            category: "Visual Effects",
            imagePath: "assets/images/moire/main.jpg"
        },
        pareidolia: {
            title: "Pareidolia",
            pronunciation: "pair-i-DOH-lee-a",
            definition: "The tendency to perceive a specific, often meaningful image in a random or unrelated visual pattern.",
            category: "Psychology",
            imagePath: "assets/images/pareidolia/main.jpg",
            examples: [
                "assets/images/pareidolia/example1.jpg"
            ]
        },
        flatLay: {
            title: "Flat Lay",
            pronunciation: "FLAT-lay",
            definition: "A photograph shot directly from above of items arranged on a flat surface, popular in food and product photography.",
            category: "Photography",
            imagePath: "assets/images/flat-lay/main.jpg",
            examples: [
                "assets/images/flat-lay/example1.jpg"
            ]
        }
    }
};

// Create term cards with click handler
function createTermCard(term) {
    return `
        <div class="term-card" onclick="showTermDetail('${term.title}')">
            <img class="term-image" src="${term.imagePath}" alt="${term.title}">
            <div class="term-content">
                <h2 class="term-title">${term.title}</h2>
                <div class="term-category">${term.category}</div>
                <p class="term-definition">${term.definition}</p>
            </div>
        </div>
    `;
}

// Show term detail modal
function showTermDetail(title) {
    const term = Object.values(dictionaryData.terms).find(t => t.title === title);
    const allImages = [term.imagePath, ...(term.examples || [])];
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
            <div class="carousel">
                <div class="carousel-images">
                    <img class="modal-image active" src="${allImages[0]}" alt="${term.title}">
                    ${allImages.slice(1).map(img => `
                        <img class="modal-image" src="${img}" alt="${term.title}">
                    `).join('')}
                </div>
                ${allImages.length > 1 ? `
                    <button class="carousel-button prev" onclick="moveCarousel(-1)">❮</button>
                    <button class="carousel-button next" onclick="moveCarousel(1)">❯</button>
                    <div class="carousel-dots">
                        ${allImages.map((_, i) => `
                            <span class="dot ${i === 0 ? 'active' : ''}" onclick="jumpToSlide(${i})"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="modal-text">
                <h2>${term.title}</h2>
                <p class="pronunciation">${term.pronunciation}</p>
                <div class="category">${term.category}</div>
                <p class="definition">${term.definition}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

let currentSlide = 0;

function moveCarousel(direction) {
    const images = document.querySelectorAll('.modal-image');
    const dots = document.querySelectorAll('.dot');
    
    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + images.length) % images.length;
    
    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function jumpToSlide(index) {
    const images = document.querySelectorAll('.modal-image');
    const dots = document.querySelectorAll('.dot');
    
    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
    currentSlide = 0;
}

// Populate category filter
function populateCategories() {
    const categories = new Set(Object.values(dictionaryData.terms).map(term => term.category));
    const categorySelect = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Display terms
function displayTerms(terms = dictionaryData.terms) {
    const container = document.getElementById('termsContainer');
    container.innerHTML = Object.values(terms)
        .map(term => createTermCard(term))
        .join('');
}

// Filter terms
function filterTerms() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    const filteredTerms = Object.fromEntries(
        Object.entries(dictionaryData.terms).filter(([_, term]) => {
            const matchesSearch = term.title.toLowerCase().includes(searchText) ||
                                term.definition.toLowerCase().includes(searchText);
            const matchesCategory = !selectedCategory || term.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
    );
    
    displayTerms(filteredTerms);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    displayTerms();
    
    document.getElementById('searchInput').addEventListener('input', filterTerms);
    document.getElementById('categoryFilter').addEventListener('change', filterTerms);
});