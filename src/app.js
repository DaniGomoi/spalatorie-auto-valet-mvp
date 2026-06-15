const OPERATING_CITY = "Timisoara";
const TERMS_VERSION = "handoff-risk-v0.3";
const EVIDENCE_RETENTION_DAYS = 30;
const EVIDENCE_RETENTION_MS = EVIDENCE_RETENTION_DAYS * 24 * 60 * 60 * 1000;
const EVIDENCE_FRAME_LABELS = [
  "fata",
  "spate",
  "lateral stanga",
  "lateral dreapta",
  "colt fata stanga",
  "colt fata dreapta",
  "colt spate stanga",
  "colt spate dreapta",
  "roata fata stanga",
  "roata fata dreapta",
  "roata spate stanga",
  "roata spate dreapta"
];

const ORDER_STATUSES = [
  { id: "created", label: "Comanda plasata", tone: "blue" },
  { id: "confirmed", label: "Confirmata", tone: "blue" },
  { id: "courier_assigned", label: "Operator asignat", tone: "amber" },
  { id: "courier_en_route", label: "Operator spre client", tone: "amber" },
  { id: "vehicle_picked_up", label: "Masina preluata", tone: "amber" },
  { id: "at_wash", label: "Ajunsa la spalatorie", tone: "amber" },
  { id: "washing", label: "Spalare in curs", tone: "amber" },
  { id: "wash_complete", label: "Spalare finalizata", tone: "green" },
  { id: "returning", label: "In retur", tone: "green" },
  { id: "delivered", label: "Livrata", tone: "green" },
  { id: "cancelled", label: "Anulata", tone: "red" },
  { id: "issue_reported", label: "Problema raportata", tone: "red" }
];

const SERVICES = [
  { id: "exterior", name: "Exterior", duration: 45, basePrice: 40 },
  { id: "interior", name: "Interior", duration: 45, basePrice: 40 },
  { id: "complete", name: "Complet", duration: 70, basePrice: 80 },
  { id: "premium", name: "Premium", duration: 150, basePrice: 229 },
  { id: "safe_ride_home", name: "Du masina acasa", duration: 35, basePrice: 79 }
];

const PICKUP_ZONES = {
  cetate: { name: "Cetate / Piata Unirii", address: "Piata Unirii 4, Timisoara", x: 42, y: 42, lat: 45.7588, lng: 21.2294 },
  fabric: { name: "Fabric", address: "Piata Traian 3, Timisoara", x: 68, y: 48, lat: 45.756, lng: 21.244 },
  iosefin: { name: "Iosefin", address: "Piata Iosefin 1, Timisoara", x: 29, y: 65, lat: 45.743, lng: 21.211 },
  girocului: { name: "Girocului", address: "Calea Martirilor 65, Timisoara", x: 57, y: 78, lat: 45.733, lng: 21.234 }
};

const PARTNERS = [
  {
    id: "safe-ride-home",
    name: "Valet acasa Timisoara",
    address: "Preluare de la client si predare la adresa aleasa",
    capacity: 6,
    open: "La cerere, seara si weekend",
    x: 42,
    y: 42,
    lat: 45.7588,
    lng: 21.2294,
    pickupFee: 0,
    rating: 4.9,
    partnerType: "valet",
    sourceUrl: "https://www.valetino.ro/#working",
    addressSourceUrl: "https://www.valetino.ro/#working",
    priceSourceLabel: "Concept inspirat de fluxuri valet existente; pret MVP estimativ pentru Timisoara",
    priceBook: {
      safe_ride_home: { price: 79, duration: 35, label: "Valet: du masina acasa - de la 79 lei", sourceVerified: false }
    }
  },
  {
    id: "karusel-auto-spa",
    name: "Karusel Auto Spa",
    address: "Calea Sagului 203, Timisoara",
    capacity: 12,
    open: "Automat zilnic 07:30-22:30; detailing L-V 08:30-17:30",
    x: 20,
    y: 78,
    lat: 45.7248,
    lng: 21.1879,
    pickupFee: 22,
    rating: 4.8,
    partnerType: "fixed",
    sourceUrl: "https://www.autoyas.com/RO/Timisoara/104931281685850/Karusel-Auto-Spa",
    addressSourceUrl: "https://timisoara.cylex.ro/firma/karusel%2Bauto%2Bspa-1288193.html",
    priceSourceLabel: "Karusel Auto Spa: capturi furnizate - Premium 45 lei, Premium Intensiv 60 lei, Premium Protect 75 lei; reducere 10 lei luni-joi 08-11",
    priceBook: {
      exterior: { price: 45, duration: 15, label: "Premium caroserii inchise - 45 lei", sourceVerified: true },
      complete: { price: 60, duration: 20, label: "Premium Intensiv caroserii inchise - 60 lei", sourceVerified: true },
      premium: { price: 75, duration: 25, label: "Premium Protect caroserii inchise - 75 lei", sourceVerified: true }
    }
  },
  {
    id: "picobello",
    name: "PicoBello",
    address: "Calea Sever Bocu 84, Timisoara",
    capacity: 6,
    open: "09:00-18:00",
    x: 62,
    y: 28,
    lat: 45.7793,
    lng: 21.2368,
    pickupFee: 22,
    rating: 4.3,
    partnerType: "fixed",
    sourceUrl: "https://spalatoriapicobello.ro/spalare-profesionala-de-covoare/",
    addressSourceUrl: "https://timisoara.cylex.ro/firma/picobello-1235622.html",
    priceSourceLabel: "PicoBello: interior de la 40 lei, exterior de la 40 lei, tapiterie de la 400 lei",
    priceBook: {
      exterior: { price: 40, duration: 45, label: "Spalare exterior de la 40 lei", sourceVerified: true },
      interior: { price: 40, duration: 45, label: "Curatare interior de la 40 lei", sourceVerified: true },
      complete: { price: 80, duration: 90, label: "Exterior + interior estimat din preturile publice", sourceVerified: true },
      premium: { price: 400, duration: 240, label: "Curatare tapiterie de la 400 lei", sourceVerified: true }
    }
  },
  {
    id: "strada-garii",
    name: "Spalatorie Auto Strada Garii",
    address: "Strada Garii nr. 2, Timisoara",
    capacity: 5,
    open: "Non stop",
    x: 27,
    y: 66,
    lat: 45.7507766,
    lng: 21.2077144,
    pickupFee: 18,
    rating: 4.1,
    partnerType: "fixed",
    sourceUrl: "https://www.timisoreni.ro/despre/spalatorie-auto-strada-garii/",
    addressSourceUrl: "https://www.timisoreni.ro/despre/spalatorie-auto-strada-garii/",
    priceSourceLabel: "Timisoreni.ro: preturi de la 25 lei int+ext+portbagaj",
    priceBook: {
      complete: { price: 25, duration: 45, label: "Interior + exterior + portbagaj de la 25 lei", sourceVerified: true }
    }
  },
  {
    id: "mol-liviu-rebreanu",
    name: "MOL Timisoara 1 Liviu Rebreanu",
    address: "Bdul Iosif Bulbuca nr. 9, Timisoara",
    capacity: 8,
    open: "Non stop",
    x: 61,
    y: 63,
    lat: 45.7358,
    lng: 21.2416,
    pickupFee: 20,
    rating: 4.0,
    partnerType: "automatic",
    sourceUrl: "https://molromania.ro/images/mol_ro/content/lista-statiilor-mol-romania-cu-spalatorie-automata-si-programul-acestora.pdf",
    addressSourceUrl: "https://molromania.ro/images/mol_ro/content/lista-statiilor-mol-romania-cu-spalatorie-automata-si-programul-acestora.pdf",
    priceSourceLabel: "MOL publica adresa si programul spalatoriei automate; pretul nu a fost gasit public in documentul consultat",
    priceBook: {}
  },
  {
    id: "glossia-mobile",
    name: "GlossiaGo mobil",
    address: "Serviciu mobil in Timisoara si imprejurimi",
    capacity: 4,
    open: "La programare",
    x: 42,
    y: 42,
    lat: 45.7588,
    lng: 21.2294,
    pickupFee: 0,
    rating: 4.7,
    partnerType: "mobile",
    sourceUrl: "https://glossiago.ro/",
    addressSourceUrl: "https://glossiago.ro/",
    priceSourceLabel: "GlossiaGo: Core Wash de la 129 RON, Signature Care de la 229 RON, Complete Detail de la 429 RON",
    priceBook: {
      complete: { price: 129, duration: 70, label: "Core Wash de la 129 RON", sourceVerified: true },
      premium: { price: 229, duration: 130, label: "Signature Care de la 229 RON", sourceVerified: true }
    }
  },
  {
    id: "steam-touch-mobile",
    name: "Steam Touch mobil",
    address: "Serviciu mobil in Timisoara si localitati apropiate",
    capacity: 3,
    open: "Luni-Sambata 09:00-18:00",
    x: 48,
    y: 54,
    lat: 45.7489,
    lng: 21.2087,
    pickupFee: 0,
    rating: 4.6,
    partnerType: "mobile",
    sourceUrl: "https://spalatorie-auto-mobila.ro/",
    addressSourceUrl: "https://spalatorie-auto-mobila.ro/",
    priceSourceLabel: "Steam Touch: pachete afisate de la 460 RON coupe / 480 RON sedan si servicii suplimentare",
    priceBook: {
      premium: { price: 480, duration: 180, label: "Pachet sedan de la 480 RON", sourceVerified: true }
    }
  }
];

const COURIERS = [
  { id: "courier-1", name: "Mihai Ionescu", scooter: "Ninebot E45" },
  { id: "courier-2", name: "Radu Stan", scooter: "Xiaomi Pro 2" },
  { id: "courier-3", name: "Elena Dima", scooter: "Segway P65" }
];

const PAYMENT_PROVIDERS = {
  "netopia-bt-pay": {
    name: "NETOPIA / Pay with BT Pay",
    recommendation: "Recomandat MVP Romania",
    apiBase: "https://doc.netopia-payments.com/",
    checkoutType: "redirect"
  }
};

const INCIDENT_STEPS = [
  {
    severity: "P0",
    title: "Siguranta imediata",
    detail: "Vatamare, pericol, furt vehicul sau conflict: operatorul opreste, suna 112 daca e nevoie si contacteaza dispecerul.",
    owner: "Operator + Dispecer"
  },
  {
    severity: "P1",
    title: "Dauna, chei/documente, GDPR",
    detail: "Blocheaza finalizarea, pastreaza video/poze/loguri, informeaza clientul factual si cere review legal.",
    owner: "Dispecer + Legal"
  },
  {
    severity: "P2",
    title: "Blocaj operational",
    detail: "Intarziere, masina nu porneste, spalatorie indisponibila: marcheaza Problema si decide reprogramare/retur.",
    owner: "Dispecer"
  },
  {
    severity: "P3",
    title: "Clarificare minora",
    detail: "Eroare status sau intrebare client: se noteaza in log si se rezolva fara oprirea cursei daca nu exista risc.",
    owner: "Admin suport"
  }
];

const STORAGE_KEY = "spalatorie-auto-valet-state-v3";

const state = loadState();

let realMap = null;
let realMapLayer = null;
let mapRenderFrame = null;
const evidenceVideoUrls = new Map();
const evidenceFrameUrls = new Map();

