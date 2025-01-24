const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const gradientType = document.getElementById("gradientType");
const angle = document.getElementById("angle");
const angleValue = document.getElementById("angleValue");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const downloadSvgBtn = document.getElementById("downloadSvgBtn");
const presetGradients = document.getElementById("presetGradients");
const cssCode = document.getElementById("cssCode");
const previewBox = document.getElementById("previewBox");
const angleControl = document.getElementById("angleControl");
const themeToggle = document.getElementById("themeToggle");

function updateBackground() {
    let gradient;
    
    if (gradientType.value === "linear") {
        gradient = `linear-gradient(${angle.value}deg, ${color1.value}, ${color2.value})`;
        angleControl.style.display = "flex";
    } else {
        gradient = `radial-gradient(circle, ${color1.value}, ${color2.value})`;
        angleControl.style.display = "none";
    }

    previewBox.style.background = gradient;
    cssCode.textContent = `background: ${gradient};`;
}

function randomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function setRandomGradient() {
    color1.value = randomHexColor();
    color2.value = randomHexColor();
    angle.value = Math.floor(Math.random() * 360);
    angleValue.textContent = `${angle.value}°`;
    updateBackground();
}

function copyCSS() {
    navigator.clipboard.writeText(cssCode.textContent).then(() => {
        alert("🎉 CSS Copied!");
    });
}

function applyPreset() {
    const selectedPreset = presetGradients.value;
    if (selectedPreset) {
        const colors = selectedPreset.split(",");
        color1.value = colors[0];
        color2.value = colors[1] || "#ffffff";
        updateBackground();
    }
}

function downloadGradient() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const width = 800, height = 400;

    canvas.width = width;
    canvas.height = height;

    let gradient;
    if (gradientType.value === "linear") {
        gradient = ctx.createLinearGradient(0, 0, width, height);
    } else {
        gradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 2);
    }

    gradient.addColorStop(0, color1.value);
    gradient.addColorStop(1, color2.value);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const link = document.createElement("a");
    link.download = "gradient.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function downloadSVG() {
    const svgContent = `
        <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${color1.value}"/>
                    <stop offset="100%" stop-color="${color2.value}"/>
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#gradient)"/>
        </svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.download = "gradient.svg";
    link.href = URL.createObjectURL(blob);
    link.click();
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

downloadSvgBtn.addEventListener("click", downloadSVG);