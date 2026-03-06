let rolling = false;

// spells loaded from spells-data.js

document.getElementById("count").innerText = "Total Spells: " + spells.length;

function rollSpell() {
  if (rolling) return;

  rolling = true;

  let button = document.getElementById("rollButton");
  button.disabled = true;

  let wheel = document.getElementById("wheel");

  // Trigger flash with random brightness, duration and glow
  const brightness = (1.8 + Math.random() * 2.2).toFixed(1);
  const duration   = (0.4 + Math.random() * 0.7).toFixed(2);
  const glowS      = Math.floor(4  + Math.random() * 6);
  const glowM      = Math.floor(12 + Math.random() * 13);
  const glowL      = Math.floor(25 + Math.random() * 25);
  wheel.style.setProperty("--flash-brightness", brightness);
  wheel.style.setProperty("--flash-duration", duration + "s");
  wheel.style.setProperty("--flash-glow-s", glowS + "px");
  wheel.style.setProperty("--flash-glow-m", glowM + "px");
  wheel.style.setProperty("--flash-glow-l", glowL + "px");
  wheel.classList.remove("flashing");
  void wheel.offsetWidth;
  wheel.classList.add("flashing");
  wheel.addEventListener("animationend", () => wheel.classList.remove("flashing"), { once: true });

  let spin = 360 * 5 + Math.random() * 360;
  wheel.style.transform = "rotate(" + spin + "deg)";

  let spell = spells[Math.floor(Math.random() * spells.length)];

  const nameEl = document.getElementById("spellName");
  const metaEl = document.getElementById("spellMeta");
  const descEl = document.getElementById("spellDescription");
  const link   = document.getElementById("spellLink");

  // Fade out existing content before the spin resolves
  nameEl.classList.remove("visible");
  metaEl.classList.remove("visible");
  descEl.classList.remove("visible");

  setTimeout(() => {
    nameEl.innerText = spell.name;
    metaEl.innerHTML =
      `<span class="tag">${spell.level}</span>` +
      `<span class="tag">${spell.school}</span>` +
      `<span class="tag">${spell.castingTime}</span>` +
      `<span class="tag">${spell.range}</span>` +
      `<span class="tag">${spell.duration}</span>`;

    const desc = spell.description || "";
    descEl.innerText = desc;

    link.innerText = "Full details on Wikidot ↗";
    link.href = spell.link;

    // Small delay so browser registers the content change before fading in
    requestAnimationFrame(() => {
      nameEl.classList.add("visible");
      metaEl.classList.add("visible");
      if (desc) descEl.classList.add("visible");
    });

    rolling = false;
    button.disabled = false;
  }, 1600);
}