const elements = {
  navButtons: document.querySelectorAll(".nav-button"),
  views: document.querySelectorAll(".view"),
  viewTitle: document.querySelector("#viewTitle"),
  serviceSelect: document.querySelector("#serviceSelect"),
  paymentProvider: document.querySelector("#paymentProvider"),
  pickupZone: document.querySelector("#pickupZone"),
  pickupAddress: document.querySelector("#pickupAddress"),
  plateInput: document.querySelector("#plateInput"),
  ownerName: document.querySelector("#ownerName"),
  orderForm: document.querySelector("#orderForm"),
  emailLoginForm: document.querySelector("#emailLoginForm"),
  accountSummary: document.querySelector("#accountSummary"),
  savedVehicles: document.querySelector("#savedVehicles"),
  submitOrderButton: document.querySelector("#submitOrderButton"),
  insuranceDoc: document.querySelector("#insuranceDoc"),
  registrationFrontDoc: document.querySelector("#registrationFrontDoc"),
  registrationBackDoc: document.querySelector("#registrationBackDoc"),
  licenseFrontDoc: document.querySelector("#licenseFrontDoc"),
  licenseBackDoc: document.querySelector("#licenseBackDoc"),
  authorizationDoc: document.querySelector("#authorizationDoc"),
  insuranceDocStatus: document.querySelector("#insuranceDocStatus"),
  registrationFrontDocStatus: document.querySelector("#registrationFrontDocStatus"),
  registrationBackDocStatus: document.querySelector("#registrationBackDocStatus"),
  licenseFrontDocStatus: document.querySelector("#licenseFrontDocStatus"),
  licenseBackDocStatus: document.querySelector("#licenseBackDocStatus"),
  authorizationDocStatus: document.querySelector("#authorizationDocStatus"),
  authorizationUploadCard: document.querySelector("#authorizationUploadCard"),
  documentExtract: document.querySelector("#documentExtract"),
  documentGateBadge: document.querySelector("#documentGateBadge"),
  riskGateBadge: document.querySelector("#riskGateBadge"),
  dispatchMap: document.querySelector("#dispatchMap"),
  mapSearchInput: document.querySelector("#mapSearchInput"),
  useLocationButton: document.querySelector("#useLocationButton"),
  mapStats: document.querySelector("#mapStats"),
  partnerCompare: document.querySelector("#partnerCompare"),
  selectedPartnerBadge: document.querySelector("#selectedPartnerBadge"),
  clientOrders: document.querySelector("#clientOrders"),
  courierJobs: document.querySelector("#courierJobs"),
  adminOrders: document.querySelector("#adminOrders"),
  partnerOrders: document.querySelector("#partnerOrders"),
  partnerList: document.querySelector("#partnerList"),
  incidentProcedure: document.querySelector("#incidentProcedure"),
  mediaModal: document.querySelector("#mediaModal"),
  mediaModalTitle: document.querySelector("#mediaModalTitle"),
  mediaModalBody: document.querySelector("#mediaModalBody"),
  todayOrders: document.querySelector("#todayOrders"),
  activeOrdersMetric: document.querySelector("#activeOrdersMetric"),
  revenueMetric: document.querySelector("#revenueMetric"),
  seedButton: document.querySelector("#seedButton"),
  emptyStateTemplate: document.querySelector("#emptyStateTemplate")
};

const titles = {
  client: "Comanda spalare cu preluare",
  courier: "Aplicatie mobila operator",
  admin: "Dashboard operational",
  partner: "Portal spalatorie partenera"
};

initialize();

function initialize() {
  purgeExpiredEvidence();
  renderServiceOptions();
  bindEvents();
  render();
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    return normalizeState(JSON.parse(savedState));
  }

  return normalizeState({
    orders: [createSeedOrder()],
    activeView: "client",
    selectedPartnerId: "strada-garii",
    adminOrderFilter: "all",
    adminLogFilter: "all",
    accounts: [createDemoAccount()],
    currentAccountId: "account-demo"
  });
}

function normalizeState(rawState) {
  const nextState = rawState || {};
  nextState.orders = Array.isArray(nextState.orders) ? nextState.orders : [];
  nextState.activeView = nextState.activeView || "client";
  nextState.selectedPartnerId = nextState.selectedPartnerId || "strada-garii";
  nextState.adminOrderFilter = nextState.adminOrderFilter || "all";
  nextState.adminLogFilter = nextState.adminLogFilter || "all";
  nextState.accounts = Array.isArray(nextState.accounts) ? nextState.accounts : [createDemoAccount()];
  nextState.currentAccountId = nextState.currentAccountId || nextState.accounts[0]?.id || "account-demo";
  nextState.orders.forEach((order) => {
    order.events = Array.isArray(order.events) ? order.events : [];
    order.supportSession = order.supportSession || createEmptySupportSession();
  });
  return nextState;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createDemoAccount() {
  return {
    id: "account-demo",
    provider: "gmail",
    name: "Andrei Popescu",
    email: "andrei@example.com",
    vehicles: [],
    createdAt: new Date().toISOString()
  };
}

function getCurrentAccount() {
  return state.accounts.find((account) => account.id === state.currentAccountId) || state.accounts[0];
}

function authenticateClient(provider, email = "andrei@example.com") {
  const normalizedEmail = String(email || `${provider}@example.com`).trim().toLowerCase();
  let account = state.accounts.find((item) => item.email === normalizedEmail && item.provider === provider);
  if (!account) {
    account = {
      id: `account-${Date.now().toString().slice(-6)}`,
      provider,
      name: provider === "icloud" ? "Client iCloud" : "Andrei Popescu",
      email: normalizedEmail,
      vehicles: [],
      createdAt: new Date().toISOString()
    };
    state.accounts.unshift(account);
  }
  state.currentAccountId = account.id;
  saveState();
  render();
}

function getAuthProviderLabel(provider) {
  const labels = {
    gmail: "Gmail demo",
    icloud: "iCloud demo",
    email_password: "Email/parola demo"
  };
  return labels[provider] || "Cont demo";
}

function saveVehicleToCurrentAccount(order) {
  const account = getCurrentAccount();
  if (!account) return;

  const normalizedPlate = normalizePlate(order.plate);
  const existingVehicle = account.vehicles.find((vehicle) => normalizePlate(vehicle.plate) === normalizedPlate);
  const savedVehicle = {
    id: existingVehicle?.id || `vehicle-${Date.now().toString().slice(-6)}`,
    vehicle: order.vehicle,
    plate: order.plate,
    ownerName: order.ownerName,
    documentsSummary: getDocumentsSummary(order.documents),
    documentMetadata: createSavedDocumentMetadata(order.documents),
    updatedAt: new Date().toISOString()
  };

  if (existingVehicle) {
    Object.assign(existingVehicle, savedVehicle);
  } else {
    account.vehicles.unshift(savedVehicle);
  }
}

function applySavedVehicle(vehicleId) {
  const account = getCurrentAccount();
  const vehicle = account?.vehicles.find((item) => item.id === vehicleId);
  if (!vehicle) return;

  elements.orderForm.elements.vehicle.value = vehicle.vehicle;
  elements.plateInput.value = vehicle.plate;
  elements.ownerName.value = vehicle.ownerName;
  elements.documentExtract.innerHTML = `
    <strong>Masina incarcata din cont</strong>
    <span>${vehicle.vehicle} | ${vehicle.plate}</span>
    <span>${vehicle.documentsSummary}</span>
    <span class="muted">Pentru MVP, fisierele brute trebuie reincarcate daca browserul nu le mai are. In productie, documentele vor fi in storage securizat.</span>
  `;
  syncFormGuidance();
}

function getDocumentsSummary(documents) {
  if (!documents?.validationReady) return "Documente in review";
  return "Talon fata/verso, permis fata/verso si RCA validate demo";
}

function createSavedDocumentMetadata(documents) {
  return {
    recognitionStatus: documents?.recognitionStatus || "manual_review",
    plateMatches: Boolean(documents?.plateMatches),
    ownerName: documents?.ownerName || "",
    ownerNameMatches: Boolean(documents?.ownerNameMatches),
    insuranceExpiresAt: documents?.insurance?.expiresAt || "",
    files: [
      documents?.registration?.front?.fileName,
      documents?.registration?.back?.fileName,
      documents?.license?.front?.fileName,
      documents?.license?.back?.fileName,
      documents?.insurance?.fileName,
      documents?.authorization?.fileName
    ].filter(Boolean)
  };
}

function bindEvents() {
  window.addEventListener("resize", handleViewportResize);
  document.querySelectorAll("input[name='serviceMode']").forEach((input) => {
    input.addEventListener("change", () => {
      applyServiceMode(input.value);
      syncFormGuidance();
      scheduleMapRender();
    });
  });

  document.querySelectorAll("[data-auth-provider]").forEach((button) => {
    button.addEventListener("click", () => authenticateClient(button.dataset.authProvider));
  });

  elements.emailLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    authenticateClient("email_password", form.get("loginEmail"));
  });

  elements.mediaModal.querySelectorAll("[data-media-close]").forEach((button) => {
    button.addEventListener("click", closeMediaModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.mediaModal.hidden) {
      closeMediaModal();
    }
  });

  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      saveState();
      render();
    });
  });

  elements.orderForm.addEventListener("input", () => {
    syncFormGuidance();
  });
  elements.orderForm.addEventListener("change", () => {
    if (elements.serviceSelect.value === "safe_ride_home" && getSelectedServiceMode() !== "safe_ride_home") {
      document.querySelector("input[name='serviceMode'][value='safe_ride_home']").checked = true;
      applyServiceMode("safe_ride_home");
    }
    syncFormGuidance();
    scheduleMapRender();
  });

  elements.pickupZone.addEventListener("change", () => {
    elements.pickupAddress.value = PICKUP_ZONES[elements.pickupZone.value].address;
    state.selectedPartnerId = selectPartner().id;
    saveState();
    scheduleMapRender();
  });

  elements.mapSearchInput.addEventListener("input", () => {
    const matchedZone = findZoneByQuery(elements.mapSearchInput.value);
    if (!matchedZone) return;

    elements.pickupZone.value = matchedZone;
    elements.pickupAddress.value = PICKUP_ZONES[matchedZone].address;
    state.selectedPartnerId = selectPartner().id;
    saveState();
    syncFormGuidance();
    scheduleMapRender();
  });

  elements.useLocationButton.addEventListener("click", () => {
    elements.pickupZone.value = "cetate";
    elements.pickupAddress.value = PICKUP_ZONES.cetate.address;
    elements.mapSearchInput.value = "Cetate / Piata Unirii";
    state.selectedPartnerId = selectPartner().id;
    saveState();
    syncFormGuidance();
    scheduleMapRender();
  });

  elements.orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    syncFormGuidance();
    if (!canSubmitOrder()) return;

    const form = new FormData(event.currentTarget);
    const service = SERVICES.find((item) => item.id === form.get("serviceId"));
    const partner = PARTNERS.find((item) => item.id === state.selectedPartnerId) || selectPartner();
    const estimate = getPartnerEstimate(partner, service, form.get("pickupZone"));
    const documents = buildDocumentState(form);
    const legal = buildLegalState();

    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      city: OPERATING_CITY,
      clientName: form.get("clientName"),
      accountId: state.currentAccountId,
      ownerName: form.get("ownerName"),
      phone: form.get("phone"),
      vehicle: form.get("vehicle"),
      plate: form.get("plate"),
      pickupZone: form.get("pickupZone"),
      pickupAddress: form.get("pickupAddress"),
      slot: form.get("slot"),
      serviceMode: getSelectedServiceMode(),
      dropoffAddress: form.get("safeDropoffAddress") || form.get("pickupAddress"),
      notes: form.get("notes"),
      service: { id: service.id, name: service.name, duration: service.duration, price: estimate.washPrice },
      partner,
      courier: null,
      status: "created",
      payment: createPaymentState(form.get("paymentProvider"), estimate.totalPrice),
      estimate,
      documents,
      legal,
      inspections: [],
      evidence: createEmptyEvidenceState(),
      supportSession: createEmptySupportSession(),
      events: [
        createEvent("created", "Comanda a fost plasata cu documente validate demo si acord de risc.")
      ],
      createdAt: new Date().toISOString()
    };

    state.orders.unshift(order);
    saveVehicleToCurrentAccount(order);
    saveState();
    render();
    event.currentTarget.reset();
    elements.serviceSelect.value = SERVICES[2].id;
    elements.pickupZone.value = "cetate";
    elements.pickupAddress.value = PICKUP_ZONES.cetate.address;
    elements.plateInput.value = "TM 12 WSH";
    elements.ownerName.value = "Andrei Popescu";
    state.selectedPartnerId = selectPartner().id;
    syncFormGuidance();
  });

  elements.seedButton.addEventListener("click", () => {
    state.orders.unshift(createSeedOrder(`ORD-${Date.now().toString().slice(-6)}`));
    saveState();
    render();
  });
}

