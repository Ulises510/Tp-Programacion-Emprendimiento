document.addEventListener('DOMContentLoaded', () => {

  // 1. AÑO DINÁMICO EN EL FOOTER
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. BOTÓN "VOLVER ARRIBA" (BACK TO TOP)
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. FILTRO INTERACTIVO DE PRODUCTOS EN EL CATÁLOGO (INDEX.HTML)
  const filterButtons = document.querySelectorAll('#filter-buttons .btn-filter');
  const productItems = document.querySelectorAll('#product-grid .product-item');

  if (filterButtons.length > 0 && productItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover estado activo de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar activo al botón seleccionado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || filterValue === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. VALIDACIÓN DE FORMULARIO DE CONTACTO Y MENSAJE DE CONFIRMACIÓN (CONTACTO.HTML)
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contact-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const asunto = document.getElementById('asunto');
      const mensaje = document.getElementById('mensaje');

      let isValid = true;

      // Validación de campo Nombre
      if (!nombre.value.trim()) {
        nombre.classList.add('is-invalid');
        isValid = false;
      } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
      }

      // Validación de campo Email con RegEx
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
      }

      // Validación de Asunto
      if (!asunto.value) {
        asunto.classList.add('is-invalid');
        isValid = false;
      } else {
        asunto.classList.remove('is-invalid');
        asunto.classList.add('is-valid');
      }

      // Validación de Mensaje
      if (!mensaje.value.trim()) {
        mensaje.classList.add('is-invalid');
        isValid = false;
      } else {
        mensaje.classList.remove('is-invalid');
        mensaje.classList.add('is-valid');
      }

      // Si todos los campos son válidos
      if (isValid) {
        if (contactAlert) {
          contactAlert.classList.remove('d-none');
          contactAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Resetear formulario
        contactForm.reset();

        // Limpiar clases is-valid tras 5 segundos
        setTimeout(() => {
          nombre.classList.remove('is-valid');
          email.classList.remove('is-valid');
          asunto.classList.remove('is-valid');
          mensaje.classList.remove('is-valid');
          if (contactAlert) {
            contactAlert.classList.add('d-none');
          }
        }, 5000);
      }
    });
  }

});