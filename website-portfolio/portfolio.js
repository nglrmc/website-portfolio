const sections = document.querySelectorAll('section, #home');
const links = document.querySelectorAll('.nav-links a');

const obs = new IntersectionObserver(entries => {
entries.forEach(e => {
    if (e.isIntersecting) {
    links.forEach(l => l.classList.remove('active'));
    const id = e.target.id;
    const active = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (active) active.classList.add('active');
    }
});
}, { threshold: 0.4 });

sections.forEach(s => obs.observe(s));

const fadeEls = document.querySelectorAll('.skill-card, .project-card');
const fadeObs = new IntersectionObserver(entries => {
entries.forEach((e, i) => {
    if (e.isIntersecting) {
    e.target.style.transitionDelay = `${i * 60}ms`;
    e.target.classList.add('visible');
    }
});
}, { threshold: 0.1 });

fadeEls.forEach(el => {
el.classList.add('fade-up');
fadeObs.observe(el);
});