function handleViewportResize() {
  window.clearTimeout(handleViewportResize.timer);
  handleViewportResize.timer = window.setTimeout(() => {
    refreshRealMapSize();
  }, 120);
}

function scheduleMapRender() {
  if (mapRenderFrame) {
    window.cancelAnimationFrame(mapRenderFrame);
  }
  mapRenderFrame = window.requestAnimationFrame(() => {
    mapRenderFrame = null;
    renderMap();
  });
}

function getSelectedServiceMode() {
  return document.querySelector("input[name='serviceMode']:checked")?.value || "wash";
}

function applyServiceMode(mode) {
  const isSafeRide = mode === "safe_ride_home";
  elements.serviceSelect.value = isSafeRide ? "safe_ride_home" : "complete";
  if (isSafeRide) {
    elements.pickupAddress.value = elements.pickupAddress.value || "Piata Unirii 4, Timisoara";
    state.selectedPartnerId = "safe-ride-home";
  } else if (state.selectedPartnerId === "safe-ride-home") {
    state.selectedPartnerId = selectPartner().id;
  }
  saveState();
}

function findZoneByQuery(value) {
  const query = normalizeText(value);
  if (query.length < 3) return null;

  return Object.entries(PICKUP_ZONES).find(([, zone]) => {
    return normalizeText(`${zone.name} ${zone.address}`).includes(query);
  })?.[0] || null;
}

function renderServiceOptions() {
  elements.serviceSelect.innerHTML = SERVICES.map((service) => {
    return `<option value="${service.id}">${service.name} | ${service.duration} min | de la ${service.basePrice} lei</option>`;
  }).join("");
  elements.serviceSelect.value = "complete";
  applyServiceMode(getSelectedServiceMode());
}

function render() {
  renderActiveView();
  renderAccountPanel();
  syncFormGuidance();
  renderMap();
  renderClientOrders();
  renderCourierJobs();
  renderAdminOrders();
  renderIncidentProcedure();
  renderPartnerOrders();
  renderPartners();
  renderMetrics();
}

function renderActiveView() {
  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  elements.views.forEach((view) => {
    view.classList.toggle("active-view", view.id === `${state.activeView}View`);
  });
  elements.viewTitle.textContent = titles[state.activeView];
}

function renderAccountPanel() {
  const account = getCurrentAccount();
  if (!account) return;

  elements.accountSummary.innerHTML = `
    <div class="account-pill">
      <strong>${account.name}</strong>
      <span>${account.email} | ${getAuthProviderLabel(account.provider)}</span>
    </div>
  `;

  if (!account.vehicles.length) {
    elements.savedVehicles.innerHTML = `
      <div class="saved-vehicles-empty">
        <strong>Nu ai masini salvate in cont.</strong>
        <span>Prima comanda valida va salva masina si metadata documentelor.</span>
      </div>
    `;
    return;
  }

  elements.savedVehicles.innerHTML = `
    <div class="saved-vehicle-list">
      <strong>Masini salvate in cont</strong>
      ${account.vehicles.map((vehicle) => `
        <button class="saved-vehicle-card" type="button" data-saved-vehicle="${vehicle.id}">
          <span>${vehicle.vehicle}</span>
          <strong>${vehicle.plate}</strong>
          <small>${vehicle.documentsSummary}</small>
        </button>
      `).join("")}
    </div>
  `;
  elements.savedVehicles.querySelectorAll("[data-saved-vehicle]").forEach((button) => {
    button.addEventListener("click", () => applySavedVehicle(button.dataset.savedVehicle));
  });
}

function syncFormGuidance() {
  const documentState = buildDocumentState(new FormData(elements.orderForm));
  const legalState = buildLegalState();
  const allDocsReady = documentState.validationReady;
  const isSafeRide = getSelectedServiceMode() === "safe_ride_home";

  document.querySelectorAll(".service-mode-card").forEach((card) => {
    const input = card.querySelector("input");
    card.classList.toggle("selected", input?.checked);
  });
  document.querySelector("#safeRideNotice")?.classList.toggle("active", isSafeRide);
  elements.registrationFrontDocStatus.textContent = getDocStatusText(documentState.registration.front);
  elements.registrationBackDocStatus.textContent = getDocStatusText(documentState.registration.back);
  elements.licenseFrontDocStatus.textContent = getDocStatusText(documentState.license.front);
  elements.licenseBackDocStatus.textContent = getDocStatusText(documentState.license.back);
  elements.insuranceDocStatus.textContent = getDocStatusText(documentState.insurance);
  elements.authorizationDocStatus.textContent = documentState.authorization.required
    ? getDocStatusText(documentState.authorization)
    : "Nu este necesara";
  elements.authorizationUploadCard.classList.toggle("required-upload", documentState.authorization.required);
  elements.documentGateBadge.textContent = allDocsReady ? "Validat" : "Incomplet";
  elements.documentGateBadge.dataset.tone = allDocsReady ? "green" : "red";
  elements.riskGateBadge.textContent = legalState.ready ? "Semnat" : "Nesemnat";
  elements.riskGateBadge.dataset.tone = legalState.ready ? "green" : "red";
  elements.submitOrderButton.disabled = !canSubmitOrder();

  elements.documentExtract.innerHTML = `
    <strong>Rezultat recunoastere demo</strong>
    <span>Talon: ${documentState.registration.front.fileName || "fata lipsa"} / ${documentState.registration.back.fileName || "verso lipsa"} | numar ${documentState.registration.extractedPlate || "-"}</span>
    <span>Nume proprietar in talon: ${documentState.registration.extractedOwnerName || "-"} | ${documentState.ownerNameMatches ? "corespunde formularului" : "nepotrivire sau talon lipsa"}</span>
    <span>Permis: ${documentState.license.front.fileName || "fata lipsa"} / ${documentState.license.back.fileName || "verso lipsa"} | sofer ${documentState.license.holderName || "-"}</span>
    <span>RCA: ${documentState.insurance.fileName || "neincarcat"} | expirare estimata ${documentState.insurance.expiresAt || "-"}</span>
    <span>Corelare vehicul: ${documentState.vehicleMatches ? "talon + RCA + formular OK" : "nepotrivire sau documente lipsa"}</span>
    <span>Corelare persoana: ${documentState.requesterMatchesLicense ? "solicitantul corespunde permisului" : "solicitantul nu corespunde permisului"}</span>
    <span>Proprietar declarat: ${documentState.ownerName || "-"} | imputernicire ${documentState.authorization.required ? (documentState.authorization.uploaded ? "incarcata" : "necesara") : "nu este necesara"}</span>
    <span>Calitate imagini: ${documentState.imageQualityOk ? "fara folie/adaosuri detectate in demo" : "respins demo: folie, reflexie, husa sau adaos in numele fisierului"}</span>
  `;
}

function canSubmitOrder() {
  const documentState = buildDocumentState(new FormData(elements.orderForm));
  const legalState = buildLegalState();
  return documentState.validationReady && legalState.ready;
}

function buildDocumentState(form) {
  const insuranceFile = form.get("insuranceDoc");
  const registrationFrontFile = form.get("registrationFrontDoc");
  const registrationBackFile = form.get("registrationBackDoc");
  const licenseFrontFile = form.get("licenseFrontDoc");
  const licenseBackFile = form.get("licenseBackDoc");
  const authorizationFile = form.get("authorizationDoc");
  const plate = form.get("plate");
  const clientName = cleanName(form.get("clientName"));
  const ownerName = cleanName(form.get("ownerName"));
  const hasInsurance = Boolean(insuranceFile && insuranceFile.name);
  const hasRegistrationFront = Boolean(registrationFrontFile && registrationFrontFile.name);
  const hasRegistrationBack = Boolean(registrationBackFile && registrationBackFile.name);
  const hasLicenseFront = Boolean(licenseFrontFile && licenseFrontFile.name);
  const hasLicenseBack = Boolean(licenseBackFile && licenseBackFile.name);
  const hasAuthorization = Boolean(authorizationFile && authorizationFile.name);
  const normalizedPlate = normalizePlate(plate);
  const ownerNameMismatchPattern = /(owner|proprietar|nume)[-_ ]?mismatch|mismatch[-_ ]?(owner|proprietar|nume)/i;
  const mismatchRequested = [insuranceFile, registrationFrontFile, registrationBackFile]
    .some((file) => file?.name && file.name.toLowerCase().includes("mismatch") && !ownerNameMismatchPattern.test(file.name));
  const ownerNameMismatchRequested = [registrationFrontFile, registrationBackFile]
    .some((file) => file?.name && ownerNameMismatchPattern.test(file.name));
  const licenseMismatchRequested = [licenseFrontFile, licenseBackFile]
    .some((file) => file?.name && file.name.toLowerCase().includes("mismatch"));
  const expiredInsurance = insuranceFile?.name?.toLowerCase().includes("expired");
  const imageQualityOk = [insuranceFile, registrationFrontFile, registrationBackFile, licenseFrontFile, licenseBackFile, authorizationFile]
    .filter((file) => file && file.name)
    .every((file) => hasCleanDocumentImage(file.name));
  const registrationPlate = hasRegistrationFront && hasRegistrationBack && !mismatchRequested ? normalizedPlate : "TM00BAD";
  const insurancePlate = hasInsurance && !mismatchRequested ? normalizedPlate : "TM00BAD";
  const registrationOwnerName = hasRegistrationFront && hasRegistrationBack
    ? (ownerNameMismatchRequested ? "ALT PROPRIETAR" : ownerName)
    : "";
  const licenseHolderName = hasLicenseFront && hasLicenseBack && !licenseMismatchRequested ? clientName : "Alta Persoana";
  const ownerNameMatches = Boolean(hasRegistrationFront && hasRegistrationBack && ownerName && registrationOwnerName === ownerName);
  const ownerDiffers = registrationOwnerName && clientName && registrationOwnerName !== clientName;
  const vehicleMatches = Boolean(
    hasInsurance &&
    hasRegistrationFront &&
    hasRegistrationBack &&
    normalizedPlate &&
    registrationPlate === normalizedPlate &&
    insurancePlate === normalizedPlate
  );
  const requesterMatchesLicense = Boolean(hasLicenseFront && hasLicenseBack && cleanName(licenseHolderName) === clientName);
  const authorizationRequired = Boolean(ownerDiffers);
  const authorizationOk = !authorizationRequired || hasAuthorization;
  const insuranceValid = hasInsurance && !expiredInsurance;
  const uploaded = hasInsurance && hasRegistrationFront && hasRegistrationBack && hasLicenseFront && hasLicenseBack;
  const validationReady = uploaded && vehicleMatches && ownerNameMatches && requesterMatchesLicense && authorizationOk && insuranceValid && imageQualityOk;

  return {
    uploaded,
    validationReady,
    recognitionStatus: validationReady ? "verified" : "manual_review",
    plateMatches: vehicleMatches,
    vehicleMatches,
    requesterMatchesLicense,
    ownerName,
    ownerNameMatches,
    ownerDiffers,
    imageQualityOk,
    insuranceValid,
    insurance: {
      type: "RCA",
      fileName: hasInsurance ? insuranceFile.name : "",
      uploaded: hasInsurance,
      cleanImage: hasInsurance ? hasCleanDocumentImage(insuranceFile.name) : false,
      expiresAt: hasInsurance ? (expiredInsurance ? "2024-01-01" : "2027-05-24") : "",
      extractedPlate: hasInsurance ? insurancePlate : "",
      valid: insuranceValid
    },
    registration: {
      type: "Certificat inmatriculare",
      front: createDocumentSide("Talon fata", registrationFrontFile),
      back: createDocumentSide("Talon verso", registrationBackFile),
      extractedPlate: hasRegistrationFront && hasRegistrationBack ? registrationPlate : "",
      extractedOwnerName: registrationOwnerName,
      ownerName: registrationOwnerName,
      vinLast6: hasRegistrationFront && hasRegistrationBack ? "TM2026" : ""
    },
    license: {
      type: "Permis conducere",
      front: createDocumentSide("Permis fata", licenseFrontFile),
      back: createDocumentSide("Permis verso", licenseBackFile),
      holderName: hasLicenseFront && hasLicenseBack ? licenseHolderName : "",
      categories: hasLicenseFront && hasLicenseBack ? ["B"] : []
    },
    authorization: {
      type: "Imputernicire proprietar",
      required: authorizationRequired,
      uploaded: hasAuthorization,
      fileName: hasAuthorization ? authorizationFile.name : "",
      cleanImage: hasAuthorization ? hasCleanDocumentImage(authorizationFile.name) : true,
      valid: authorizationOk
    }
  };
}

