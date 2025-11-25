describe("Flujo de Agendamiento - Pruebas Robustas", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // --- PRUEBA 1: HEADER Y NAVEGACIÓN BÁSICA ---
  it("El Header carga correctamente y el botón Agendar lleva a Servicios", () => {
    // Verifica que el logo existe
    cy.get(".logo-brand").should("be.visible");

    // Busca el botón "Agendar" y hace clic
    cy.get(".btn-agendar-cita").should("be.visible").click();

    // Verifica que se mantiene en el home (porque hace scroll)
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  // --- PRUEBA 2: PÁGINA DE PSICÓLOGO (Ruta corregida) ---
  it("Carga correctamente la página de Psicólogo", () => {
    // CORRECCIÓN: Usamos la ruta real que definiste en App.jsx
    cy.visit("/cotizar-psicologico");

    cy.wait(500); // Espera técnica para carga de React

    // Verificaciones visuales (Clases CSS que definimos antes)
    cy.get(".title-gradient-psi").should("be.visible");
    cy.get(".content-panel").should("be.visible");

    // Verifica que carguen las tarjetas de la API
    cy.get(".card-custom", { timeout: 10000 }).should(
      "have.length.at.least",
      1
    );

    // Verifica elementos internos
    cy.get(".card-custom")
      .first()
      .within(() => {
        cy.get(".btn-card-psi").should("be.visible");
      });
  });

  // --- PRUEBA 3: PÁGINA DE METODÓLOGO (Ruta corregida) ---
  it("Carga correctamente la página de Metodólogo", () => {
    // CORRECCIÓN: Ruta real
    cy.visit("/cotizar-metodologia");

    cy.wait(500);

    cy.get(".title-gradient-met").should("be.visible");
    cy.get(".card-custom", { timeout: 10000 }).should(
      "have.length.at.least",
      1
    );

    cy.get(".card-custom")
      .first()
      .within(() => {
        // Verifica botón naranja
        cy.get(".btn-card-met").should("be.visible");
      });
  });

  // --- PRUEBA 4: PÁGINA INTEGRAL (Ruta corregida) ---
  it("Carga correctamente el Plan Integral", () => {
    // CORRECCIÓN: Ruta real
    cy.visit("/cotizar-integral");

    cy.wait(500);

    cy.get(".title-rainbow").should("be.visible");

    // Verifica que se vean las dos secciones (Azul y Naranja)
    cy.get(".section-title-psi").should("be.visible");
    cy.get(".section-title-met").should("be.visible");

    // Verifica el footer flotante
    cy.get(".footer-integral").should("be.visible");
  });
});
