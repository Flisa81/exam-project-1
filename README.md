# ✂️ Felicia – Needle and Thread | FED1 PE1

Welcome to *Felicia – Needle and Thread*, a responsive front-end web application created for the FED1 Practical Exam. This project is a blog interface that lets users view posts, and allows the blog owner to log in, create, edit, and delete blog posts using a public blogging API.

---

## 🌐 Live Site

[https://flisa81.github.io/exam-project-1/](https://flisa81.github.io/exam-project-1/)

---

## 📁 Repository

🔗 **GitHub Repo:**  
[https://github.com/Flisa81/exam-project-1](https://github.com/Flisa81/exam-project-1)

---

## 🖥️ Features

- Responsive layout (mobile + desktop)
- Carousel displaying 3 latest blog posts
- Grid of 12 blog post thumbnails
- View single post page with shareable link
- Login/Register functionality with token storage
- Create/Edit/Delete blog posts (owner only)
- Form validation
- API integration (GET, POST, PUT, DELETE)

---

## 🛠️ Tech Stack

- HTML5  
- CSS3 (Custom with no frameworks)  
- Vanilla JavaScript  
- Figma (Design + Style Guide)  
- GitHub Projects (Roadmap view)  
- Netlify (Deployment)

---

## 🚀 How to Run Locally

1. Clone the repository  
   `git clone https://github.com/Flisa81/exam-project-1.git`

2. Open `index.html` in your browser  
   or serve via Live Server in VS Code


---

## 🎨 Figma Prototype (Desktop + Mobile)

🔗 [Click to view prototype](https://www.figma.com/proto/EYCk7RM7QG1TPDbWa9JmL0/Felicia-%E2%80%93-Needle-and-Thread-%7C-FED1-Project?node-id=1-237&t=KV4LenzzmdWv3T2m-1)

---

## ✅ Project Planning Board

🔗 **GitHub Project Board (Roadmap view):**  
https://github.com/orgs/NoroffFEU/projects/406/views/1
---

## 📷 Image Credits

Images from [Pexels.com](https://www.pexels.com) and [Unsplash.com](https://unsplash.com):

- [Wallace Chuck](https://www.pexels.com/nb-no/bilde/person-hender-kreativ-arbeide-2973392/)
- [Alex Andrews](https://www.pexels.com/nb-no/bilde/821735/)
- [Wallace Chuck](https://www.pexels.com/nb-no/bilde/person-hender-arbeide-metall-2973399/)
- [Leticia Ribeiro](https://www.pexels.com/nb-no/bilde/2249290/)
- [Madison Inouye](https://www.pexels.com/nb-no/bilde/1937336/)
- [Ron Lach](https://www.pexels.com/photo/woman-checking-a-shirt-7776137/)
- [Tima Miroshnichenko](https://www.pexels.com/photo/tailor-at-work-6764943/)
- Photo by J Williams (Unsplash)
- Photo by Annie Spratt (Unsplash)
- [Pixabay](https://www.pexels.com/photo/close-up-of-row-325876/)
- [cottonbro studio](https://www.pexels.com/photo/person-hand-embroidering-on-black-textile-3838689/)
- [Ron Lach – Studio Interior](https://www.pexels.com/photo/interior-of-fashion-designer-studio-9849657/)
- [PNW Production](https://www.pexels.com/photo/a-blazer-and-a-purse-hanging-9218538/)
- [Los Muertos Crew – Cutting](https://www.pexels.com/photo/a-person-cutting-a-fabric-7998238/)
- [Los Muertos Crew – Sewing](https://www.pexels.com/photo/a-person-wearing-a-diamond-ring-using-a-sewing-machine-7998338/)

---

## 🧵 Icon Credits

Icons from [Flaticon](https://www.flaticon.com):

- [Sew icons by Freepik](https://www.flaticon.com/free-icons/sew)
- [Thread icons by Freepik](https://www.flaticon.com/free-icons/thread)
- [Scissors icons by smashingstocks](https://www.flaticon.com/free-icons/scissors)

---

## 🖼️ Logo Credit

- Logo from **Vector Stock**

---

## 🤖 Code Assistance Disclosure

Some parts of the logic (e.g., carousel functionality, form validation, login token handling) were guided by AI assistance, 
Book: Flanagan, D. (2020). JavaScript: The Definitive Guide (7th ed.). O'Reilly Media.

---

## ⚠️ Known Issues / Areas for Improvement

- Image media URLs were challenging to manage, and some images do not load or link correctly.
- The `post/index.html` page does not display dynamic blog post content as intended — due to issues with URL structure and post ID handling.
- Time spent debugging API/media issues limited polish on some layouts and features.

Despite this, all required pages are responsive, and core functionality is present and working.

---

## 📬 Final Submission Includes

- GitHub repository ✅  
- Netlify live site ✅  
- Figma prototype file ✅  
- GitHub project board with Roadmap view ✅  
- Admin login credentials ✅  

---

> © 2025 – FED1 Practical Exam Project – Flisa81

## Latest Fix
- Improved persistent login display across Home, About, Contact, Feed, and Create Post pages.
- Made the auth navigation more robust by reading saved user data safely from localStorage.
- Fixed Create Post page so it does not show the logged-out navigation when the user is already authenticated.