function getDocStatusText(documentInfo) {
  if (!documentInfo?.fileName) return "Neincarcat";
  if (documentInfo.cleanImage === false) return "Respins: poza neclara";
  if (documentInfo.valid === false) return "Respins demo";
  return "Recunoscut demo";
}

function createDocumentSide(type, file) {
  const uploaded = Boolean(file && file.name);
  return {
    type,
    uploaded,
    fileName: uploaded ? file.name : "",
    cleanImage: uploaded ? hasCleanDocumentImage(file.name) : false
  };
}

function hasCleanDocumentImage(fileName) {
  return !/(folie|reflex|reflect|husa|cover|adaos|plastic|blur|neclar)/i.test(fileName);
}

function cleanName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toUpperCase();
}

function buildLegalState() {
  const checked = [...elements.orderForm.querySelectorAll("input[type='checkbox'][name^='risk']")]
    .every((input) => input.checked);
  const isSafeRide = getSelectedServiceMode() === "safe_ride_home";
  const safeRideAccepted = !isSafeRide || [...elements.orderForm.querySelectorAll("input[type='checkbox'][name^='safe']")]
    .every((input) => input.checked);
  return {
    termsVersion: TERMS_VERSION,
    riskAccepted: checked,
    safeRideAccepted,
    ready: checked && safeRideAccepted,
    acceptedAt: checked && safeRideAccepted ? new Date().toISOString() : null,
    clauses: [
      "mandat_limitat_preluare_conducere_returnare",
      "rca_itp_talon_permis_confirmate",
      "imputernicire_proprietar_daca_solicitant_diferit",
      "inspectie_foto_pickup_retur",
      "gdpr_documente_fotografii_audit",
      ...(isSafeRide ? ["safe_ride_home_fara_pasageri", "clientul_confirma_ca_nu_conduce"] : [])
    ]
  };
}

function renderMap() {
  const zoneId = elements.pickupZone.value || "cetate";
  const zone = PICKUP_ZONES[zoneId];
  const service = SERVICES.find((item) => item.id === elements.serviceSelect.value) || SERVICES[2];
  const rankedPartners = getRankedPartners(service, zoneId);
  const fallbackPartner = rankedPartners[0]?.partner || PARTNERS[0];
  const selectedPartner = rankedPartners.some(({ partner }) => partner.id === state.selectedPartnerId)
    ? PARTNERS.find((partner) => partner.id === state.selectedPartnerId)
    : fallbackPartner;

  if (!state.selectedPartnerId || selectedPartner.id !== state.selectedPartnerId) {
    state.selectedPartnerId = rankedPartners[0].partner.id;
  }

  if (window.L) {
    renderRealMap(zone, service, selectedPartner);
  } else {
    renderStaticMap(zone, service, selectedPartner);
  }

  const selectedEstimate = getPartnerEstimate(selectedPartner, service, zoneId);
  elements.selectedPartnerBadge.textContent = `${selectedPartner.name} recomandat`;
  elements.mapStats.innerHTML = `
    <div><strong>${selectedEstimate.courierEtaMin} min</strong><span>operator la client</span></div>
    <div><strong>${selectedEstimate.totalEtaMin} min</strong><span>masina inapoi</span></div>
    <div><strong>${formatPrice(selectedEstimate.totalPrice)}</strong><span>total estimat</span></div>
  `;
  elements.partnerCompare.innerHTML = rankedPartners.map(({ partner, estimate }) => {
    const selectedClass = partner.id === selectedPartner.id ? "selected" : "";
    return `
      <button class="partner-option ${selectedClass}" data-partner-id="${partner.id}" type="button">
        <strong>${partner.name}</strong>
        <span>${partner.address}</span>
        <span>${formatPrice(estimate.totalPrice)} | retur in ${estimate.totalEtaMin} min | rating ${partner.rating}</span>
        <span>${estimate.priceLabel}</span>
        <span>Sursa: ${partner.priceSourceLabel}</span>
      </button>
    `;
  }).join("");

  elements.partnerCompare.querySelectorAll("[data-partner-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPartnerId = button.dataset.partnerId;
      saveState();
      renderMap();
    });
  });
}

function renderStaticMap(zone, service, selectedPartner) {
  elements.dispatchMap.classList.remove("real-map");
  elements.dispatchMap.innerHTML = `
    <div class="map-grid"></div>
    <div class="map-route" style="${getRouteStyle(zone, selectedPartner)}"></div>
    <button class="map-marker pickup-marker" style="left:${zone.x}%; top:${zone.y}%;" type="button" aria-label="Locatie client">Client</button>
    ${PARTNERS.map((partner) => {
      const isSelected = partner.id === selectedPartner.id;
      const disabled = canPartnerServe(partner, service.id) ? "" : "disabled";
      return `<button class="map-marker partner-marker ${isSelected ? "selected" : ""}" data-partner-id="${partner.id}" style="left:${partner.x}%; top:${partner.y}%;" type="button" ${disabled}>${partner.name}</button>`;
    }).join("")}
  `;

  elements.dispatchMap.querySelectorAll("[data-partner-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPartnerId = button.dataset.partnerId;
      saveState();
      renderMap();
    });
  });
}

function renderRealMap(zone, service, selectedPartner) {
  elements.dispatchMap.classList.add("real-map");

  if (!realMap) {
    elements.dispatchMap.innerHTML = "";
    realMap = L.map(elements.dispatchMap, {
      fadeAnimation: false,
      inertia: false,
      markerZoomAnimation: false,
      preferCanvas: true,
      zoomControl: true,
      zoomAnimation: false,
      scrollWheelZoom: false
    }).setView([45.756, 21.229], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      keepBuffer: 0,
      maxZoom: 19,
      minZoom: 11,
      updateWhenIdle: true,
      updateWhenZooming: false,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(realMap);
    realMapLayer = L.layerGroup().addTo(realMap);
  } else {
    realMapLayer.clearLayers();
    realMap.invalidateSize({ animate: false, pan: false });
  }

  const pickupIcon = L.divIcon({
    className: "leaflet-div-icon app-map-icon pickup-map-icon",
    html: "Client",
    iconSize: [72, 30],
    iconAnchor: [36, 15]
  });
  L.marker([zone.lat, zone.lng], { icon: pickupIcon })
    .bindPopup(`<strong>Preluare client</strong><br>${zone.address}`)
    .addTo(realMapLayer);

  PARTNERS.forEach((partner) => {
    const canServe = canPartnerServe(partner, service.id);
    const isSelected = partner.id === selectedPartner.id;
    const icon = L.divIcon({
      className: `leaflet-div-icon app-map-icon partner-map-icon ${isSelected ? "selected" : ""} ${canServe ? "" : "unavailable"}`,
      html: partner.partnerType === "mobile" ? "Mobil" : (partner.partnerType === "valet" ? "Valet" : "Wash"),
      iconSize: [72, 30],
      iconAnchor: [36, 15]
    });
    const estimate = canServe ? getPartnerEstimate(partner, service, elements.pickupZone.value || "cetate") : null;
    const marker = L.marker([partner.lat, partner.lng], { icon })
      .bindPopup(`
        <strong>${partner.name}</strong><br>
        ${partner.address}<br>
        ${canServe ? `${formatPrice(estimate.totalPrice)} | ${estimate.totalEtaMin} min<br>${estimate.priceLabel}` : "Pachet indisponibil public pentru serviciul ales"}<br>
        <span>${partner.priceSourceLabel}</span>
      `)
      .addTo(realMapLayer);
    if (canServe) {
      marker.on("click", () => {
        state.selectedPartnerId = partner.id;
        saveState();
        renderMap();
      });
    }
  });

  if (selectedPartner.partnerType !== "mobile") {
    L.polyline(
      [[zone.lat, zone.lng], [selectedPartner.lat, selectedPartner.lng]],
      { color: "#0f766e", weight: 4, opacity: 0.8, dashArray: "8 8" }
    ).addTo(realMapLayer);
  } else {
    L.circle([zone.lat, zone.lng], {
      radius: 2200,
      color: "#0f766e",
      fillColor: "#0f766e",
      fillOpacity: 0.08,
      weight: 2
    }).addTo(realMapLayer);
  }

  const bounds = L.latLngBounds([[zone.lat, zone.lng], [selectedPartner.lat, selectedPartner.lng]]);
  PARTNERS.filter((partner) => canPartnerServe(partner, service.id)).forEach((partner) => {
    bounds.extend([partner.lat, partner.lng]);
  });
  refreshRealMapSize(() => {
    realMap.fitBounds(bounds.pad(0.2), { animate: false, maxZoom: 14, padding: [18, 18] });
    refreshRealMapSize();
  });
}

function refreshRealMapSize(afterRefresh) {
  if (!realMap) return;

  window.requestAnimationFrame(() => {
    realMap.invalidateSize({ animate: false, pan: false });
    window.setTimeout(() => {
      realMap.invalidateSize({ animate: false, pan: false });
      if (typeof afterRefresh === "function") {
        afterRefresh();
      }
    }, 160);
  });
}

function renderClientOrders() {
  renderList(elements.clientOrders, state.orders, renderOrderCard);
}

function renderCourierJobs() {
  const jobs = state.orders.filter((order) => !["delivered", "cancelled"].includes(order.status));
  renderList(elements.courierJobs, jobs, renderCourierJob);
}

function renderAdminOrders() {
  if (state.orders.length === 0) {
    renderList(elements.adminOrders, [], renderOrderCard);
    return;
  }

  const filteredOrders = getFilteredAdminOrders();
  elements.adminOrders.innerHTML = `
    <div class="admin-controls">
      <label>
        Filtru comenzi
        <select data-admin-filter="orders">
          ${renderFilterOptions(state.adminOrderFilter)}
        </select>
      </label>
      <label>
        Filtru log comenzi
        <select data-admin-filter="logs">
          ${renderFilterOptions(state.adminLogFilter)}
        </select>
      </label>
    </div>
    <table>
      <thead>
        <tr>
          <th>Comanda</th>
          <th>Client</th>
          <th>Masina</th>
          <th>Compliance</th>
          <th>Video</th>
          <th>Status</th>
          <th>Operator</th>
          <th>Suport live</th>
          <th>Spalatorie</th>
          <th>Actiuni</th>
        </tr>
      </thead>
      <tbody>
        ${filteredOrders.map(renderAdminRow).join("") || renderEmptyAdminRow()}
      </tbody>
    </table>
    ${renderAdminOrderLog()}
  `;
  elements.adminOrders.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleOrderAction(button.dataset.orderId, button.dataset.action));
  });
  elements.adminOrders.querySelectorAll("[data-media-type]").forEach((button) => {
    button.addEventListener("click", () => openMediaModal(button.dataset.orderId, button.dataset.mediaPhase, button.dataset.mediaType));
  });
  elements.adminOrders.querySelectorAll("[data-admin-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      if (select.dataset.adminFilter === "orders") {
        state.adminOrderFilter = select.value;
      } else {
        state.adminLogFilter = select.value;
      }
      saveState();
      renderAdminOrders();
    });
  });
}

