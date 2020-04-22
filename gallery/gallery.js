new Swiper(".swiper-container",{
    speed: 400,
    spaceBetween: 100,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector('.brand');
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, 'mousedown touchstart')
  .start((e) => {
    e.preventDefault();
    pointer(ballXY.get()).start(ballXY);
  });

listen(document, 'mouseup touchend')
  .start(() => {
    spring({
      from: ballXY.get(),
      velocity: ballXY.getVelocity(),
      to: { x: 0, y: 0 },
      stiffness: 200,
      // mass: 1,
      // damping: 10
    }).start(ballXY);
  });

/* const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const galleryImgs = document.querySelectorAll('.gallery-img');
let current = 0;

prevBtn.addEventListener('click', function(){
    galleryImgs[current].classList.remove("active");
    current--;
    galleryImgs[current].classList.add("active");
    nextBtn.disabled = false;
    if(current === 0) prevBtn.disabled = true;
});

nextBtn.addEventListener('click', function(){
    galleryImgs[current].classList.remove("active");
    current++;
    galleryImgs[current].classList.add("active");
    prevBtn.disabled = false;
    if(galleryImgs.length === current + 1) nextBtn.disabled = true;
}); */