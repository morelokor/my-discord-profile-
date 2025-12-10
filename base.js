function openDiv() {
    document.getElementById("div3").classList.add("show");
    document.getElementById("shadow1").classList.add("show");
}

function closeDiv() {
    document.getElementById("div3").classList.remove("show");
    document.getElementById("shadow1").classList.remove("show");
}

// Prevent div3 from closing when clicked inside
document.getElementById("div3").addEventListener("click", function(event) {
    event.stopPropagation();
});
