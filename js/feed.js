(() => {
  const API_BASE = "https://v2.api.noroff.dev";
  const postsContainer = document.getElementById("posts");
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const fallbackImages = [
    "assets/blog/handmade.jpg",
    "assets/blog/thread.jpg",
    "assets/blog/sewing-machine-closeup.jpg",
    "assets/blog/clothing.jpg",
    "assets/blog/cottonbro.jpg",
    "assets/blog/detail.jpg",
    "assets/blog/fabric.jpg",
    "assets/blog/needle-thread.jpg",
    "assets/blog/tailor-1.jpg",
    "assets/blog/tailor-2.jpg"
  ];

  const fallbackPosts = [
    { title: "Handmade Joy", body: "Small handmade details that make each project feel personal.", media: { url: fallbackImages[0], alt: "Handmade clothing on a rack" }, author: { name: "felicia_thread" } },
    { title: "Thread Talk", body: "Choosing thread colors and textures for sewing projects.", media: { url: fallbackImages[1], alt: "Thread storage and sewing supplies" }, author: { name: "felicia_thread" } },
    { title: "Threading the Needle", body: "A closer look at machine stitching and careful preparation.", media: { url: fallbackImages[2], alt: "Close-up of a sewing machine" }, author: { name: "felicia_thread" } },
    { title: "Colorful Fabrics", body: "Fabric choices can change the entire mood of a handmade piece.", media: { url: fallbackImages[3], alt: "Fabric and sewing work" }, author: { name: "felicia_thread" } },
    { title: "Needle and Thread", body: "Simple sewing tools can create beautiful handmade results.", media: { url: fallbackImages[7], alt: "Needle and thread close-up" }, author: { name: "felicia_thread" } },
    { title: "Sewing Accessories", body: "A practical look at measuring, cutting, and finishing tools.", media: { url: fallbackImages[8], alt: "Tailor working with sewing accessories" }, author: { name: "felicia_thread" } }
  ];

  function normalizeImageUrl(url) {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();

    const imgurMatch = trimmed.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)\/?$/);
    if (imgurMatch) {
      return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
    }

    return trimmed;
  }

  function getPostImage(post, index) {
    const media = post.media;
    let mediaUrl = "";
    let mediaAlt = post.title || "Sewing blog post image";

    if (Array.isArray(media) && media.length > 0) {
      mediaUrl = media[0]?.url || "";
      mediaAlt = media[0]?.alt || mediaAlt;
    } else if (media && typeof media === "object") {
      mediaUrl = media.url || "";
      mediaAlt = media.alt || mediaAlt;
    } else if (typeof media === "string") {
      mediaUrl = media;
    }

    return {
      url: normalizeImageUrl(mediaUrl) || fallbackImages[index % fallbackImages.length],
      alt: mediaAlt
    };
  }

  function escapeHTML(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderPosts(posts, isFallback = false) {
    postsContainer.innerHTML = "";

    if (isFallback) {
      const notice = document.createElement("p");
      notice.className = "feed-notice";
      notice.textContent = "Log in to view live API posts. Showing sample sewing posts for now.";
      postsContainer.before(notice);
    }

    posts.forEach((post, index) => {
      const isOwner = loggedInUser && loggedInUser.name === post.author?.name;
      const image = getPostImage(post, index);
      const postEl = document.createElement("article");
      postEl.classList.add("post");

      const postLink = post.id ? `./post/index.html?id=${encodeURIComponent(post.id)}` : "#";

      postEl.innerHTML = `
        <img src="${escapeHTML(image.url)}" alt="${escapeHTML(image.alt)}" loading="lazy" onerror="this.onerror=null; this.src='assets/blog/handmade.jpg';" />
        <div class="post-content">
          <h3>${escapeHTML(post.title || "Untitled post")}</h3>
          <p>${escapeHTML(post.body || "No description added yet.").slice(0, 160)}${post.body && post.body.length > 160 ? "..." : ""}</p>
          <p class="post-author"><strong>Author:</strong> ${escapeHTML(post.author?.name || "Unknown")}</p>
          <div class="post-actions">
            <a href="${postLink}" class="view-link">View Post</a>
            ${isOwner && post.id ? `<a href="./post/edit.html?id=${encodeURIComponent(post.id)}" class="edit-link">Edit Post</a>` : ""}
          </div>
        </div>
      `;

      postsContainer.appendChild(postEl);
    });
  }

  async function loadPosts() {
    if (!postsContainer) return;

    if (!token || !apiKey) {
      renderPosts(fallbackPosts, true);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/social/posts?_author=true&_sort=created&sortOrder=desc`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey
        }
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.errors?.[0]?.message || "Failed to fetch posts");

      const posts = result.data || [];
      if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet. Be the first to create one.</p>";
        return;
      }

      renderPosts(posts);
    } catch (err) {
      console.error("Error loading posts:", err);
      renderPosts(fallbackPosts, true);
    }
  }

  document.addEventListener("DOMContentLoaded", loadPosts);
})();
