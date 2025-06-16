const userGreeting = document.getElementById("user-greeting");
const loginLink = document.getElementById("login-link");
const logoutLink = document.getElementById("logout-link");
const nav = document.querySelector(".main-nav");

const userData = JSON.parse(localStorage.getItem("user"));

function injectNavLinks() {
  if (!nav) {
    console.warn("⚠️ .main-nav not found.");
    return;
  }

  const isSubPage = location.pathname.includes("/post/") || location.pathname.includes("/account/");
  const prefix = isSubPage ? "../" : "./";

  console.log("✅ Injecting nav links with prefix:", prefix);

  // Inject Create Post link
  if (!document.getElementById("create-link")) {
    const createLink = document.createElement("a");
    createLink.href = `${prefix}post/create.html`;
    createLink.textContent = "Create Post";
    createLink.id = "create-link";
    nav.appendChild(createLink);
  }

  // Inject Feed link
  if (!document.getElementById("feed-link")) {
    const feedLink = document.createElement("a");
    feedLink.href = `${prefix}index.html`;
    feedLink.textContent = "Feed";
    feedLink.id = "feed-link";
    nav.appendChild(feedLink);
  }
}

if (userData?.name) {
  console.log("✅ Logged in as:", userData.name);
  if (userGreeting) userGreeting.textContent = `Welcome, ${userData.name}`;
  if (loginLink) loginLink.style.display = "none";
  if (logoutLink) logoutLink.style.display = "inline";

  injectNavLinks();
} else {
  console.log("🛑 Not logged in.");
  if (logoutLink) logoutLink.style.display = "none";
  if (loginLink) loginLink.style.display = "inline";
}

if (logoutLink) {
  logoutLink.addEventListener("click", () => {
    localStorage.clear();
    alert("Logged out successfully.");
    const isSubPage = location.pathname.includes("/post/") || location.pathname.includes("/account/");
    window.location.href = isSubPage ? "../index.html" : "./index.html";
  });
}
