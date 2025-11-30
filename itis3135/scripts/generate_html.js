function addGenerateHtmlButton() 
{
    const generateJsonBtn = document.getElementById('generateJsonBtn');
    const generateHtmlBtn = document.createElement('button');
    generateHtmlBtn.type = 'button';
    generateHtmlBtn.id = 'generateHtmlBtn';
    generateHtmlBtn.textContent = 'Generate HTML';
    generateJsonBtn.parentNode.insertBefore(generateHtmlBtn, generateJsonBtn.nextSibling);
}

function generateHtml() {
    const htmlString = generateHtmlString();
    displayHtmlOutput(htmlString);
    
    const pageTitle = document.querySelector('main h2');
    if (pageTitle) 
    {
        pageTitle.textContent = 'Introduction HTML';
    }
}

function setupHtmlButton() 
{
    const generateHtmlBtn = document.getElementById('generateHtmlBtn');
    generateHtmlBtn.addEventListener('click', generateHtml);
}

function displayHtmlOutput(htmlString) 
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
        <h3>Introduction Data (HTML Format)</h3>
        <p>You can highlight and copy the HTML code below:</p>
        <pre><code class="language-html">${escapeHtml(htmlString)}</code></pre>
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

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function generateHtmlString() {
    const formData = collectFormData();
    
    let html = `<h2>Introduction HTML</h2>
<h3>${formData.firstName} ${formData.middleInitial}. "${formData.preferredName}" ${formData.lastName} ${formData.divider} ${formData.mascotAdjective} ${formData.mascotAnimal}</h3>
<figure>
    <img
        src="${formData.image}"
        alt="${formData.imageCaption}"
    />
    <figcaption>${formData.imageCaption}</figcaption>
</figure>
<ul>
    <li>
        <strong>Personal Background:</strong> ${formData.personalBackground}
    </li>
    <li>
        <strong>Professional Background:</strong> ${formData.professionalBackground}
    </li>
    <li>
        <strong>Academic Background:</strong> ${formData.academicBackground}
    </li>
    <li>
        <strong>Background in this Subject:</strong> ${formData.subjectBackground}
    </li>
    <li>
        <strong>Primary Computer Platform:</strong> ${formData.primaryComputer}
    </li>
</ul>
<h4>Courses I'm Taking & Why:</h4>
<ul>`;

    formData.courses.forEach((course) => 
    {
        html += `
    <li><strong>${course.department} ${course.number}:</strong> ${course.name} - ${course.reason}</li>`;
    });

    html += `
</ul>
<h4>Funny/Interesting Item to Remember me by:</h4>
<p>${formData.funFact}</p>
<h4>I'd also like to Share:</h4>
<p>${formData.shareable}</p>`;
    
    return html;
}

document.addEventListener('DOMContentLoaded', function() 
    {
    if (!document.getElementById('generateHtmlBtn')) 
        {
            addGenerateHtmlButton();
        }
    
        setupHtmlButton();
    });