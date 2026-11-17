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