function renderPartnerOrders() {
  const partnerOrders = state.orders.filter((order) => ["at_wash", "washing", "wash_complete"].includes(order.status));
  renderList(elements.partnerOrders, partnerOrders, renderPartnerOrder);
}

function renderPartners() {
  elements.partnerList.innerHTML = PARTNERS.map((partner) => {
    const assignedCount = state.orders.filter((order) => order.partner.id === partner.id && !["delivered", "cancelled"].includes(order.status)).length;
    const packages = Object.keys(partner.priceBook).map((id) => {
      const service = SERVICES.find((item) => item.id === id);
      const price = partner.priceBook[id].price;
      return `${service.name} ${formatPrice(price)}`;
    }).join(", ") || "Pret indisponibil public";
    return `
      <article class="partner-card">
        <strong>${partner.name}</strong>
        <span class="muted">${partner.address}</span>
        <p class="muted">${partner.open} | ${partner.partnerType} | ${assignedCount}/${partner.capacity} masini active</p>
        <p class="muted">Pachete: ${packages}</p>
        <p class="muted">Sursa pret/adresa: ${partner.priceSourceLabel}</p>
      </article>
    `;
  }).join("");
}

function renderMetrics() {
  const activeOrders = state.orders.filter((order) => !["delivered", "cancelled"].includes(order.status));
  const revenue = state.orders
    .filter((order) => order.status !== "cancelled")
    .reduce((total, order) => total + order.payment.amount, 0);

  elements.todayOrders.textContent = `${state.orders.length} ${state.orders.length === 1 ? "comanda" : "comenzi"}`;
  elements.activeOrdersMetric.textContent = activeOrders.length;
  elements.revenueMetric.textContent = `${revenue} lei`;
}

function renderIncidentProcedure() {
  if (!elements.incidentProcedure) return;

  elements.incidentProcedure.innerHTML = INCIDENT_STEPS.map((item) => `
    <article class="incident-card" data-severity="${item.severity}">
      <span class="status-pill" data-tone="${getIncidentTone(item.severity)}">${item.severity}</span>
      <strong>${item.title}</strong>
      <p>${item.detail}</p>
      <span class="muted">Owner: ${item.owner}</span>
    </article>
  `).join("");
}

function getIncidentTone(severity) {
  const tones = {
    P0: "red",
    P1: "red",
    P2: "amber",
    P3: "blue"
  };
  return tones[severity] || "blue";
}

function renderList(container, items, renderer) {
  if (items.length === 0) {
    container.innerHTML = elements.emptyStateTemplate.innerHTML;
    return;
  }
  container.innerHTML = items.map(renderer).join("");
  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleOrderAction(button.dataset.orderId, button.dataset.action));
  });
  container.querySelectorAll("[data-evidence-upload]").forEach((input) => {
    input.addEventListener("change", () => handleEvidenceUpload(input.dataset.orderId, input.dataset.evidenceUpload, input.files[0]));
  });
}

function renderOrderCard(order) {
  const status = getStatus(order.status);
  const routeText = order.serviceMode === "safe_ride_home"
    ? `${order.pickupAddress} -> ${order.dropoffAddress || "adresa aleasa"}`
    : `${order.pickupAddress} -> ${order.partner.name}`;
  return `
    <article class="order-card">
      <header>
        <div>
          <strong>${order.vehicle} | ${order.plate}</strong>
          <span class="muted">${order.service.name}, ${order.slot}</span>
        </div>
        <span class="status-pill" data-tone="${status.tone}">${status.label}</span>
      </header>
      <p class="muted">${routeText}</p>
      <p class="muted">${order.estimate.priceLabel || order.partner.priceSourceLabel}</p>
      <div class="compliance-row">${renderCompliance(order)}</div>
      ${renderPaymentSummary(order)}
      ${renderEvidenceSummary(order)}
      <p class="muted">Operator in ${order.estimate.courierEtaMin} min | retur estimat in ${order.estimate.totalEtaMin} min | ${formatPrice(order.payment.amount)}</p>
      ${renderTimeline(order)}
    </article>
  `;
}

function renderCourierJob(order) {
  const status = getStatus(order.status);
  const nextStatus = getNextCourierStatus(order.status);
  const canAdvance = canAdvanceToNextCourierStatus(order, nextStatus);
  const routeText = order.serviceMode === "safe_ride_home"
    ? `${order.pickupAddress} -> ${order.dropoffAddress || "adresa aleasa"}`
    : `${order.pickupAddress} -> ${order.partner.name}`;
  return `
    <article class="job-card">
      <header>
        <div>
          <strong>${order.id}</strong>
          <span class="muted">${order.vehicle} | ${order.plate}</span>
        </div>
        <span class="status-pill" data-tone="${status.tone}">${status.label}</span>
      </header>
      <p><strong>Client:</strong> ${order.clientName}</p>
      <p class="muted">${routeText}</p>
      <p class="muted">ETA client ${order.estimate.courierEtaMin} min | retur ${order.estimate.totalEtaMin} min</p>
      <div class="compliance-row">${renderCompliance(order)}</div>
      ${renderCourierEvidenceControls(order)}
      ${renderCourierSupportPanel(order)}
      <div class="job-actions">
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="assign">Accepta cursa</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="${nextStatus}" ${canAdvance ? "" : "disabled"}>Urmatorul status</button>
        <button class="compact-action support-action" type="button" data-order-id="${order.id}" data-action="contact_dispatch">Contacteaza dispecer</button>
      </div>
    </article>
  `;
}

function renderAdminRow(order) {
  const status = getStatus(order.status);
  const nextStatus = getNextCourierStatus(order.status);
  const canCloseSupport = order.supportSession?.active;
  return `
    <tr>
      <td><strong>${order.id}</strong><br><span class="muted">${formatDate(order.createdAt)}</span></td>
      <td>${order.clientName}<br><span class="muted">${order.phone}</span></td>
      <td>${order.vehicle}<br><span class="muted">${order.plate}</span></td>
      <td>${renderCompliance(order)}</td>
      <td>${renderAdminEvidencePreview(order)}</td>
      <td><span class="status-pill" data-tone="${status.tone}">${status.label}</span></td>
      <td>${order.courier ? order.courier.name : "<span class=\"muted\">Neasignat</span>"}</td>
      <td>${renderAdminSupportConsole(order, nextStatus)}</td>
      <td>${order.partner.name}<br><span class="muted">${order.partner.address}</span></td>
      <td>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="confirm">Confirma</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="assign">Asigneaza</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="unlock_status">Deblocheaza status</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="close_support" ${canCloseSupport ? "" : "disabled"}>Inchide suport</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="export_audit">Raport audit</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="issue">Problema</button>
        <button class="compact-action danger-action" type="button" data-order-id="${order.id}" data-action="delete_order">Sterge</button>
      </td>
    </tr>
  `;
}

function renderFilterOptions(selectedValue) {
  const filters = [
    { id: "all", label: "Toate" },
    { id: "honored", label: "Onorate" },
    { id: "pending", label: "In asteptare" },
    { id: "issues", label: "Cu probleme" },
    { id: "cancelled", label: "Anulate / sterse" }
  ];
  return filters.map((filter) => `<option value="${filter.id}" ${filter.id === selectedValue ? "selected" : ""}>${filter.label}</option>`).join("");
}

function renderEmptyAdminRow() {
  return `
    <tr>
      <td colspan="10">
        <div class="empty-state">
          <strong>Nu exista comenzi pentru filtrul ales.</strong>
          <span>Schimba filtrul sau adauga un scenariu pilot.</span>
        </div>
      </td>
    </tr>
  `;
}

function renderAdminEvidencePreview(order) {
  const pickup = order.evidence?.pickup;
  const returnEvidence = order.evidence?.return;
  const previews = [
    renderMediaButtons(order, "pickup", pickup),
    renderMediaButtons(order, "return", returnEvidence)
  ].join("");

  return `<div class="admin-evidence-preview">${previews}</div>`;
}

function renderMediaButtons(order, phase, evidence) {
  const label = phase === "pickup" ? "Preluare" : "Retur";
  const disabled = evidence?.uploaded ? "" : "disabled";
  const frameCount = evidence?.frames?.length || 0;

  return `
    <div class="media-action-group">
      <strong>${label}</strong>
      <span class="muted">${evidence?.uploaded ? `${evidence.fileName} | ${frameCount} poze` : "fara media"}</span>
      <div>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-media-phase="${phase}" data-media-type="video" ${disabled}>Video</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-media-phase="${phase}" data-media-type="photos" ${disabled}>Poze</button>
      </div>
    </div>
  `;
}

function openMediaModal(orderId, phase, mediaType) {
  const order = state.orders.find((item) => item.id === orderId);
  const evidence = order?.evidence?.[phase];
  if (!order || !evidence?.uploaded) return;

  const phaseLabel = phase === "pickup" ? "preluare" : "retur";
  const mediaLabel = mediaType === "video" ? "Video" : "Poze";
  elements.mediaModalTitle.textContent = `${mediaLabel} ${phaseLabel} | ${order.id}`;
  elements.mediaModalBody.innerHTML = mediaType === "video"
    ? renderMediaModalVideo(order, phase, evidence)
    : renderMediaModalPhotos(evidence);
  elements.mediaModal.hidden = false;
}

function closeMediaModal() {
  elements.mediaModal.hidden = true;
  elements.mediaModalBody.innerHTML = "";
}

function renderMediaModalVideo(order, phase, evidence) {
  const key = getEvidenceVideoKey(order.id, phase);
  const videoUrl = evidenceVideoUrls.get(key);

  const metadata = `
    <div class="media-metadata">
      <span>Fisier: ${escapeHtml(evidence.fileName)}</span>
      <span>Dimensiune: ${formatFileSize(evidence.fileSize)}</span>
      <span>Retentie: stergere automata ${formatDate(evidence.deleteAt)}</span>
      <span>Cadre extrase: ${evidence.frames.length}</span>
    </div>
  `;

  if (!videoUrl) {
    return `
      <div class="media-empty">
        <strong>Video disponibil doar ca metadata in aceasta sesiune</strong>
        <span>Preview-ul video se poate reda doar in browserul in care operatorul a incarcat fisierul. In productie, butonul va deschide fisierul din storage securizat 30 zile.</span>
      </div>
      ${metadata}
    `;
  }

  return `
    <div class="video-preview media-video-player">
      <video controls preload="metadata" src="${videoUrl}"></video>
    </div>
    ${metadata}
  `;
}

function renderMediaModalPhotos(evidence) {
  return `
    <div class="media-metadata">
      <span>Fisier sursa: ${escapeHtml(evidence.fileName)}</span>
      <span>Poze extrase automat din video: ${evidence.frames.length}</span>
      <span>Retentie: stergere automata ${formatDate(evidence.deleteAt)}</span>
    </div>
    <div class="media-photo-grid">
      ${evidence.frames.map((frame, index) => `
        <figure>
          ${frame.previewKey && evidenceFrameUrls.has(frame.previewKey)
            ? `<img src="${evidenceFrameUrls.get(frame.previewKey)}" alt="Cadru ${escapeHtml(frame.label)}">`
            : `<div class="media-photo-placeholder">${index + 1}</div>`}
          <figcaption>${escapeHtml(frame.label)}</figcaption>
        </figure>
      `).join("")}
    </div>
  `;
}

function renderAdminOrderLog() {
  const logItems = getFilteredOrderLog();
  return `
    <section class="order-log">
      <div class="subsection-heading">
        <div>
          <p class="eyebrow">Log comenzi</p>
          <h3>Audit operational filtrabil</h3>
        </div>
        <span class="badge">${logItems.length} evenimente</span>
      </div>
      <div class="log-list">
        ${logItems.map(renderOrderLogItem).join("") || "<div class=\"empty-state\"><strong>Nu exista loguri pentru filtrul ales.</strong><span>Schimba filtrul pentru a vedea alte evenimente.</span></div>"}
      </div>
    </section>
  `;
}

