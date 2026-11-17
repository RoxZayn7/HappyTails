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