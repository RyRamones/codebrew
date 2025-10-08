let menuIcon = document.querySelector('#menu');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
        navLinks.forEach(links => {
         links.classList.remove('active');
         document.querySelector('header nav a[href*= ' + id + ']').classList.add('active');
        });
    }
    });
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// projects

const listItems = document.querySelectorAll('.project-list li');
 listItems.forEach(item => {
    item.addEventListener('click',function() {
        
        document.querySelector('.project-list-active').classList.remove('project-list-active');
        
       
        this.classList.add('project-list-active');
    });
});

document.addEventListener("DOMContentLoaded", function() {
   
    const listItems = document.querySelectorAll('.list');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
           
            const value = this.getAttribute('data-filter');

           
            if (value === 'all') {
                document.querySelectorAll('.project-box').forEach(box => {
                    box.style.display = 'block';
                });
            } else {
             
                document.querySelectorAll('.project-box').forEach(box => {
                    if (box.classList.contains(value)) {
                        box.style.display = 'block';
                    } else {
                        box.style.display = 'none';
                    }
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const projectBoxes = document.querySelectorAll('.project-box img');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('close');

    // Add click event to each image
    projectBoxes.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            modalImg.src = this.src; // Set the modal image to the clicked image source
            modal.style.display = 'flex'; // Show the modal
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });

    // Close the modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none'; // Hide the modal if the background is clicked
        }
    });
});

