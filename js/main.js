document.addEventListener("DOMContentLoaded", () => {

    // Spinner
    const spinner = document.getElementById("spinner");
    if (spinner) setTimeout(() => spinner.classList.remove("show"), 500);

    // Smooth Scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if(targetSection){
            const navHeight = document.querySelector("nav").offsetHeight;
            const sectionTop = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: sectionTop,
                behavior: "smooth"
            });

            // Re-trigger pop animation
            targetSection.classList.remove("show");
            setTimeout(() => targetSection.classList.add("show"), 400);
        }
    });
});


    // Typing Effect
    const typedEl = document.querySelector(".typed-text-output");
    if(typedEl){
        let words = typedEl.dataset.words.split(",");
        let i=0,j=0,isDeleting=false;
        const type = () => {
            let word = words[i];
            typedEl.textContent = word.substring(0,j);
            if(!isDeleting && j<word.length) j++;
            else if(isDeleting && j>0) j--;
            else if(!isDeleting && j===word.length){isDeleting=true; setTimeout(type,1000); return;}
            else if(isDeleting && j===0){isDeleting=false; i=(i+1)%words.length;}
            setTimeout(type,isDeleting?50:120);
        };
        type();
    }

    // Skills Animation
    const skillsSection = document.getElementById("skills");
    let skillsAnimated = false;

    function animateSkills() {
        if (!skillsSection) return;
        const rect = skillsSection.getBoundingClientRect();
        if(rect.top < window.innerHeight && !skillsAnimated){
            document.querySelectorAll(".skill").forEach(skill => {
                const bar = skill.querySelector(".progress-bar");
                const percentEl = skill.querySelector(".skill-percent");
                const target = +percentEl.dataset.percent;
                let width = 0;
                const interval = setInterval(() => {
                    if(width >= target) clearInterval(interval);
                    else {
                        width++;
                        bar.style.width = width + "%";
                        percentEl.textContent = width + "%";
                    }
                }, 15); // speed of animation
            });
            skillsAnimated = true;
        }
    }

    // Trigger on scroll
    window.addEventListener("scroll", animateSkills);
    animateSkills(); // Trigger in case section already visible

    // Back to top
    const backToTop = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => backToTop.style.display = window.scrollY>100?"block":"none");
    if(backToTop){
        backToTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
    }

// Counter Animation on Scroll (1 by 1 increment with smooth speed)
function animateCounter(counter) {
    let target = +counter.getAttribute("data-target");
    let count = 0;
    let step = Math.ceil(target / 100); // smoother steps

    function update() {
        if (count < target) {
            count += step;
            counter.textContent = Math.min(count, target);
            setTimeout(update, 300); // slower speed
        }
    }
    update();
}

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target); // run once
        }
    });
}, { threshold: 0.1 }); // lower threshold to trigger earlier

// Initialize counters
document.querySelectorAll("[data-toggle='counter-up']").forEach(counter => {
    let finalValue = counter.textContent.trim();
    counter.setAttribute("data-target", finalValue);
    counter.textContent = "0"; // reset before animation
    observer.observe(counter);
});
const faders = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
faders.forEach(el => fadeObserver.observe(el));
// Reveal Text Animation
const revealEls = document.querySelectorAll(".reveal-text");
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
revealEls.forEach(el => revealObserver.observe(el));
// Zoom-in Animation
const zoomEls = document.querySelectorAll(".zoom-in");
const zoomObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
zoomEls.forEach(el => zoomObserver.observe(el));
// Stagger Animation
const staggerEls = document.querySelectorAll(".stagger");
const staggerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("show"), i * 150);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
staggerEls.forEach(el => staggerObserver.observe(el));

// Smooth Scroll + Trigger Pop Animation with Nav Offset
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = document.querySelector("nav").offsetHeight;
            const sectionTop = targetSection.offsetTop - navHeight - 20; // offset + extra gap

            window.scrollTo({
                top: sectionTop,
                behavior: "smooth"
            });

            // Reset + trigger pop animation
            targetSection.classList.remove("show");
            setTimeout(() => {
                targetSection.classList.add("show");
            }, 400);
        }
    });
});


// Section Pop on Scroll
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

sections.forEach(sec => {
    sec.classList.add("section-pop");
    sectionObserver.observe(sec);
});

// Show first section immediately on load
if(sections.length > 0){
    sections[0].classList.add("show");
}

});

