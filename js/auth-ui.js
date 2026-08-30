(() => {
  const userGreeting = document.getElementById("user-greeting");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const createPostLink = document.getElementById("create-post-link");
  const feedLink = document.getElementById("feed-link");

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const isInAccountFolder = window.location.pathname.includes("/account/");
  const isInPostFolder = window.location.pathname.includes("/post/");
  const rootPrefix = isInAccountFolder || isInPostFolder ? "../" : "";

  if (loginLink && !loginLink.getAttribute("href")?.startsWith("http")) {
    loginLink.href = `${rootPrefix}account/login.html`;
  }
  if (createPostLink && !createPostLink.getAttribute("href")?.startsWith("http")) {
    createPostLink.href = `${rootPrefix}post/create.html`;
  }
  if (feedLink && !feedLink.getAttribute("href")?.startsWith("http")) {
    feedLink.href = `${rootPrefix}feed.html`;
  }

  if (currentUser) {
    if (userGreeting) userGreeting.textContent = `Welcome, ${currentUser.name}`;
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline-block";
    if (createPostLink) createPostLink.style.display = "inline-block";
    if (feedLink) feedLink.style.display = "inline-block";

    logoutLink?.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("apiKey");
      window.location.href = `${rootPrefix}index.html`;
    });
  } else {
    if (userGreeting) userGreeting.textContent = "";
    if (loginLink) loginLink.style.display = "inline-block";
    if (createPostLink) createPostLink.style.display = "none";
    if (feedLink) feedLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "none";
  }
})();
