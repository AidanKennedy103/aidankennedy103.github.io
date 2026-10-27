// Nav border on scroll
const nav = document.querySelector(".nav");
const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Fade sections in as they enter the viewport
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
} else {
    reveals.forEach((el) => el.classList.add("is-in"));
}

// Click a figure to view it full size
const figures = document.querySelectorAll(".fig button");
if (figures.length && typeof HTMLDialogElement === "function") {
    const box = document.createElement("dialog");
    box.className = "lightbox";
    box.innerHTML =
        '<img alt="">' +
        '<div class="lightbox-bar"><span class="lightbox-caption"></span>' +
        '<button class="lightbox-close" type="button">Close</button></div>';
    document.body.appendChild(box);

    const boxImg = box.querySelector("img");
    const boxCaption = box.querySelector(".lightbox-caption");

    figures.forEach((btn) => {
        btn.addEventListener("click", () => {
            const img = btn.querySelector("img");
            const caption = btn.closest("figure").querySelector("figcaption");
            boxImg.src = img.currentSrc || img.src;
            boxImg.alt = img.alt;
            boxCaption.textContent = caption ? caption.textContent.trim() : img.alt;
            box.showModal();
        });
    });

    box.querySelector(".lightbox-close").addEventListener("click", () => box.close());
    box.addEventListener("click", (e) => {
        if (e.target === box) box.close();
    });
}

document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
});
