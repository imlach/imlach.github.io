/**
 * Simple Lightbox
 * A lightweight, vanilla JavaScript lightbox for image galleries
 */
(function() {
	'use strict';

	let currentIndex = 0;
	let images = [];
	let lightbox = null;
	let lightboxImage = null;
	let counter = null;

	function createLightbox() {
		// Create lightbox container
		lightbox = document.createElement('div');
		lightbox.className = 'lightbox';
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-modal', 'true');
		lightbox.setAttribute('aria-label', 'Image lightbox');

		// Create content wrapper
		const content = document.createElement('div');
		content.className = 'lightbox-content';

		// Create image element
		lightboxImage = document.createElement('img');
		lightboxImage.className = 'lightbox-image';
		lightboxImage.setAttribute('alt', 'Lightbox image');

		// Create close button
		const closeBtn = document.createElement('button');
		closeBtn.className = 'lightbox-close';
		closeBtn.innerHTML = '&times;';
		closeBtn.setAttribute('aria-label', 'Close lightbox');
		closeBtn.onclick = closeLightbox;

		// Create previous button
		const prevBtn = document.createElement('button');
		prevBtn.className = 'lightbox-prev';
		prevBtn.innerHTML = '&#10094;';
		prevBtn.setAttribute('aria-label', 'Previous image');
		prevBtn.onclick = previousImage;

		// Create next button
		const nextBtn = document.createElement('button');
		nextBtn.className = 'lightbox-next';
		nextBtn.innerHTML = '&#10095;';
		nextBtn.setAttribute('aria-label', 'Next image');
		nextBtn.onclick = nextImage;

		// Create counter
		counter = document.createElement('div');
		counter.className = 'lightbox-counter';

		// Assemble lightbox
		content.appendChild(lightboxImage);
		lightbox.appendChild(closeBtn);
		lightbox.appendChild(prevBtn);
		lightbox.appendChild(nextBtn);
		lightbox.appendChild(content);
		lightbox.appendChild(counter);
		document.body.appendChild(lightbox);

		// Click outside to close
		lightbox.addEventListener('click', function(e) {
			if (e.target === lightbox) {
				closeLightbox();
			}
		});
	}

	function openLightbox(index) {
		if (!lightbox) {
			createLightbox();
		}

		currentIndex = index;
		updateLightboxImage();
		lightbox.classList.add('active');
		document.body.style.overflow = 'hidden';

		// Add keyboard navigation
		document.addEventListener('keydown', handleKeyPress);
	}

	function closeLightbox() {
		if (lightbox) {
			lightbox.classList.remove('active');
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleKeyPress);
		}
	}

	function updateLightboxImage() {
		if (images.length > 0 && lightboxImage && counter) {
			lightboxImage.src = images[currentIndex].href;
			lightboxImage.alt = images[currentIndex].alt || 'Portfolio image';
			counter.textContent = `${currentIndex + 1} / ${images.length}`;
		}
	}

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
		updateLightboxImage();
	}

	function previousImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		updateLightboxImage();
	}

	function handleKeyPress(e) {
		switch(e.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowRight':
				nextImage();
				break;
			case 'ArrowLeft':
				previousImage();
				break;
		}
	}

	function initLightbox() {
		// Find all image links with class 'work'
		const imageLinks = document.querySelectorAll('a.work');
		
		images = Array.from(imageLinks).map(link => ({
			href: link.getAttribute('href'),
			alt: link.querySelector('img')?.getAttribute('alt') || 
			     link.querySelector('.work-grid')?.style.backgroundImage?.match(/url\(["']?([^"')]+)["']?\)/)?.[1] || ''
		}));

		// Add click event to each image link
		imageLinks.forEach((link, index) => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				openLightbox(index);
			});
		});
	}

	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initLightbox);
	} else {
		initLightbox();
	}

})();