function renderOrderLogItem(item) {
  return `
    <article class="log-item" data-bucket="${item.bucket}">
      <div>
        <strong>${escapeHtml(item.orderId)} | ${escapeHtml(item.vehicle)} | ${escapeHtml(item.plate)}</strong>
        <span class="muted">${item.clientName} | ${getOrderBucketLabel(item.bucket)} | ${formatDate(item.createdAt)}</span>
      </div>
      <p>${escapeHtml(item.message)}</p>
      ${item.comment ? `<p class="admin-comment">Comentariu admin: ${escapeHtml(item.comment)}</p>` : ""}
    </article>
  `;
}

function renderPartnerOrder(order) {
  const status = getStatus(order.status);
  return `
    <article class="order-card">
      <header>
        <div>
          <strong>${order.vehicle} | ${order.plate}</strong>
          <span class="muted">${order.service.name}, ${order.service.duration} min</span>
        </div>
        <span class="status-pill" data-tone="${status.tone}">${status.label}</span>
      </header>
      <p class="muted">${order.partner.name} | ${order.partner.address}</p>
      <div class="job-actions">
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="washing">Incepe spalarea</button>
        <button class="compact-action" type="button" data-order-id="${order.id}" data-action="wash_complete">Finalizeaza</button>
      </div>
    </article>
  `;
}

function renderCompliance(order) {
  const docsOk = Boolean(order.documents?.validationReady || (order.documents?.uploaded && order.documents?.plateMatches));
  const ownerOk = Boolean(!order.documents?.authorization?.required || order.documents?.authorization?.uploaded);
  const legalOk = order.legal?.riskAccepted;
  const evidenceOk = hasEvidenceForStatus(order);
  return `
    <span class="status-pill" data-tone="${docsOk ? "green" : "red"}">Documente ${docsOk ? "OK" : "review"}</span>
    <span class="status-pill" data-tone="${ownerOk ? "green" : "red"}">Proprietar ${ownerOk ? "OK" : "imputernicire"}</span>
    <span class="status-pill" data-tone="${legalOk ? "green" : "red"}">Acord ${legalOk ? "semnat" : "lipsa"}</span>
    <span class="status-pill" data-tone="${evidenceOk ? "green" : "amber"}">Video ${evidenceOk ? "OK" : "asteapta"}</span>
    <span class="status-pill" data-tone="${order.payment?.status === "paid" ? "green" : "amber"}">Plata ${order.payment?.status === "paid" ? "OK" : "in asteptare"}</span>
    ${order.supportSession?.active ? "<span class=\"status-pill\" data-tone=\"amber\">Dispecer live</span>" : ""}
    ${order.supportSession?.manualUnlock?.active ? "<span class=\"status-pill\" data-tone=\"blue\">Status deblocat</span>" : ""}
  `;
}

function renderPaymentSummary(order) {
  const payment = normalizePayment(order.payment);
  const isPaid = payment.status === "paid";
  return `
    <div class="payment-box">
      <div>
        <strong>Plata card</strong>
        <span>${payment.providerName} | ${formatPrice(payment.amount)} | ${isPaid ? "platita" : "neplatita"}</span>
        <span class="muted">Procesare externa: app-ul nu colecteaza si nu stocheaza numar card, CVV sau date sensibile de card.</span>
      </div>
      <button class="compact-action" type="button" data-order-id="${order.id}" data-action="pay_order" ${isPaid ? "disabled" : ""}>${isPaid ? "Plata confirmata" : "Simuleaza webhook NETOPIA"}</button>
    </div>
  `;
}

function renderEvidenceSummary(order) {
  const pickupEvidence = order.evidence?.pickup;
  const returnEvidence = order.evidence?.return;
  const rows = [pickupEvidence, returnEvidence]
    .filter((item) => item?.uploaded)
    .map((item) => `<span>${item.label}: ${item.fileName}, ${item.frames.length} cadre, stergere ${formatDate(item.deleteAt)}</span>`)
    .join("");

  if (!rows) {
    return `<div class="evidence-summary muted">Video walkaround: in asteptare. Retentie: ${EVIDENCE_RETENTION_DAYS} zile.</div>`;
  }

  return `<div class="evidence-summary">${rows}</div>`;
}

function renderCourierEvidenceControls(order) {
  const phase = getEvidencePhaseForOrder(order);
  const pickupEvidence = order.evidence?.pickup;
  const returnEvidence = order.evidence?.return;
  const currentEvidence = phase ? order.evidence?.[phase] : null;

  return `
    <div class="evidence-box">
      <strong>Dovada video 360</strong>
      <span>Pickup: ${pickupEvidence?.uploaded ? `${pickupEvidence.frames.length} cadre extrase` : "neincarcat"} | Retur: ${returnEvidence?.uploaded ? `${returnEvidence.frames.length} cadre extrase` : "neincarcat"}</span>
      ${phase ? `
        <label class="evidence-upload">
          ${phase === "pickup" ? "Incarca video preluare" : "Incarca video retur"}
          <input data-evidence-upload="${phase}" data-order-id="${order.id}" type="file" accept="video/*">
        </label>
        <span class="muted">Se extrag automat cadre demo: laturi, colturi si roti. Video-ul expira dupa ${EVIDENCE_RETENTION_DAYS} zile.</span>
      ` : `<span class="muted">Urmatorul video va fi cerut la preluare sau la retur.</span>`}
      ${currentEvidence?.uploaded ? renderEvidenceFrames(currentEvidence) : ""}
    </div>
  `;
}

function renderCourierSupportPanel(order) {
  const support = order.supportSession;
  const lastEvent = getLastEvent(order);
  if (!support?.active) {
    return `
      <div class="support-box">
        <strong>Suport dispecer</strong>
        <span class="muted">Daca documentele, plata, predarea sau statusul se blocheaza, contacteaza adminul. Video-ul 360 ramane obligatoriu la preluare si la retur.</span>
      </div>
    `;
  }

  return `
    <div class="support-box live-support">
      <strong>Dispecer conectat</strong>
      <span>Screen mirroring MVP activ: adminul vede statusul curent, dovada video, ruta si ultimul eveniment.</span>
      <span class="muted">Motiv: ${support.reason}</span>
      <span class="muted">Ultimul eveniment: ${lastEvent?.message || "fara evenimente"}</span>
      ${support.manualUnlock?.active ? `<span class="status-pill" data-tone="blue">Admin a deblocat ${getStatus(support.manualUnlock.status).label}</span>` : ""}
    </div>
  `;
}

function renderAdminSupportConsole(order, nextStatus) {
  if (!order.supportSession?.active) {
    return `<span class="muted">Fara cerere activa</span>`;
  }

  return `
    <div class="mirror-console">
      <strong>Mirror operator</strong>
      <span>${order.courier ? order.courier.name : "Operator neasignat"} | ${order.id}</span>
      <span>Status curent: ${getStatus(order.status).label}</span>
      <span>Urmator: ${getStatus(nextStatus).label}</span>
      <span>Ruta: ${PICKUP_ZONES[order.pickupZone]?.name || order.pickupZone} -> ${order.partner.name}</span>
      <span>Video pickup: ${order.evidence?.pickup?.uploaded ? "incarcat" : "lipsa"} | retur: ${order.evidence?.return?.uploaded ? "incarcat" : "lipsa"}</span>
      <span class="muted">Unlock admin nu poate inlocui video-ul obligatoriu.</span>
      <span class="muted">${getBlockReason(order, nextStatus)}</span>
    </div>
  `;
}

function renderEvidenceFrames(evidence) {
  return `
    <div class="frame-grid">
      ${evidence.frames.map((frame) => `<span>${frame.label}</span>`).join("")}
    </div>
  `;
}

function renderTimeline(order) {
  const visibleStatuses = ORDER_STATUSES.filter((status) => !["cancelled", "issue_reported"].includes(status.id));
  const currentIndex = visibleStatuses.findIndex((status) => status.id === order.status);
  return `
    <div class="timeline">
      ${visibleStatuses.slice(0, 10).map((status, index) => `
        <div class="timeline-step ${index <= currentIndex ? "done" : ""}">
          <span class="timeline-dot"></span>
          <span>${status.label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function handleOrderAction(orderId, action) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;

  if (action === "assign") {
    order.courier = order.courier || COURIERS[0];
    moveToStatus(order, "courier_assigned", `Operator asignat: ${order.courier.name}.`);
  } else if (action === "confirm") {
    moveToStatus(order, "confirmed", "Comanda confirmata de operator.");
  } else if (action === "issue") {
    moveToStatus(order, "issue_reported", "Problema operationala raportata pentru investigare.");
  } else if (action === "contact_dispatch") {
    requestDispatcherSupport(order);
  } else if (action === "unlock_status") {
    unlockNextStatus(order);
  } else if (action === "close_support") {
    closeDispatcherSupport(order);
  } else if (action === "delete_order") {
    deleteOrderWithComment(order);
  } else if (action === "export_audit") {
    downloadAuditReport(order);
    return;
  } else if (action === "pay_order") {
    simulateExternalPayment(order);
  } else if (ORDER_STATUSES.some((status) => status.id === action)) {
    const hasManualUnlock = hasManualStatusUnlock(order, action);
    if (action === "vehicle_picked_up" && !order.evidence?.pickup?.uploaded) {
      order.events.unshift(createEvent("pickup_video_missing", "Actiune blocata: lipseste video-ul 360 de preluare."));
    } else if (action === "delivered" && !order.evidence?.return?.uploaded) {
      order.events.unshift(createEvent("return_video_missing", "Actiune blocata: lipseste video-ul 360 de retur."));
    } else if (["courier_en_route", "vehicle_picked_up"].includes(action) && !canCourierAdvance(order) && !hasManualUnlock) {
      moveToStatus(order, "issue_reported", "Operator blocat: documente, acord legal sau plata lipsa.");
    } else {
      const message = action === "vehicle_picked_up"
        ? "Inspectie demo adaugata: video 360, cadre extrase, km, documente si acord client."
        : `Status actualizat: ${getStatus(action).label}.`;
      if (action === "vehicle_picked_up") {
        order.inspections.push({
          type: "pickup",
          photos: order.evidence.pickup.frames.map((frame) => frame.label),
          checklist: ["km", "combustibil", "chei", "talon", "bunuri declarate"],
          notes: order.notes,
          confirmedAt: new Date().toISOString()
        });
      }
      if (hasManualUnlock) {
        order.events.unshift(createEvent("manual_unlock_consumed", `Deblocare admin consumata pentru ${getStatus(action).label}.`));
        order.supportSession.manualUnlock.active = false;
      }
      moveToStatus(order, action, message);
    }
  }

  saveState();
  render();
}

async function handleEvidenceUpload(orderId, phase, file) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order || !file || !["pickup", "return"].includes(phase)) return;

  order.evidence = order.evidence || createEmptyEvidenceState();
  const videoKey = getEvidenceVideoKey(orderId, phase);
  const existingUrl = evidenceVideoUrls.get(videoKey);
  if (existingUrl) {
    URL.revokeObjectURL(existingUrl);
  }
  clearEvidenceFramePreviews(orderId, phase);

  const videoUrl = URL.createObjectURL(file);
  evidenceVideoUrls.set(videoKey, videoUrl);
  order.evidence[phase] = createEvidenceRecord(phase, file);
  order.events.unshift(createEvent(`${phase}_video_uploaded`, `Video ${phase === "pickup" ? "preluare" : "retur"} incarcat. Se extrag cadre din video.`));

  try {
    await extractEvidenceFramesFromVideo(orderId, phase, videoUrl, order.evidence[phase]);
    order.events.unshift(createEvent(`${phase}_frames_extracted`, `Cadre reale extrase din video: ${order.evidence[phase].frames.length}.`));
  } catch (error) {
    order.events.unshift(createEvent(`${phase}_frames_fallback`, "Nu s-au putut extrage cadre reale; raman disponibile metadatele si etichetele demo."));
  }

  saveState();
  render();
}

