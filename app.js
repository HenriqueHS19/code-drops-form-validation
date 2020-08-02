const form = document.querySelector('form');
const fields = document.querySelectorAll('input[required]');

form.addEventListener('submit', function (event) {
    event.preventDefault();
});

fields.forEach(function (field) {
    field.addEventListener('invalid', customValidation);
});
fields.forEach(function (field) {
    field.addEventListener('blur', customValidation);
});

function customValidation(event) {

    event.preventDefault();

    const field = event.target;

    const validation = validateField(field);

    validation();

}

function validateField(field) {
    function verifyErrors() {
        const errors = field.validity;
        let foundError = false;

        for (let error in errors) {
            if (errors[error] && !errors.valid) {
                foundError = error;
            }
        }

        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: 'This field is required',
            },
            email: {
                valueMissing: 'This field is required',
                typeMismatch: 'Invalid E-mail'
            }
        };

        return messages[field.type][typeError];
    }

    function setCustomMessage(message) {
        // parentNode -> get element father of field
        const span = field.parentNode.querySelector('span.error');

        if (message) {
            span.classList.add('active');
            span.innerHTML = message;
        }
        else {
            span.classList.remove('active');
            span.innerHTML = '';
        }
    }

    return function () {
        const error = verifyErrors();

        if (error) {
            const message = customMessage(error);
            setCustomMessage(message);
        }
        else {
            setCustomMessage();
        }
    }

}
