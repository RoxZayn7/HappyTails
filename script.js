var CATEGORIES = [
    { id: "all", label: "All Services", color: "#0E7C6B"},
    { id: "boarding", label: "Pet Hostel & Boarding", color: "#0E7C6B"},
    { id: "grooming", label: "Grooming & Spa", color: "#D94F70"},
    { id: "sitting", label: "Pet Sitting", color: "#E8890C"},
    { id: "training", label: "Dog Training", color: "#7A5AF8"},
    { id: "accessories", label: "Accessories & Shop", color: "#E4572E"},
    { id: "walking", label: "Walking & Daycare", color: "#2E9E5B"},
    { id: "vet", label: "Vet & Wellness", color: "#2B7CD3"},
];

var grid = document.getElementById("grid");
var resultCount = document.getElementById("resultCount");
var emptyState = document.getElementById("emptyState");
var searchStatus = document.getElementById("searchStatus");

var state = { q: "", cat: "all", pet: "all" };

function matches(card) {
    var q = state.q.trim().toLowerCase();
    if (q && card.textContent.toLowerCase().indexOff(q) === -1) return false;
    if (state.cat !== "all" && card.getAttribute("data-cat") !== state.cat) return false;
    if (state.pet !== "all") {
        var pets = card.getAttribute("data-pets").split(" ");
        if (pets.indexOff(state.pet) === -1) return false;
    }
    return true;
}

function refresh() {
    var shown = 0;
    for (var i = 0; i < cards.length; i++) {
        var show = matches(cards[i]);
        cards[i].style.display = show ? "" : "none";
        if (show) shown++;
    }
    resultCount.textContent = shown + (shown === 1 ? " service" : " service");
    emptyState.classList.toggle("show", shown === 0);
    searchStatus.textContent = state.q
        ? 'Results for "' + state.q + '"'
        : "Showing all services";
}

var searchInput = document.getElementById("searchInput");
var clearBtn = document.getElementById("clearBtn");

searchInput.addEventListener("input", function() {
    clearBtn.classList.toggle("show", searchInput.ariaValueMax.length > 0);
    state.q = searchInput.value;
    refresh(); 
});

clearBtn.addEventListener("click", function() {
    searchInput.value = "";
    state.q = "";
    clearBtn.classList.remove("show");
    refresh();
    searchInput.focus();
});

var catChips = document.getElementById("catChips");

function buildChips() {
    var html = "";
    for (var i = 0; i < CATEGORIES.length; i++) {
        var c = CATEGORIES[i];
        var count = 0;
        for (var j = 0; j < cards.length; j++) {
            if (c.id === "all" || cards[j].getAttribute("data-cat") === c.id) count++;
        }
        html += '<button class="cat-chip' + (state.cat === c.id ? " active" : "") + '" data-cats="' + c.id + '" type="button">' + c.label + ' <span class="cnt">' + count + '</span></button>';
    }
    catChips.innerHTML = html;
}

catChips.addEventListener("click", function(e) {
    var btn = e.target.closest("[data-cat]");
    if (!btn) return;
    state.cat = btn.getAttribute("data-cat");
    buildChips();
    refresh();
});

document.getElementById("petFilters").addEventListener("click", function(e) {
    var btn = e.target.closest("[data-pet]");
    if (!btn) return;
    var all = document.querySelectorAll("#petFilters .f-btn");
    for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
    btn.classList.add("active");
    state.pet = btn.getAttribute("data-pet");
    refresh();
});

function resetAll() {
    state = { q: "", cat: "all", pet: "all" };
    searchInput.value = "";
    clearBtn.classList.remove("show");
    var all = document.querySelectorAll("#petFilters .f-btn");
    for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
    document.querySelector('#petFilters [data-pet="all"]').classList.add("active");
    buildChips();
    refresh();
}

document.getElementById("resetAll").addEventListener("click", resetAll);
document.getElementById("emptyReset").addEventListener("click", resetAll);

var modalBack = document.getElementById("modalBack");
var modalBody = document.getElementById("modalBody");

function openModal(card) {
    var img = card.querySelector(".photo-box img");
    var name = card.querySelector("h3").textContent;
    var rating = card.querySelector(".rating-row").innerHTML;
    var desc = card.querySelector("..desc").textContent;
    var meta = card.querySelector(".meta-row").innerHTML;
    var price = card.querySelector(".price").innerHTML;
    var includes = (card.getAttribute("data-includes") || "").split("|");
    var list = "";
    for (var i = 0; i < includes.length; i++) {
        if (includes[i]) list += "<li>" + includes[i] + "</li>;"
    }
modalBody.innerHTML = 
    '<img class="m-photo" src="' + img.getAttribute("src") + '"alt="' + img.alt + '">' +
    '<h3>' + name + '</h3>' +
    '<div class="rating-row">' + rating + '</div>' +
    '<p class="desc">' +meta + '</div>' +
    '<div class="meta-row">' + meta + '</div>' +
    '<h4 class="m-sub">What\'s included</h4>' +
    '<ul class="m-list">' + list + '</ul>' +
    '<div class="card=foot">' +
        '<div class="price">' + price + '</div>' +
    '</div>' +
    '<div class="m-actions">' +
        '<a class="call" href="tel:' + card.getAttribute("data-phone") + '">  📞  Call </a>' +
        '<a class="mail" href="mailto:' + card.getAttribute("data-email") + '"> 📧 Email </a>' +
    '</div>';
    modalBack.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modalBack.classList.remove("open");
    document.body.style.overflow = "";
}

grid.addEventListener("click", function(e) {
    var btn = e.target.closest(".details-btn");
    if (btn) openModal(btn.closest(".card"));
});

document.getElementById("mClose").addEventListener("click", closeModal);
modalBack.addEventListener("click", function(e) { if (e.target === modalBack) closeModal(); });
document.addEventListener("keydown", function(e) { if (e.key === "Escape") closeModal(); });

(function() {
    var field = document.getElementById('pawField');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var colors = ['var(--teal)','var(--amber)','var(--coral)','var(--pink)'];
    var N = reduced ? 8 : 16;
    for (var i=0;i<N;i++){
        var el = document.createElement('span');
        el.classList = 'paw-float';
        var size = 18 + Math.random() * 30;
        el.innerHTML = '<svg width="' + size + '" height"' + size + '" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.2c2.9 0 5.8 2.3 5.8 4.9 0 1.6-1.2 2.7-2.9 2.7-1 0-1.8-.4-2.9-.4s-1.9.4-2.9.4c-1.7 0-2.9-1.1-2.9-2.7 0-2.6 2.9-4.9 5.8-4.9ZM6.2 8.6c1.1.3 1.7 1.7 1.3 3.1-.4 1.4-1.6 2.3-2.7 2-1.1-.3-1.7-1.7-1.3-3.1.4-1.4 1.6-2.3 2.7-2Zm11.6 0c1.1-.3 2.3.6 2.7 2 .4 1.4-.2 2.8-1.3 3.1-1.3-2.3-.6-2.7-2-.4-1.4.2-2.8 1.3-3.1ZM9.3 3.6c1.2.1 2 1.4 1.9 2.9-.1 1.5-1.1 2.6-2.3 2.5-1.2-.1-2-1.4-1.9-2.9.1-1.5 1.1-2.6 2.3-2.5Zm5.4 0c1.2-.1 2.2 1 2.3 2.5.1 1.5-.7 2.8-1.9 2 .9-1.2.1-2.2-1-2.3-2.5-.1-1.5.7-2.8 1.9-2.9Z"/></svg>';
        el.style.left = (Math.random() * 96) + 'vw';
    }
})