function getEvidenceVideoKey(orderId, phase) {
  return `${orderId}:${phase}`;
}

function canCourierAdvance(order) {
  return Boolean(
    (order.documents?.validationReady || (order.documents?.uploaded && order.documents?.plateMatches)) &&
    (order.legal?.ready || order.legal?.riskAccepted) &&
    normalizePayment(order.payment).status === "paid"
  );
}

function canAdvanceToNextCourierStatus(order, nextStatus) {
  if (nextStatus === "vehicle_picked_up") return Boolean(order.evidence?.pickup?.uploaded);
  if (nextStatus === "delivered") return Boolean(order.evidence?.return?.uploaded);
  if (hasManualStatusUnlock(order, nextStatus)) return true;
  if (!canCourierAdvance(order)) return false;
  return true;
}

function requestDispatcherSupport(order) {
  order.supportSession = {
    active: true,
    requestedAt: new Date().toISOString(),
    channel: "dispatcher",
    reason: getBlockReason(order, getNextCourierStatus(order.status)),
    screenMirrorEnabled: true,
    screenMirrorStartedAt: new Date().toISOString(),
    manualUnlock: order.supportSession?.manualUnlock || null
  };
  order.events.unshift(createEvent("dispatcher_contacted", "Operatorul a contactat dispecerul; screen mirroring operational activat pentru admin."));
}

function unlockNextStatus(order) {
  const nextStatus = getNextCourierStatus(order.status);
  order.supportSession = order.supportSession || createEmptySupportSession();
  order.supportSession.active = true;
  order.supportSession.channel = "dispatcher";
  order.supportSession.screenMirrorEnabled = true;
  order.supportSession.screenMirrorStartedAt = order.supportSession.screenMirrorStartedAt || new Date().toISOString();
  order.supportSession.manualUnlock = {
    active: true,
    status: nextStatus,
    unlockedBy: "Admin demo",
    unlockedAt: new Date().toISOString(),
    reason: getBlockReason(order, nextStatus)
  };
  order.events.unshift(createEvent("manual_status_unlock", `Admin a deblocat manual urmatorul status: ${getStatus(nextStatus).label}.`));
}

function closeDispatcherSupport(order) {
  if (!order.supportSession) return;
  order.supportSession.active = false;
  order.supportSession.closedAt = new Date().toISOString();
  order.events.unshift(createEvent("dispatcher_support_closed", "Sesiunea de suport cu dispecerul a fost inchisa de admin."));
}

function deleteOrderWithComment(order) {
  const comment = window.prompt("Scrie motivul relevant pentru stergerea/anularea comenzii. Va ramane in logul comenzii.");
  if (!isRelevantAdminComment(comment)) {
    order.events.unshift(createEvent("delete_rejected", "Stergere respinsa: comentariu admin lipsa sau prea vag."));
    return;
  }

  order.deletedAt = new Date().toISOString();
  order.deletedBy = "Admin demo";
  order.deletionComment = comment.trim();
  order.supportSession = order.supportSession || createEmptySupportSession();
  order.supportSession.active = false;
  moveToStatus(order, "cancelled", `Comanda stearsa/anulata de admin. Motiv: ${comment.trim()}`);
}

function isRelevantAdminComment(comment) {
  const cleaned = String(comment || "").trim();
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const genericComments = ["test", "ok", "sterge", "anuleaza", "nu merge", "motiv"];
  return cleaned.length >= 12 && wordCount >= 3 && !genericComments.includes(cleaned.toLowerCase());
}

function downloadAuditReport(order) {
  const report = createOrderAuditReport(order);
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `raport-audit-${slugify(order.id)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  order.events.unshift(createEvent("audit_report_exported", "Raport audit descarcat de administrator."));
  saveState();
  render();
}

function createOrderAuditReport(order) {
  const payment = normalizePayment(order.payment);
  return {
    generatedAt: new Date().toISOString(),
    generatedBy: "Admin demo",
    city: order.city,
    order: {
      id: order.id,
      status: order.status,
      statusLabel: getStatus(order.status).label,
      createdAt: order.createdAt,
      deletedAt: order.deletedAt || null,
      deletionComment: order.deletionComment || null
    },
    client: {
      name: order.clientName,
      phone: order.phone,
      ownerName: order.ownerName
    },
    vehicle: {
      label: order.vehicle,
      plate: order.plate,
      ownerName: order.documents?.ownerName || order.ownerName,
      ownerNameMatches: Boolean(order.documents?.ownerNameMatches),
      plateMatches: Boolean(order.documents?.plateMatches)
    },
    service: {
      mode: order.serviceMode || "wash_pickup",
      packageId: order.service?.id,
      packageName: order.service?.name,
      slot: order.slot,
      pickupAddress: order.pickupAddress,
      dropoffAddress: order.dropoffAddress || null,
      notes: order.notes || ""
    },
    partner: {
      id: order.partner?.id,
      name: order.partner?.name,
      address: order.partner?.address,
      priceSource: order.partner?.priceSourceLabel || ""
    },
    courier: order.courier ? {
      id: order.courier.id,
      name: order.courier.name,
      scooter: order.courier.scooter
    } : null,
    payment: {
      provider: payment.providerName,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      checkoutType: payment.checkoutType || "redirect",
      cardDataStored: Boolean(payment.cardDataStored),
      processorReference: payment.processorReference || null,
      paidAt: payment.paidAt || null
    },
    compliance: {
      documentsReady: Boolean(order.documents?.validationReady),
      legalReady: Boolean(order.legal?.ready || order.legal?.riskAccepted),
      paymentReady: payment.status === "paid",
      pickupVideoReady: Boolean(order.evidence?.pickup?.uploaded),
      returnVideoReady: Boolean(order.evidence?.return?.uploaded),
      canCourierAdvance: canCourierAdvance(order)
    },
    documents: summarizeDocumentsForAudit(order.documents),
    evidence: summarizeEvidenceForAudit(order.evidence),
    supportSession: order.supportSession || createEmptySupportSession(),
    inspections: order.inspections || [],
    events: (order.events || []).map((event) => ({
      status: event.status,
      message: event.message,
      createdAt: event.createdAt
    }))
  };
}

function summarizeDocumentsForAudit(documents = {}) {
  return {
    recognitionStatus: documents.recognitionStatus || "unknown",
    validationReady: Boolean(documents.validationReady),
    plateMatches: Boolean(documents.plateMatches),
    ownerNameMatches: Boolean(documents.ownerNameMatches),
    ownerDiffers: Boolean(documents.ownerDiffers),
    imageQualityOk: Boolean(documents.imageQualityOk),
    insuranceValid: Boolean(documents.insuranceValid),
    files: [
      documents.registration?.front,
      documents.registration?.back,
      documents.license?.front,
      documents.license?.back,
      documents.insurance,
      documents.authorization
    ].filter(Boolean).map((item) => ({
      type: item.type || "document",
      uploaded: Boolean(item.uploaded),
      fileName: item.fileName || "",
      cleanImage: Boolean(item.cleanImage),
      valid: item.valid ?? null
    }))
  };
}

function summarizeEvidenceForAudit(evidence = {}) {
  return ["pickup", "return"].reduce((summary, phase) => {
    const item = evidence?.[phase];
    summary[phase] = item?.uploaded ? {
      label: item.label,
      fileName: item.fileName,
      fileSize: item.fileSize,
      mimeType: item.mimeType,
      uploadedAt: item.uploadedAt,
      deleteAt: item.deleteAt,
      storagePolicy: item.storagePolicy,
      frameCount: item.frames?.length || 0,
      frames: (item.frames || []).map((frame) => ({
        label: frame.label,
        sourceSecond: frame.sourceSecond,
        fileName: frame.fileName,
        extractedAt: frame.extractedAt || null
      }))
    } : {
      uploaded: false,
      deletedAt: item?.deletedAt || null,
      storagePolicy: item?.storagePolicy || "not_uploaded"
    };
    return summary;
  }, {});
}

function getFilteredAdminOrders() {
  return state.orders.filter((order) => orderMatchesFilter(order, state.adminOrderFilter));
}

function getFilteredOrderLog() {
  return state.orders
    .flatMap((order) => (order.events || []).map((event) => ({
      orderId: order.id,
      vehicle: order.vehicle,
      plate: order.plate,
      clientName: order.clientName,
      bucket: getOrderBucket(order),
      message: event.message,
      comment: event.status === "cancelled" || event.status === "delete_rejected" ? order.deletionComment : "",
      createdAt: event.createdAt
    })))
    .filter((item) => state.adminLogFilter === "all" || item.bucket === state.adminLogFilter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function orderMatchesFilter(order, filter) {
  return filter === "all" || getOrderBucket(order) === filter;
}

function getOrderBucket(order) {
  if (order.status === "delivered") return "honored";
  if (order.status === "cancelled" || order.deletedAt) return "cancelled";
  if (order.status === "issue_reported" || order.supportSession?.active) return "issues";
  return "pending";
}

function getOrderBucketLabel(bucket) {
  const labels = {
    honored: "onorata",
    pending: "in asteptare",
    issues: "cu probleme",
    cancelled: "anulata/stearsa"
  };
  return labels[bucket] || "toate";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatFileSize(size) {
  const bytes = Number(size || 0);
  if (!bytes) return "necunoscuta";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function hasManualStatusUnlock(order, status) {
  const unlock = order.supportSession?.manualUnlock;
  return Boolean(unlock?.active && unlock.status === status);
}

function getBlockReason(order, nextStatus) {
  if (normalizePayment(order.payment).status !== "paid") {
    return "Blocaj posibil: plata cu cardul nu este confirmata de procesator.";
  }
  if (!canCourierAdvance(order)) {
    return "Blocaj posibil: documente, imputernicire sau acord legal incomplete.";
  }
  if (nextStatus === "vehicle_picked_up" && !order.evidence?.pickup?.uploaded) {
    return "Blocaj posibil: lipseste video-ul 360 de preluare.";
  }
  if (nextStatus === "delivered" && !order.evidence?.return?.uploaded) {
    return "Blocaj posibil: lipseste video-ul 360 de retur.";
  }
  return "Nu exista blocaj detectat; dispecerul poate ghida operatorul live.";
}

function getLastEvent(order) {
  return order.events?.[0] || null;
}

function hasEvidenceForStatus(order) {
  if (order.status === "delivered") {
    return Boolean(order.evidence?.pickup?.uploaded && order.evidence?.return?.uploaded);
  }
  if (["vehicle_picked_up", "at_wash", "washing", "wash_complete", "returning", "delivered"].includes(order.status)) {
    return Boolean(order.evidence?.pickup?.uploaded);
  }
  return true;
}

function getEvidencePhaseForOrder(order) {
  if (["courier_assigned", "courier_en_route", "issue_reported"].includes(order.status) && !order.evidence?.pickup?.uploaded) {
    return "pickup";
  }
  if (["wash_complete", "returning"].includes(order.status) && !order.evidence?.return?.uploaded) {
    return "return";
  }
  return null;
}

function createEmptyEvidenceState() {
  return {
    retentionDays: EVIDENCE_RETENTION_DAYS,
    pickup: null,
    return: null
  };
}

function createEmptySupportSession() {
  return {
    active: false,
    screenMirrorEnabled: false,
    manualUnlock: null
  };
}

function createPaymentState(providerId, amount) {
  const provider = PAYMENT_PROVIDERS[providerId] || PAYMENT_PROVIDERS["netopia-bt-pay"];
  const sessionId = `PAY-${Date.now().toString().slice(-6)}`;
  return {
    method: "Card online",
    providerId: providerId || "netopia-bt-pay",
    providerName: provider.name,
    providerRecommendation: provider.recommendation,
    checkoutType: provider.checkoutType,
    checkoutSessionId: sessionId,
    checkoutUrl: `https://checkout.example/${providerId || "netopia-bt-pay"}/${sessionId}`,
    status: "pending",
    amount,
    currency: "RON",
    cardDataStored: false,
    requires3ds: true,
    createdAt: new Date().toISOString()
  };
}

