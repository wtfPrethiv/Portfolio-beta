document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-elements a');
    const navbar = document.querySelector('.container');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = 45 + 65;

        if (scrollPosition > headerHeight) {
            navbar.style.transform = 'translateY(-36px)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    let isScrolling = false;
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;

        e.preventDefault();
        isScrolling = true;

        const currentSection = getCurrentSection();
        const scrollDirection = e.deltaY > 0 ? 1 : -1;
        
        const nextSection = getAdjacentSection(currentSection, scrollDirection);
        
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }, { passive: false });

    function getCurrentSection() {
        const scrollPosition = window.scrollY;
        return Array.from(sections).find(section => 
            scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.clientHeight
        );
    }

    function getAdjacentSection(currentSection, direction) {
        const sectionArray = Array.from(sections);
        const currentIndex = sectionArray.indexOf(currentSection);
        const nextIndex = currentIndex + direction;

        return sectionArray[nextIndex] || null;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const techTabs = document.querySelectorAll(".stack-tab");
    const stackSections = document.querySelectorAll(".stack-section");
  
    techTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
  
        const targetId = tab.dataset.stack;
  
        stackSections.forEach((section) => section.classList.remove("active"));
  
        techTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
  
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add("active");
        }
      });
    });
  
    if (stackSections.length > 0) {
      stackSections[0].classList.add("active");
      techTabs[0].classList.add("active");
    }
  
    const icons = document.querySelectorAll(".tech-icon");
    const infoBox = document.querySelector(".info-box");
    const techName = document.getElementById("tech-name");
    const techDetails = document.getElementById("tech-details");
  
    const frameworks = {
      Python: ["TensorFlow", "Pandas", "Scikit-learn", "Qiskit"],
      Rust: ["Rocket", "Actix"],
      JS: ["React", "Angular"],
      TS: ["Next.js"],
    };
  
    let timeoutId;
  
    icons.forEach((icon) => {
      icon.addEventListener("mouseenter", (event) => {
        clearTimeout(timeoutId);
  
        const tech = event.target.alt || "";
        techName.textContent = tech;
        techDetails.innerHTML = "";
  
        const details = frameworks[tech];
        if (details) {
          const ul = document.createElement("ul");
          details.forEach((detail) => {
            const li = document.createElement("li");
            li.textContent = detail;
            ul.appendChild(li);
          });
          techDetails.appendChild(ul);
        }
  
        infoBox.classList.add("visible");
      });
  
      icon.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
          techName.textContent = "";
          techDetails.innerHTML = "";
  
          infoBox.classList.remove("visible");
        }, 200);
      });
    });
});