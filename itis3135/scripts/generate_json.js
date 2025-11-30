function addGenerateJsonButton() 
{
    const clearButton = document.getElementById('clearBtn');
    const generateJsonBtn = document.createElement('button');
    generateJsonBtn.type = 'button';
    generateJsonBtn.id = 'generateJsonBtn';
    generateJsonBtn.textContent = 'Generate JSON';
    clearButton.parentNode.insertBefore(generateJsonBtn, clearButton.nextSibling);
}

function generateJson() {
    const formData = collectFormData();
    const jsonString = JSON.stringify(formData, null, 2);
    displayJsonOutput(jsonString);
    
    const pageTitle = document.querySelector('main h2');
    if (pageTitle) 
    {
        pageTitle.textContent = 'Introduction JSON';
    }
}

function setupJsonButton() 
{
    const generateJsonBtn = document.getElementById('generateJsonBtn');
    generateJsonBtn.addEventListener('click', generateJson);
}

function collectCourses() {
    const courses = [];
    const courseElements = document.querySelectorAll('.course');
    
    courseElements.forEach((courseElement) => 
    {
        const course = 
        {
            department: courseElement.querySelector('.dept').value,
            number: courseElement.querySelector('.num').value,
            name: courseElement.querySelector('.name').value,
            reason: courseElement.querySelector('.reason').value
        };
        
        if (course.department || course.number || course.name || course.reason) 
        {
            courses.push(course);
        }
    });
    
    return courses;
}

function displayJsonOutput(jsonString) 
{
    const existingOutput = document.getElementById('output');
    if (existingOutput) 
    {
        existingOutput.remove();
    }
    
    const form = document.getElementById('introForm');
    const output = document.createElement('div');
    output.id = 'output';
    
    output.innerHTML = `
        <h3>Introduction Data (JSON Format)</h3>
        <p>You can highlight and copy the JSON data below:</p>
        <pre><code class="language-json">${jsonString}</code></pre>
        <button type="button" id="backToForm">Back to Form</button>
    `;
    
    form.parentNode.insertBefore(output, form.nextSibling);
    form.style.display = 'none';
    
    document.getElementById('backToForm').addEventListener('click', function() 
    {
        form.style.display = 'block';
        output.remove();
        const pageTitle = document.querySelector('main h2');
        if (pageTitle) 
        {
            pageTitle.textContent = 'Introduction Form';
        }
    });
    
    if (typeof hljs !== 'undefined') 
    {
        hljs.highlightAll();
    }
}

function collectFormData() 
{
    const data = {};
    data.firstName = document.getElementById('firstName').value;
    data.preferredName = document.getElementById('nickname').value;
    data.middleInitial = document.getElementById('middleName').value;
    data.lastName = document.getElementById('lastName').value;
    data.divider = "~";
    data.mascotAdjective = document.getElementById('mascotAdjective').value;
    data.mascotAnimal = document.getElementById('mascotAnimal').value;
    
    const fullImagePath = document.getElementById('previewImage').src;
    data.image = fullImagePath.split('/').pop();
    data.imageCaption = document.getElementById('imageCaption').value;
    
    data.personalStatement = document.getElementById('personalStatement').value;
    data.personalBackground = document.getElementById('personalBackground').value;
    data.professionalBackground = document.getElementById('professionalBackground').value;
    data.academicBackground = document.getElementById('academicBackground').value;
    data.subjectBackground = document.getElementById('programmingBackground').value;
    data.primaryComputer = document.getElementById('computerPlatform').value;
    
    data.courses = collectCourses();
    
    data.funFact = document.getElementById('funFact').value;
    data.shareable = document.getElementById('shareable').value;
    
    data.links = [
        {
            name: "GitHub",
            href: document.getElementById('github').value
        },
        {
            name: "GitHub Page", 
            href: document.getElementById('coursePage').value
        },
        {
            name: "freeCodeCamp",
            href: "..."
        },
        {
            name: "Codecademy", 
            href: "..."
        },
        {
            name: "LinkedIn",
            href: document.getElementById('linkedin').value
        }
    ];
    
    return data;
}

document.addEventListener('DOMContentLoaded', function() 
    {
    if (!document.getElementById('generateJsonBtn')) 
        {
            addGenerateJsonButton();
        }
    
        setupJsonButton();
    });