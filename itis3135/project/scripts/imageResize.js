document.addEventListener("DOMContentLoaded", () => {
    const resumeImg = document.querySelector(".resumeDoc img");

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease";
    overlay.style.zIndex = "1000";
    overlay.style.cursor = "pointer";
    overlay.style.visibility = "hidden";

    const enlargedImg = document.createElement("img");
    enlargedImg.src = resumeImg.src;
    enlargedImg.style.maxWidth = "80%"; // limits width to 80% of viewport
    enlargedImg.style.maxHeight = "80%"; // limits height to 80% of viewport
    enlargedImg.style.width = "auto"; // maintain aspect ratio
    enlargedImg.style.height = "auto"; // maintain aspect ratio
    enlargedImg.style.boxShadow = "0 0 20px #fff";
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);

    resumeImg.addEventListener("click", () => {
        overlay.style.visibility = "visible";
        overlay.style.opacity = "1";
    });

    overlay.addEventListener("click", () => {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.visibility = "hidden";
        }, 300);
    });
});
