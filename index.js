const cardContainer = document.querySelector(".card__container");
const pagination = document.querySelector(".pagination");

const productsPerPage = 12;
let totalPosts = 100;
let currentPages = 1;
let posts = [];

const fetchData = () => {
  const skip = (currentPages - 1) * productsPerPage;
  const url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const products = data.products;
      totalPosts = data.total;
      displayCards(products);
      setupPagination();
    })
    .catch((error) => console.error(error));
};

const displayCards = (products) => {
  cardContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("card__img");

    const img = document.createElement("img");
    img.src = product.images[0];

    imgContainer.appendChild(img);
    const infoBox = document.createElement("div");
    infoBox.classList.add("product__info");

    const textContainer = document.createElement("div");
    textContainer.classList.add("card__text");

    const title = document.createElement("div");
    title.classList.add("card__title");
    const titleHeading = document.createElement("h3");
    titleHeading.textContent = product.title;
    title.appendChild(titleHeading);

    const category = document.createElement("div");
    category.classList.add("card__category");
    const categoryHeading = document.createElement("h6");
    categoryHeading.textContent = product.category;
    category.appendChild(categoryHeading);

    const description = document.createElement("div");
    description.classList.add("card__description");
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = product.description;
    description.appendChild(descriptionParagraph);

    textContainer.appendChild(category);
    textContainer.appendChild(title);
    textContainer.appendChild(description);

    const activity = document.createElement("div");
    activity.classList.add("card__activity");

    const person = document.createElement("div");
    person.classList.add("card__activity__person");

    activity.appendChild(person);

    infoBox.appendChild(textContainer);
    infoBox.appendChild(activity);

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("person__img");
    const personImg = document.createElement("img");
    personImg.src = product.images[0];
    mediaContainer.appendChild(personImg);

    const personInfo = document.createElement("div");
    personInfo.classList.add("personInfo");
    const personName = document.createElement("span");
    personName.textContent = "Walter Pinkman";

    const date = document.createElement("span");
    date.textContent = "24 Nov, 2022";

    personInfo.appendChild(personName);
    personInfo.appendChild(date);

    person.appendChild(mediaContainer);
    person.appendChild(personInfo);

    activity.appendChild(person);

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("card__activity__icons");

    // Append the icons container to the activity element
    activity.appendChild(iconsContainer);

    textContainer.appendChild(category);
    textContainer.appendChild(title);
    textContainer.appendChild(description);

    card.appendChild(imgContainer);
    card.appendChild(textContainer);
    card.appendChild(activity);

    cardContainer.appendChild(card);

    // Add event listener to title
    title.addEventListener("click", () => {
      openModal(product);
    });
  });
};

const openModal = (product) => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");

  const closeModalBtn = document.createElement("button");
  closeModalBtn.classList.add("close__modal");
  closeModalBtn.innerHTML = "×";

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("modal__img");

  const img = document.createElement("img");
  img.src = product.images[0];

  imgContainer.appendChild(img);

  const textContainer = document.createElement("div");
  textContainer.classList.add("modal__text");

  const category = document.createElement("h6");
  category.classList.add("modal__category");
  category.textContent = product.category;

  const title = document.createElement("h3");
  title.classList.add("modal__title");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.classList.add("modal__description");
  description.textContent = product.description;

  const activity = document.createElement("div");
  activity.classList.add("modal__activity");

  const person = document.createElement("div");
  person.classList.add("modal__activity__person");

  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("person__img");
  const personImg = document.createElement("img");
  personImg.src = product.images[0];
  mediaContainer.appendChild(personImg);

  const productPrice = document.createElement("h3");
  productPrice.classList.add("ProductPrice");
  productPrice.textContent = `Price: ${product.price}$`;

  modalContent.appendChild(productPrice);

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("modal__activity__icons");

  // Append the icons container to the activity element
  activity.appendChild(iconsContainer);

  textContainer.appendChild(category);
  textContainer.appendChild(title);
  textContainer.appendChild(description);
  textContainer.appendChild(productPrice);

  modalContent.appendChild(closeModalBtn);
  modalContent.appendChild(imgContainer);
  modalContent.appendChild(textContainer);
  modalContent.appendChild(activity);

  modalContainer.appendChild(modalContent);
  const addBtn = document.createElement("div");
  addBtn.classList.add("modal__button");
  addBtn.textContent = "Add Product";
  modalContent.appendChild(addBtn);
  addBtn.addEventListener("click", function () {
    prompt("The User is not Authorized!");
  });
  // Add event listener to close modal button
  closeModalBtn.addEventListener("click", () => {
    modalContainer.remove();
  });

  // Append the modal to the body
  document.body.appendChild(modalContainer);
};

const setupPagination = () => {
  const totalPages = Math.ceil(totalPosts / productsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement("span");
    page.classList.add("pageNum");
    page.textContent = i;
    if (i === currentPages) {
      page.classList.add("active");
    }

    page.addEventListener("click", () => {
      currentPages = i;
      fetchData();
    });

    pagination.appendChild(page);
  }
};

fetchData();

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav_header");
const navMenu = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("nav-active");
  navMenu.classList.toggle("nav-active");
});

const loginButton = document.querySelector(".login_button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");

loginButton.addEventListener("click", function () {
  popup.style.display = "flex";
});
closeButton.addEventListener("click", () => {
  popup.style.display = "none";
});

const enterEmail = document.querySelector(".inputBtn");

enterEmail.addEventListener("click", function () {
  prompt("Please enter Email");
});
