const ILLEGAL_CATEGORY_URLS = [
    "/categories/gambling",
    "/categories/gambling/slots",
    "/categories/irl/pools-hot-tubs-bikinis",
    "/categories/games/pools-hot-tubs-bikinis",
    "/categories/games/slots",
];

const ILLEGAL_CATEGORY_NAMES = ["Pools, Hot Tubs & Bikinis", "Slots & Casino"];

// Variables for class names
const CAROUSEL_CLASS_NAME = "carousel__slide";
const CATEGORY_CLASS_NAME = "subcategory-card";
const CARD_CLASS_NAME = "card-content";
const SIDEBAR_CLASS_NAME = "sidebar-item";
const SIDEBAR_CATEGORY_CLASS_NAME = "item-categories";
const CLIP_CLASS_NAME =
    "rounded p-2 transition-all duration-300 ease-trail hover:bg-secondary-lighter";

function hasLinkWithUrl(element) {
    const linkElements = element.querySelectorAll("a");
    for (let i = 0; i < linkElements.length; i++) {
        // Check if the link contains any part of the over 18 categories
        if (
            ILLEGAL_CATEGORY_URLS.some((category) =>
                linkElements[i].href.includes(category)
            )
        ) {
            return true;
        }
    }
    return false;
}

function hasElementWithText(element) {
    // Grab all elements with the class "item-categories"
    const categoryElements = element.getElementsByClassName(
        SIDEBAR_CATEGORY_CLASS_NAME
    );
    for (let i = 0; i < categoryElements.length; i++) {
        // Check if the element contains any part of the over 18 categories
        if (
            ILLEGAL_CATEGORY_NAMES.some((category) =>
                categoryElements[i].textContent.includes(category)
            )
        ) {
            return true;
        }
    }
    return false;
}

// Function to modify carousel elements
function modifyCarouselElements() {
    const carouselElements =
        document.getElementsByClassName(CAROUSEL_CLASS_NAME);
    Array.from(carouselElements).forEach((element) => {
        if (hasLinkWithUrl(element)) {
            // remove the carousel element
            element.remove();
        }
    });
}

function modifyCategoryElements() {
    const categoryElements =
        document.getElementsByClassName(CATEGORY_CLASS_NAME);
    Array.from(categoryElements).forEach((element) => {
        if (hasLinkWithUrl(element)) {
            // replace it with a cheeky message
            element.innerHTML =
                "<h1 class='text-2xl font-bold text-center m-auto'>Removed for your viewing pleasure.</h1>";
        }
    });
}

function modifyCardElements() {
    const cardElements = document.getElementsByClassName(CARD_CLASS_NAME);
    Array.from(cardElements).forEach((element) => {
        if (hasLinkWithUrl(element)) {
            // remove the card element
            element.remove();
        }
    });
}

function modifySidebarElements() {
    const sidebarElements = document.getElementsByClassName(SIDEBAR_CLASS_NAME);
    Array.from(sidebarElements).forEach((element) => {
        if (hasElementWithText(element)) {
            // blur the sidebar element
            element.style.filter = "blur(5px)";
            // make it unclickable
            element.style.pointerEvents = "none";
        }
    });
}

function modifyClipElements() {
    const clipElements = document.getElementsByClassName(CLIP_CLASS_NAME);
    // console.log(clipElements)
    Array.from(clipElements).forEach((element) => {
        if (hasLinkWithUrl(element)) {
            // remove the clip element
            element.remove();
        }
    });
}

// Callback function for MutationObserver
function handleMutation(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            modifyCarouselElements();
            modifyCategoryElements();
            modifyCardElements();
            modifySidebarElements();
            modifyClipElements();
        }
    }
}

// Create a MutationObserver instance
const observer = new MutationObserver(handleMutation);

// Start observing modifys in the DOM
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

modifyCarouselElements();
modifyCategoryElements();
modifyCardElements();
modifySidebarElements();
modifyClipElements();
