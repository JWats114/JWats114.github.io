const form = document.getElementById("introForm");
const clearBtn = document.getElementById("clearBtn");
const addCourseBtn = document.getElementById("addCourse");
const coursesDiv = document.getElementById("courses");
const pictureInput = document.getElementById("picture");
const previewImage = document.getElementById("previewImage");

function displayOutput(html) {
    form.insertAdjacentHTML("afterend", `<div id="output">${html}<br><button id="resetPage">Reset Page</button></div>`);
    form.style.display = "none";
    
    document.getElementById("resetPage").addEventListener("click", () => {
        document.getElementById("output").remove();
        form.reset();
        previewImage.src = "images/funPic.jpg";
        form.style.display = "block";
    });
}

function generateFormDataHTML() {
    let html = "";
    
    const fields = [
        { name: "firstName", label: "First Name" },
        { name: "middleName", label: "Middle Name" },
        { name: "nickname", label: "Nickname" },
        { name: "lastName", label: "Last Name" },
        { name: "mascotAdjective", label: "Mascot Adjective" },
        { name: "mascotAnimal", label: "Mascot Animal" },
        { name: "caption", label: "Caption" },
        { name: "personalBackground", label: "Personal Background" },
        { name: "professionalBackground", label: "Professional Background" },
        { name: "academicBackground", label: "Academic Background" },
        { name: "programmingBackground", label: "Programming Background" },
        { name: "computerPlatform", label: "Computer Platform" },
        { name: "funFact", label: "Fun Fact" },
        { name: "shareable", label: "Something to Share" },
        { name: "linkedin", label: "LinkedIn" },
        { name: "github", label: "GitHub" },
        { name: "personalWebpage", label: "Personal Website" },
        { name: "coursePage", label: "Course Webpage" },
        { name: "additionalLink", label: "Additional Link" }
    ];
    
    fields.forEach((field) => {
        const input = form.querySelector(`[name="${field.name}"]`);
        if (input && input.value) {
            html += `<p><strong>${field.label}:</strong> ${input.value}</p>`;
        }
    });
    
    const courses = document.querySelectorAll('.course');
    if (courses.length > 0) {
        html += `<p><strong>Courses:</strong></p><ul>`;
        courses.forEach((course) => {
            const dept = course.querySelector('.dept').value;
            const num = course.querySelector('.num').value;
            const name = course.querySelector('.name').value;
            const reason = course.querySelector('.reason').value;
            
            if (dept || num || name || reason) {
                html += `<li>${dept} ${num}: ${name} - ${reason}</li>`;
            }
        });
        html += `</ul>`;
    }
    
    return html;
}

function handleFormSubmit() {
    let html = "<h2>Your Submitted Information</h2>";
    
    const file = pictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            html += `<p><strong>Picture:</strong><br><img src="${e.target.result}" width="250" alt="Submitted photo"></p>`;
            html += generateFormDataHTML();
            displayOutput(html);
        };
        reader.readAsDataURL(file);
    } else {
        html += `<p><strong>Picture:</strong><br><img src="${previewImage.src}" width="250" alt="Default photo"></p>`;
        html += generateFormDataHTML();
        displayOutput(html);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit();
});

pictureInput.addEventListener("change", () => {
    const file = pictureInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => previewImage.src = e.target.result;
    reader.readAsDataURL(file);
});

clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all fields?")) {
        Array.from(form.querySelectorAll("input")).forEach((input) => {
            if (input.type !== 'file') {
                input.value = "";
            }
        });
        pictureInput.value = "";
        previewImage.src = "images/funPic.jpg";
    }
});

addCourseBtn.addEventListener("click", () => {
    const courseCount = document.querySelectorAll('.course').length + 1;
    const wrapper = document.createElement("div");
    wrapper.className = "course";
    wrapper.innerHTML = `
        <label for="dept${courseCount}">Department</label><br>
        <input type="text" id="dept${courseCount}" placeholder="Department" class="dept" name="dept[]"><br><br>
        <label for="num${courseCount}">Class Number</label><br>
        <input type="text" id="num${courseCount}" placeholder="Number" class="num" name="num[]"><br><br>
        <label for="name${courseCount}">Class Title</label><br>
        <input type="text" id="name${courseCount}" placeholder="Name" class="name" name="name[]"><br><br>
        <label for="reason${courseCount}">Reason for taking</label><br>
        <input type="text" id="reason${courseCount}" placeholder="Reason" class="reason" name="reason[]"><br><br>
        <button type="button" class="deleteCourse">❌</button><br><br>
    `;
    wrapper.querySelector(".deleteCourse").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this course?")) {
            wrapper.remove();
        }
    });
    coursesDiv.appendChild(wrapper);
});

Array.from(document.getElementsByClassName("deleteCourse")).forEach((btn) => {
    btn.addEventListener("click", function(e) {
        if (confirm("Are you sure you want to delete this course?")) {
            e.target.closest('.course').remove();
        }
    });
});