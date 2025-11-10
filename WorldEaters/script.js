const armyButtons = document.querySelectorAll("#armyTabs button");
const contents = document.querySelectorAll(".tabContent");

armyButtons.forEach(button => {
  button.addEventListener("click", () => {

    // remove active highlight
    armyButtons.forEach(b => b.classList.remove("activeTab"));
    button.classList.add("activeTab");

    // hide all content
    contents.forEach(c => c.style.display = "none");

    // show matched section
    const section = button.id.replace("Tab", "Content"); 
    document.getElementById(section).style.display = "block";
  });
});

// default tab
document.getElementById("armyTab").click();

// Detachment sub-tabs
const detButtons = document.querySelectorAll("#detachmentTabs button");
const detContents = document.querySelectorAll(".detContent");

detButtons.forEach(button => {
  button.addEventListener("click", () => {
    
    // Remove highlight
    detButtons.forEach(b => b.classList.remove("activeDet"));
    button.classList.add("activeDet");

    // Hide all sub-content
    detContents.forEach(c => c.style.display = "none");

    // Show chosen content
    const id = button.getAttribute("data-det") + "Content";
    document.getElementById(id).style.display = "block";
  });
});

// Default detachment when tab opens
if (detButtons.length > 0) {
  detButtons[0].click();
}

// Unit sub-tabs
const unitButtons = document.querySelectorAll("#unitTabs button");
const unitContents = document.querySelectorAll(".unitContent");

unitButtons.forEach(button => {
  button.addEventListener("click", () => {
    
    // Remove highlight
    unitButtons.forEach(b => b.classList.remove("activeUnit"));
    button.classList.add("activeUnit");

    // Hide all sub-content
    unitContents.forEach(c => c.style.display = "none");

    // Show chosen content
    const id = button.getAttribute("data-unit") + "Content";
    document.getElementById(id).style.display = "block";
  });
});

// Default detachment when tab opens
if (unitButtons.length > 0) {
  unitButtons[0].click();
}

// Register service worker for offline caching
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

// Get units.json
async function loadUnits() {
  const res = await fetch('units.json');
  const data = await res.json();
  return data;
}

// For loop the json
function renderUnits(category, data) {
  const container = document.getElementById(`${category}Content`);
  container.innerHTML = `<h3>${category}</h3>`;

  data[category].forEach(unit => {
    const el = document.createElement('div');
    el.className = "unitCard";
    el.innerHTML = `
      <h4>${unit.name}</h4>
      <p>Move: ${unit.movement} | Save: ${unit.save} | Wounds: ${unit.wounds}</p>
      <p>Abilities:</p>
      <ul>${unit.abilities.map(a => `<li>${a}</li>`).join("")}</ul>
    `;
    container.appendChild(el);
  });
}

loadUnits().then(data => {
  renderUnits("character", data);
  renderUnits("infantry", data);
  renderUnits("vehicles", data);
});