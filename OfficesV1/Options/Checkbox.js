
  document.addEventListener("valid-change-checkbox", (e) => {
    const { input, value, path, isChecked } = e.detail;
    const parent = input.closest('[cf-options-parent]')?.getAttribute("cf-options-parent");


    
    if (!value || !parent) return;

    // 1. Manejo de divs de display (compatible con "any")
    document.querySelectorAll(`
      [cf-options-display-div="${parent}"][cf-options-match="${value}"],
      [cf-options-display-div="${parent}"][cf-options-match="any"]
    `).forEach(div => {
      const isAny = div.getAttribute("cf-options-match") === "any";
      
      // Mostrar si: es "any" O está checked (para match específico)
      div.style.display = (isAny || isChecked) ? "block" : "none";
      });

// 2. Manejo de grupos hijos y required (con soporte "any")
document.querySelectorAll(`
  [cf-options-child="${parent}"][cf-options-target="${value}"],
  [cf-options-child="${parent}"][cf-options-target="any"]
`).forEach(child => {
  const hiddenInputs = child.querySelectorAll('input[cf-json-path]');
  const isAny = child.getAttribute("cf-options-target") === "any";

  hiddenInputs.forEach(hiddenInput => {
    if (isAny || isChecked) {
      hiddenInput.setAttribute("data-required", "");
    } else {
      hiddenInput.removeAttribute("data-required");
    }
  });
});


// 2. Manejo de directo de inputs (required)
document.querySelectorAll(`
  input[cf-options-child="${parent}"][cf-options-target="${value}"],
  input[cf-options-child="${parent}"][cf-options-target="any"]
`).forEach(input => {
  const isAny = input.getAttribute("cf-options-target") === "any";

  if (isAny || isChecked) {
    input.setAttribute("data-required", "");
  } else {
    input.removeAttribute("data-required");
  }
});




    // 3. Actualización de formulario (sin cambios)
    if (input) {
      const parentForm = input.closest('[cf-form-submit]');
      const formIdentifier = parentForm?.getAttribute('cf-form-submit');

      if (formIdentifier) {
        document.dispatchEvent(new CustomEvent('cf-update-form', {
          detail: { formIdentifier }
        }));
      }
    }
  });