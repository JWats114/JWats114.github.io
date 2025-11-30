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
            title: courseElement.querySelector('.name').value,
            reason: courseElement.querySelector('.reason').value
        };
        
        if (course.department || course.number || course.title || course.reason) 
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
    data.middleName = document.getElementById('middleName').value;
    data.nickname = document.getElementById('nickname').value;
    data.lastName = document.getElementById('lastName').value;
    data.mascotAdjective = document.getElementById('mascotAdjective').value;
    data.mascotAnimal = document.getElementById('mascotAnimal').value;
    
    data.imageCaption = document.getElementById('caption').value;
    data.imageSrc = document.getElementById('previewImage').src;
    
    data.personalBackground = document.getElementById('personalBackground').value;
    data.professionalBackground = document.getElementById('professionalBackground').value;
    data.academicBackground = document.getElementById('academicBackground').value;
    data.programmingBackground = document.getElementById('programmingBackground').value;
    data.computerPlatform = document.getElementById('computerPlatform').value;
    
    data.courses = collectCourses();
    
    data.funFact = document.getElementById('funFact').value;
    data.shareable = document.getElementById('shareable').value;
    
    data.links = 
    {
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        personalWebpage: document.getElementById('personalWebpage').value,
        coursePage: document.getElementById('coursePage').value,
        additionalLink: document.getElementById('additionalLink').value
    };
    
    data.generatedAt = new Date().toISOString();
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