function normalizePayment(payment) {
  if (payment?.providerName) return payment;
  return {
    method: payment?.method || "Card online",
    providerId: payment?.providerId || "netopia-bt-pay",
    providerName: payment?.providerName || PAYMENT_PROVIDERS["netopia-bt-pay"].name,
    status: payment?.status || "pending",
    amount: payment?.amount ?? null,
    currency: payment?.currency || "RON",
    cardDataStored: false,
    requires3ds: true
  };
}

function simulateExternalPayment(order) {
  order.payment = normalizePayment(order.payment);
  order.payment.status = "paid";
  order.payment.paidAt = new Date().toISOString();
  order.payment.processorReference = `EXT-${Date.now().toString().slice(-8)}`;
  order.events.unshift(createEvent("payment_paid", `Plata card confirmata prin ${order.payment.providerName}.`));
}

function createEvidenceRecord(phase, file) {
  const uploadedAt = new Date();
  const deleteAt = new Date(uploadedAt.getTime() + EVIDENCE_RETENTION_MS);
  return {
    phase,
    label: phase === "pickup" ? "Preluare" : "Retur",
    uploaded: true,
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type || "video/*",
    uploadedAt: uploadedAt.toISOString(),
    deleteAt: deleteAt.toISOString(),
    storagePolicy: "delete_after_30_days",
    frames: EVIDENCE_FRAME_LABELS.map((label, index) => ({
      label,
      sourceSecond: (index + 1) * 3,
      fileName: `${phase}-${index + 1}-${slugify(label)}.jpg`,
      previewKey: null
    }))
  };
}

function clearEvidenceFramePreviews(orderId, phase) {
  const prefix = `${orderId}:${phase}:`;
  Array.from(evidenceFrameUrls.keys()).forEach((key) => {
    if (key.startsWith(prefix)) {
      evidenceFrameUrls.delete(key);
    }
  });
}

function extractEvidenceFramesFromVideo(orderId, phase, videoUrl, evidence) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "metadata";
    video.playsInline = true;

    video.addEventListener("loadedmetadata", async () => {
      try {
        const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : EVIDENCE_FRAME_LABELS.length;
        for (let index = 0; index < evidence.frames.length; index += 1) {
          const targetSecond = Math.min(duration - 0.2, Math.max(0, ((index + 1) / (evidence.frames.length + 1)) * duration));
          await seekVideo(video, targetSecond);
          const imageUrl = captureVideoFrame(video);
          const previewKey = `${orderId}:${phase}:${index}`;
          evidenceFrameUrls.set(previewKey, imageUrl);
          evidence.frames[index] = {
            ...evidence.frames[index],
            sourceSecond: Math.round(targetSecond),
            previewKey,
            extractedAt: new Date().toISOString()
          };
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    }, { once: true });

    video.addEventListener("error", () => reject(new Error("Video metadata could not be loaded.")), { once: true });
    video.src = videoUrl;
    video.load();
  });
}

function seekVideo(video, second) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };
    const onSeeked = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("Video seek failed."));
    };
    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.currentTime = second;
  });
}

function captureVideoFrame(video) {
  const canvas = document.createElement("canvas");
  const sourceWidth = video.videoWidth || 640;
  const sourceHeight = video.videoHeight || 360;
  const maxWidth = 360;
  const scale = Math.min(1, maxWidth / sourceWidth);
  canvas.width = Math.max(1, Math.round(sourceWidth * scale));
  canvas.height = Math.max(1, Math.round(sourceHeight * scale));
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.78);
}

function purgeExpiredEvidence() {
  let changed = false;
  const now = Date.now();
  getCurrentOrders().forEach((order) => {
    if (!order.evidence) return;
    ["pickup", "return"].forEach((phase) => {
      const evidence = order.evidence[phase];
      if (evidence?.deleteAt && new Date(evidence.deleteAt).getTime() <= now) {
        order.evidence[phase] = {
          phase,
          label: phase === "pickup" ? "Preluare" : "Retur",
          uploaded: false,
          deletedAt: new Date().toISOString(),
          storagePolicy: "deleted_after_30_days",
          frames: []
        };
        order.events.unshift(createEvent(`${phase}_video_deleted`, `Video ${phase} sters automat dupa ${EVIDENCE_RETENTION_DAYS} zile.`));
        changed = true;
      }
    });
  });
  if (changed) saveState();
}

function moveToStatus(order, status, message) {
  order.status = status;
  order.events.unshift(createEvent(status, message));
}

function getNextCourierStatus(status) {
  const flow = ["confirmed", "courier_assigned", "courier_en_route", "vehicle_picked_up", "at_wash", "returning", "delivered"];
  const currentIndex = flow.indexOf(status);
  if (currentIndex === -1) return "courier_en_route";
  return flow[Math.min(currentIndex + 1, flow.length - 1)];
}

function getStatus(statusId) {
  return ORDER_STATUSES.find((status) => status.id === statusId) || ORDER_STATUSES[0];
}

function getRankedPartners(service, zoneId) {
  return PARTNERS
    .filter((partner) => canPartnerServe(partner, service.id))
    .map((partner) => ({ partner, estimate: getPartnerEstimate(partner, service, zoneId) }))
    .sort((a, b) => {
      const scoreA = a.estimate.sortPrice + a.estimate.totalEtaMin * 1.7;
      const scoreB = b.estimate.sortPrice + b.estimate.totalEtaMin * 1.7;
      return scoreA - scoreB;
    });
}

function getPartnerEstimate(partner, service, zoneId) {
  const zone = PICKUP_ZONES[zoneId] || PICKUP_ZONES.cetate;
  const isMobile = ["mobile", "valet"].includes(partner.partnerType);
  const distanceUnits = isMobile ? 0 : Math.hypot(partner.x - zone.x, partner.y - zone.y);
  const courierEtaMin = Math.max(6, Math.round(distanceUnits / 2.7));
  const driveToWashMin = Math.max(5, Math.round(distanceUnits / 3.4));
  const activeLoad = getCurrentOrders().filter((order) => order.partner.id === partner.id && !["delivered", "cancelled"].includes(order.status)).length;
  const queueMin = activeLoad * 8;
  const priceEntry = getPartnerPriceEntry(partner, service.id) || { price: service.basePrice, duration: service.duration, label: "Pret fallback demo", sourceVerified: false };
  const washPrice = priceEntry.price;
  const serviceDuration = priceEntry.duration || service.duration;
  const totalEtaMin = isMobile
    ? serviceDuration + queueMin
    : courierEtaMin + driveToWashMin + serviceDuration + queueMin + driveToWashMin;
  return {
    courierEtaMin: isMobile ? 0 : courierEtaMin,
    driveToWashMin: isMobile ? 0 : driveToWashMin,
    queueMin,
    washPrice,
    pickupFee: partner.pickupFee,
    totalPrice: washPrice === null ? null : washPrice + partner.pickupFee,
    sortPrice: washPrice === null ? 9999 : washPrice + partner.pickupFee,
    totalEtaMin,
    priceLabel: priceEntry.label,
    priceSourceVerified: priceEntry.sourceVerified
  };
}

function getCurrentOrders() {
  try {
    return Array.isArray(state.orders) ? state.orders : [];
  } catch {
    return [];
  }
}

function selectPartner() {
  const service = SERVICES.find((item) => item.id === elements.serviceSelect?.value) || SERVICES[2];
  const zoneId = elements.pickupZone?.value || "cetate";
  return getRankedPartners(service, zoneId)[0].partner;
}

function canPartnerServe(partner, serviceId) {
  if (serviceId === "safe_ride_home") {
    return partner.partnerType === "valet";
  }
  if (partner.partnerType === "valet") {
    return false;
  }
  return Boolean(getPartnerPriceEntry(partner, serviceId));
}

function getPartnerPriceEntry(partner, serviceId) {
  return partner.priceBook?.[serviceId] || null;
}

function formatPrice(value) {
  return value === null || value === undefined ? "Pret n/a" : `${value} lei`;
}

function getRouteStyle(zone, partner) {
  const dx = partner.x - zone.x;
  const dy = partner.y - zone.y;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return `left:${zone.x}%; top:${zone.y}%; width:${length}%; transform:rotate(${angle}deg);`;
}

function normalizePlate(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createEvent(status, message) {
  return {
    status,
    message,
    createdAt: new Date().toISOString()
  };
}

function createSeedOrder(id = "ORD-240501") {
  const service = SERVICES[2];
  const partner = PARTNERS[1];
  const estimate = getPartnerEstimate(partner, service, "cetate");
  return {
    id,
    city: OPERATING_CITY,
    clientName: "Ioana Marinescu",
    ownerName: "Ioana Marinescu",
    phone: "+40 722 222 333",
    vehicle: "Audi A4",
    plate: "TM 46 MVP",
    pickupZone: "cetate",
    pickupAddress: "Piata Unirii 4, Timisoara",
    slot: "Astazi 13:00-15:00",
    notes: "Jante sensibile, interior piele deschisa.",
    service: { id: service.id, name: service.name, duration: service.duration, price: estimate.washPrice },
    partner,
    courier: COURIERS[1],
    status: "courier_en_route",
    payment: {
      ...createPaymentState("netopia-bt-pay", estimate.totalPrice),
      status: "paid",
      paidAt: new Date().toISOString(),
      processorReference: "EXT-DEMO-240501"
    },
    estimate,
    documents: {
      uploaded: true,
      validationReady: true,
      recognitionStatus: "verified",
      plateMatches: true,
      vehicleMatches: true,
      requesterMatchesLicense: true,
      ownerName: "IOANA MARINESCU",
      ownerNameMatches: true,
      ownerDiffers: false,
      imageQualityOk: true,
      insuranceValid: true,
      insurance: { type: "RCA", uploaded: true, fileName: "rca-demo.pdf", cleanImage: true, expiresAt: "2027-05-24", extractedPlate: "TM46MVP", valid: true },
      registration: {
        type: "Certificat inmatriculare",
        front: { type: "Talon fata", uploaded: true, fileName: "talon-fata-demo.jpg", cleanImage: true },
        back: { type: "Talon verso", uploaded: true, fileName: "talon-verso-demo.jpg", cleanImage: true },
        extractedPlate: "TM46MVP",
        extractedOwnerName: "IOANA MARINESCU",
        ownerName: "IOANA MARINESCU",
        vinLast6: "TM2026"
      },
      license: {
        type: "Permis conducere",
        front: { type: "Permis fata", uploaded: true, fileName: "permis-fata-demo.jpg", cleanImage: true },
        back: { type: "Permis verso", uploaded: true, fileName: "permis-verso-demo.jpg", cleanImage: true },
        holderName: "IOANA MARINESCU",
        categories: ["B"]
      },
      authorization: { type: "Imputernicire proprietar", required: false, uploaded: false, fileName: "", cleanImage: true, valid: true }
    },
    evidence: {
      retentionDays: EVIDENCE_RETENTION_DAYS,
      pickup: createEvidenceRecord("pickup", { name: "walkaround-preluare-demo.mp4", size: 18400000, type: "video/mp4" }),
      return: null
    },
    legal: {
      termsVersion: TERMS_VERSION,
      riskAccepted: true,
      acceptedAt: new Date().toISOString(),
      clauses: ["mandat_limitat_preluare_conducere_returnare", "rca_itp_talon_permis_confirmate", "imputernicire_proprietar_daca_solicitant_diferit", "inspectie_foto_pickup_retur", "gdpr_documente_fotografii_audit"]
    },
    inspections: [],
    supportSession: createEmptySupportSession(),
    events: [
      createEvent("courier_en_route", "Operatorul este in drum spre client."),
      createEvent("courier_assigned", "Operator asignat: Radu Stan."),
      createEvent("confirmed", "Comanda confirmata de operator."),
      createEvent("created", "Comanda a fost plasata de client.")
    ],
    createdAt: new Date().toISOString()
  };
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
