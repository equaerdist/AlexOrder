import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";

document.addEventListener("DOMContentLoaded", () => {
  const onEnter = (e) => {
    const dropbox = document.querySelector(".dropbox");
    dropbox.classList.add("dropbox_active");
  };
  function onClick(selector, slider, addSelector = "") {
    if (addSelector !== "") addSelector = "." + addSelector;
    const galleryButtons = document.querySelector(
      `${addSelector} .${selector}__buttons`
    );
    let info = slider.getInfo();
    const inside = galleryButtons.querySelectorAll("button");
    inside.forEach((item) =>
      item.classList.remove(`${selector}__button_active`)
    );
    if (info.index !== 0) inside[0].classList.add(`${selector}__button_active`);
    if (info.index + info.items !== info.slideCount)
      inside[1].classList.add(`${selector}__button_active`);
  }
  const onExit = (e) => {
    const dropbox = document.querySelector(".dropbox");
    dropbox.classList.remove("dropbox_active");
  };
  const turnOnMenu = (e) => {
    header.classList.add("active");
    mobileHeader.classList.add("active");
  };
  const turnOffMenu = (e) => {
    header.classList.remove("active");
    mobileHeader.classList.remove("active");
  };

  const header = document.querySelector(".header");
  const mobileHeader = document.querySelector(".mobile__header");
  const tic = document.querySelector(".header .mobile__burger");
  const burger = document.querySelector(".mobile__burger");
  let productLink = document.querySelector(".header .products-item");
  let counter = 0;

  tic.addEventListener("click", turnOffMenu);
  burger.addEventListener("click", turnOnMenu);
  productLink.addEventListener("mouseover", onEnter);
  productLink.addEventListener("mouseout", onExit);

  if (window.screen.width < 768) {
    productLink.addEventListener("click", (e) => {
      const dropboxing = document.querySelector(".dropbox");
      counter++;
      if (dropboxing.classList.contains("dropbox_active") && counter !== 1) {
        dropboxing.classList.add("animate__fadeOutUp");
        onExit();
        setTimeout(
          () => dropboxing.classList.remove("animate__fadeOutUp"),
          500
        );
        setTimeout(() => (dropboxing.style.cssText = "display:none"), 500);
        productLink.classList.remove("active");
      } else {
        console.log("not");
        productLink.classList.add("active");
        dropboxing.style.cssText = "display:flex";
        setTimeout(() => {
          dropboxing.classList.add("animate__fadeInDown");
          setTimeout(
            () => dropboxing.classList.remove("animate__fadeInDown"),
            500
          );
          onEnter();
        });
      }
    });
  } else {
    const dropboxing = document.querySelector(".dropbox");
    dropboxing.style.cssText = "display:flex";
  }
  let gutter;
  let page;
  let items;
  let infoPage = document
    .querySelector('meta[name="Page"]')
    .getAttribute("content");

  if (infoPage === "General") {
    page = "gallery";
    gutter = 27;
    items = 4;
  } else if (infoPage === "Collection") {
    page = "advantages";
    gutter = 31;
    items = 3;
    let sliderProduct = tns({
      container: `.gallery__slider`,
      items: 4,
      autoplayButtonOutput: false,
      autoplayButton: false,
      prevButton: `.gallery .left`,
      nextButton: `.gallery .right`,
      slideBy: 1,
      loop: false,
      nav: false,
      controlsContainer: `.gallery__buttons`,
      gutter: 27,
      autoplay: false,
      responsive: {
        320: {
          items: 2,
        },
        474: {
          arrowKeys: false,
          gutter: 23,
          items: 2,
        },
        882: {
          items: 3,
        },
        1232: {
          items: items,
        },
      },
    });

    const galleryButtons = document.querySelector(`.gallery__buttons`);
    galleryButtons.addEventListener("click", () =>
      onClick("gallery", sliderProduct)
    );
    onClick("gallery", sliderProduct);
  } else if (infoPage === "Photogallery") {
    const photogalleryBttons = document.querySelectorAll(".gallery__buttons");
    for (let i = 0; i < 4; i++) {
      let current;
      switch (i) {
        case 0:
          current = "first";
          break;
        case 1:
          current = "second";
          break;
        case 2:
          current = "third";
          break;
        case 3:
          current = "fourth";
          break;
      }
      let slider = tns({
        container: `.${current} .gallery__slider`,
        items: 5,
        autoplayButtonOutput: false,
        autoplayButton: false,
        prevButton: `.${current} .left`,
        nextButton: `.${current} .right`,
        slideBy: 1,
        loop: false,
        nav: false,
        controlsContainer: `.${current} .gallery__buttons`,
        gutter: 20,
        autoplay: false,
        responsive: {
          320: {
            items: 2,
            gutter: 15,
          },
          474: {
            arrowKeys: false,
            gutter: 23,
            items: 2,
          },
          670: {
            items: 3,
          },
          882: {
            items: 4,
          },
          1232: {
            items: 5,
          },
        },
      });
      photogalleryBttons[i].addEventListener("click", () =>
        onClick("gallery", slider, current)
      );
      onClick("gallery", slider, current);
    }
  }
  if (infoPage !== "Photogallery") {
    let slider = tns({
      container: `.${page}__slider`,
      items: items,
      autoplayButtonOutput: false,
      autoplayButton: false,
      prevButton: `.${page} .left`,
      nextButton: `.${page} .right`,
      slideBy: 1,
      loop: false,
      nav: false,
      controlsContainer: `.${page}__buttons`,
      gutter: gutter,
      autoplay: false,
      responsive: {
        320: {
          items: 2,
        },
        474: {
          arrowKeys: false,
          gutter: 23,
          items: 2,
        },
        882: {
          items: 3,
        },
        1232: {
          items: items,
        },
      },
    });
    const galleryButtons = document.querySelector(`.${page}__buttons`);
    galleryButtons.addEventListener("click", () => onClick(page, slider));

    onClick(page, slider);
  }
});
