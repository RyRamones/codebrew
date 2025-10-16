const menuIcon = document.querySelector("#menu")
const navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
  // Toggle between bars and X icon
  menuIcon.classList.toggle("fa-bars")
  menuIcon.classList.toggle("fa-xmark")
  navbar.classList.toggle("active")
}

//scroll section
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY
    const offset = sec.offsetTop - 100
    const height = sec.offsetHeight
    const id = sec.getAttribute("id")

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active")
        document.querySelector("header nav a[href*= " + id + "]").classList.add("active")
      })
    }
  })
  menuIcon.classList.remove("fa-xmark")
  menuIcon.classList.add("fa-bars")
  navbar.classList.remove("active")
}

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")
  const viewMoreBtn = document.querySelector(".view-more .btn")

  let currentFilter = "all"
  let showingAll = false
  const itemsToShow = 6

  // Initialize - show only first 6 items
  function initializePortfolio() {
    portfolioItems.forEach((item, index) => {
      if (index < itemsToShow) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
    showingAll = false
    updateViewMoreButton()
  }

  // Filter items based on category
  function filterItems(filterValue) {
    currentFilter = filterValue
    showingAll = false

    let visibleCount = 0

    portfolioItems.forEach((item) => {
      const shouldShow = filterValue === "all" || item.classList.contains(filterValue)

      if (shouldShow) {
        if (visibleCount < itemsToShow) {
          item.style.display = "block"
          visibleCount++
        } else {
          item.style.display = "none"
        }
      } else {
        item.style.display = "none"
      }
    })

    updateViewMoreButton()
  }

  function showAllItems() {
    let visibleCount = 0

    portfolioItems.forEach((item) => {
      const shouldShow = currentFilter === "all" || item.classList.contains(currentFilter)

      if (shouldShow) {
        item.style.display = "block"
        item.style.animation = "fadeIn 0.5s ease-in-out"
        visibleCount++
      } else {
        item.style.display = "none"
      }
    })

    showingAll = true
    updateViewMoreButton()

    // Log for debugging
    console.log(`Showing ${visibleCount} items for filter: ${currentFilter}`)
  }

  // Update View More button text and visibility
  function updateViewMoreButton() {
    const filteredItems = Array.from(portfolioItems).filter((item) => {
      return currentFilter === "all" || item.classList.contains(currentFilter)
    })

    if (filteredItems.length <= itemsToShow) {
      viewMoreBtn.parentElement.style.display = "none"
    } else {
      viewMoreBtn.parentElement.style.display = "block"

      if (showingAll) {
        viewMoreBtn.innerHTML = 'Show Less <i class="bx bx-up-arrow-alt"></i>'
      } else {
        viewMoreBtn.innerHTML = 'View More Works <i class="bx bx-right-arrow-alt"></i>'
      }
    }
  }

  // Filter button click handlers
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value and apply filter
      const filterValue = this.getAttribute("data-filter")
      filterItems(filterValue)
    })
  })

  viewMoreBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (showingAll) {
      // Show less - go back to initial state
      filterItems(currentFilter)

      // Scroll to portfolio section
      document.querySelector("#portfolio").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } else {
      // Show all items
      showAllItems()

      // Small delay before scrolling to ensure items are rendered
      setTimeout(() => {
        const lastVisibleItem = Array.from(portfolioItems)
          .filter((item) => item.style.display === "block")
          .pop()

        if (lastVisibleItem) {
          lastVisibleItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          })
        }
      }, 100)
    }
  })

  // Initialize portfolio on page load
  initializePortfolio()

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  }, observerOptions)

  // Observe all elements with scroll-reveal classes
  const revealElements = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger",
  )

  revealElements.forEach((element) => {
    observer.observe(element)
  })

  // Add scroll-reveal classes to sections
  const aboutSection = document.querySelector(".about-content")
  if (aboutSection) {
    aboutSection.classList.add("scroll-reveal")
  }

  const internshipCards = document.querySelectorAll(".internship-card")
  internshipCards.forEach((card, index) => {
    if (index === 0) {
      card.classList.add("scroll-reveal-left")
    } else {
      card.classList.add("scroll-reveal-right")
    }
  })

  const portfolioGrid = document.querySelector(".portfolio-grid")
  if (portfolioGrid) {
    portfolioGrid.classList.add("scroll-reveal-stagger")
  }

  const contactWrapper = document.querySelector(".contact-wrapper")
  if (contactWrapper) {
    const contactInfo = contactWrapper.querySelector(".contact-info")
    const contactForm = contactWrapper.querySelector(".contact-form-container")
    if (contactInfo) contactInfo.classList.add("scroll-reveal-left")
    if (contactForm) contactForm.classList.add("scroll-reveal-right")
  }

  // Animate section headers
  const sectionHeaders = document.querySelectorAll(".section-header")
  sectionHeaders.forEach((header) => {
    header.classList.add("scroll-reveal-scale")
  })

  const typewriterElement = document.querySelector(".typewriter")

  if (typewriterElement) {
    const phrases = ["IT Student", "Web Designer", "Technical Support"]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function type() {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        // Remove characters
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        // Add characters
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      // Check if word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of word
        typingSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500
      }

      setTimeout(type, typingSpeed)
    }

    // Start typing effect
    type()
  }
})

// Image modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const portfolioBoxes = document.querySelectorAll(".portfolio-item img")
  const modal = document.getElementById("image-modal")

  // Only proceed if modal exists
  if (modal) {
    const modalImg = document.getElementById("modal-img")
    const closeBtn = document.getElementById("close")

    // Add click event to each image
    portfolioBoxes.forEach((img) => {
      img.addEventListener("click", function (e) {
        e.preventDefault()
        if (modalImg) {
          modalImg.src = this.src
          modal.style.display = "flex"
        }
      })
    })

    // Close the modal when the close button is clicked
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none"
      })
    }

    // Close the modal when clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  }
})
