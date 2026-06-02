document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('project-form');
    const tableBody = document.getElementById('table-body');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let isValid = true;
        const pname = document.getElementById('pname');
        const pdesc = document.getElementById('pdesc');
        const purl = document.getElementById('purl');
        const ptech = document.getElementById('ptech');
        const pdate = document.getElementById('pdate');

        const setError = (element, message) => {
            const errorSpan = document.getElementById(element.id + '-error');
            if (message) {
                errorSpan.textContent = message;
                element.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                errorSpan.textContent = '';
                element.removeAttribute('aria-invalid');
            }
        };

        if (pname.value.trim() === '') {
            setError(pname, 'Project name is required.');
        } else {
            setError(pname, null);
        }

        if (pdesc.value.trim() === '') {
            setError(pdesc, 'Please provide a short description.');
        } else {
            setError(pdesc, null);
        }

        const urlPattern = /^(https?:\/\/)/i;
        if (purl.value.trim() === '') {
            setError(purl, 'URL is required.');
        } else if (!urlPattern.test(purl.value.trim())) {
            setError(purl, 'Please enter a valid URL starting with http:// or https://');
        } else {
            setError(purl, null);
        }

        if (ptech.value === '') {
            setError(ptech, 'Please select a main technology.');
        } else {
            setError(ptech, null);
        }

        if (pdate.value === '') {
            setError(pdate, 'Please select a completion date.');
        } else {
            setError(pdate, null);
        }

        if (isValid) {
            const fragment = document.createDocumentFragment();
            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.textContent = pname.value.trim();

            const tdDesc = document.createElement('td');
            tdDesc.textContent = pdesc.value.trim();

            const tdUrl = document.createElement('td');
            const link = document.createElement('a');
            link.href = purl.value.trim();
            link.textContent = 'View Project';
            link.target = '_blank';
            tdUrl.appendChild(link);

            const tdTech = document.createElement('td');
            tdTech.textContent = ptech.value;

            const tdDate = document.createElement('td');
            tdDate.textContent = pdate.value;

            tr.appendChild(tdName);
            tr.appendChild(tdDesc);
            tr.appendChild(tdUrl);
            tr.appendChild(tdTech);
            tr.appendChild(tdDate);

            fragment.appendChild(tr);
            tableBody.appendChild(fragment);

            form.reset();
            
            pname.focus();
        }
    });

    form.addEventListener('reset', () => {
        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(span => span.textContent = '');
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => input.removeAttribute('aria-invalid'));
    });
});