// Mobile menu functionalities
const openMenuBtn = document.getElementById('open-menu');
const menu = document.querySelector('nav');
const closeMenuBtn = document.getElementById('close-menu');

openMenuBtn.addEventListener('click', () => {
  menu.style.transition = "all 0.3s ease-out";
  menu.style.transform = "scaleY(1)";
  menu.querySelectorAll('li').forEach(li => {li.style.opacity = '1'});
  openMenuBtn.style.display = 'none';
  closeMenuBtn.style.display = 'block';
});

closeMenuBtn.addEventListener('click', () => {
  menu.querySelectorAll('li').forEach(li => {li.style.opacity = '0'});
  setTimeout(() => {
    menu.style.transform = 'scaleY(0)';
    closeMenuBtn.style.display = 'none';
    openMenuBtn.style.display = 'block';
  }, 200);
});

// Bookmark checkbox
const bookmarkButton = document.getElementById('bookmark-container');
const checkBox = document.getElementById('bookmark');

bookmarkButton.addEventListener('click', () => {
  if (!checkBox.checked) {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
});

// set buttons and modal functionalities
// first grab some references to the dom elements needed
const mainButtons = document.querySelectorAll("main button");
const modal = document.querySelector(".modals");
const backingModal = document.querySelector(".backing-modal");
const modalOptions = document.querySelector(".modal-options");
const selectedOptions = document.querySelectorAll(".modal-options .backing-option");
const closeModal = document.getElementById("close-modal");
const optionButtons = document.querySelectorAll(".modal-options button");
const greetingModal = document.querySelector(".greeting");
const done = document.getElementById("done");


mainButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let option = button.getAttribute("data-option");
    openModal(option); //open options modal when clicking on any of the buttons in the main section
  });
});

function openModal(option) {
  modal.style.top = "0";
  modal.style.opacity = "1";
  backingModal.classList.add("active");
  modalOptions.classList.add("active");
  let selected = document.querySelector(
    '.backing-option[data-option="' + option + '"]'
  ); // grab reference to the selected element when clicking the button
  selected.focus(); // focus on that option when the modal opens
}

selectedOptions.forEach((option) => {
  option.addEventListener("focus", () => {
    option.querySelector('input[type="radio"]').checked = true;
  });
});

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let option = parseFloat(button.getAttribute("data-option"));
    let input = document.querySelector('input[data-option="' + option + '"]');
    let pledge = parseFloat(input.value);
    totalAchieved += pledge;
    totalBackers += 1;
    optionRemainings[option] -= 1;
    actualizeProject();
    displayGreeting();
  });
});

// Closing modal
done.addEventListener("click", modalOut);
closeModal.addEventListener("click", modalOut);

function modalOut() {
  modal.style.opacity = "0";
  setTimeout(() => {
    backingModal.classList.remove("active");
    modalOptions.classList.remove("active");
    greetingModal.classList.remove("active");
    modal.style.top = "-100%";
  }, 400);
}

// Set the actualize the dynamic values when submitting a pledge
// grab reference to the elements with dynamic content
const backed = document.getElementById("backed");
const backers = document.getElementById("backers");
const fundingMeter = document.getElementById("funding-meter");
const optionOneLeft = document.querySelectorAll('[data-left="1"]');
const optionTwoLeft = document.querySelectorAll('[data-left="2"]');

// Set variables needed to display the correct data about the project state
let totalAchieved = 89014;
let totalBackers = 5007;
let optionRemainings = [0, 101, 64];

function actualizeProject() {
  backed.textContent = `$${(totalAchieved / 1000).toFixed(3)}`;
  backers.textContent = `${(totalBackers / 1000).toFixed(3)}`;
  fundingMeter.value = totalAchieved;
  optionOneLeft.forEach((option) => {
    option.innerHTML = `${optionRemainings[1]}<span> left</span>`;
  });
  optionTwoLeft.forEach((option) => {
    option.innerHTML = `${optionRemainings[2]}<span> left</span>`;
  });
}

function displayGreeting() {
  backingModal.classList.remove("active");
  modalOptions.classList.remove("active");
  greetingModal.classList.add("active");
}
