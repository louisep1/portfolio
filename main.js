// Fade on scroll effect:
const fadeSection = document.querySelectorAll('.fade-on-scroll')

const fadeOnScroll = () => {
  fadeSection.forEach(section => {
    if (section.getBoundingClientRect().top <= (window.innerHeight / 5) * 4) {
      section.classList.add('appear')
    }
  })
}

// Call once before listener, to make sure no blank spaces where scroll break-points met on page load
fadeOnScroll()

window.addEventListener('scroll', fadeOnScroll)

// Expandable/drop down sections:
const click = document.querySelectorAll('#click')
const hide = document.querySelectorAll('.hide')
const icon = document.querySelectorAll('.drop .fa-chevron-down')

window.addEventListener('load', () => {
  click.forEach((clickItem, i) => {
    if (hide[i].className.includes('open')) {
      icon[i].style.transform = 'rotate(180deg)'
    }
  })
})

click.forEach((clickItem, i) => {
  clickItem.addEventListener('click', () => {
    if (hide[i].className.includes('open')) {
      icon[i].style.transform = 'rotate(0deg)'
      hide[i].classList = 'hide closed'
      return
    }

    if (hide[i].className.includes('closed')) {
      if (hide[i].style.maxHeight) {
        icon[i].style.transform = 'rotate(0deg)'
        hide[i].style.maxHeight = null
      } else {
        icon[i].style.transform = 'rotate(180deg)'
        hide[i].style.maxHeight = '200rem'
      }
    }
    return
  })
})

// Slider section:
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const slides = document.querySelectorAll('.slide-project')

let count = 0

const updateDisplay = position => {
  slides.forEach((slide, i) =>
    i === position
      ? slide.classList.add('show-slide')
      : slide.classList.remove('show-slide')
  )
}

left.addEventListener('click', () => {
  count = count - 1 === -1 ? slides.length - 1 : count - 1
  updateDisplay(count)
})

right.addEventListener('click', () => {
  count = count + 1 === slides.length ? 0 : count + 1
  updateDisplay(count)
})

// Adding left and right swipe functionality to slider:
const slideArea = document.querySelector('.slider')
let start = 0
let end = 0

slideArea.addEventListener(
  'touchstart',
  e => (start = e.changedTouches[0].screenX)
)

slideArea.addEventListener('touchend', e => {
  // First, check the location of the start of swipe is not in the slideArea of the left/right arrows
  if (
    start > left.getBoundingClientRect().right &&
    start < right.getBoundingClientRect().left
  ) {
    end = e.changedTouches[0].screenX

    count =
      start > end && count - 1 === -1
        ? slides.length - 1
        : start > end
        ? count - 1
        : count + 1 === slides.length
        ? 0
        : start < end
        ? count + 1
        : count

    updateDisplay(count)
  }

  start = 0
})
