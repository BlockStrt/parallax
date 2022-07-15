
const pixelTag = document.querySelector("div.pixels")
const bodyTag = document.querySelector("body")
const progressTag = document.querySelector("div.progress")
const sections = document.querySelectorAll("section")
const clientTag = document.querySelector("div.client")
const pageTag = document.querySelector("div.page")
const headerTag = document.querySelector("header")

//When scrolling page update pixels tag to be how far scrolled

document.addEventListener("scroll", function(){
  const pixels = window.pageYOffset

  pixelTag.innerHTML = pixels 
})

//when we scrolll page make progress bar that keeps track of distance
document.addEventListener("scroll", function(){
  const pixels = window.pageYOffset;
  const pageHeight = bodyTag.getBoundingClientRect().height
  const totalScrollableDistance = pageHeight - window.innerHeight

  const percentage = pixels / totalScrollableDistance
   
  progressTag.style.width = `${100 * percentage}%`
})

// when we scroll page, see how far down the page we've scrolled
// then for each section check whether we passed it
// update header
document.addEventListener("scroll", function(){
  const pixels = window.pageYOffset


  sections.forEach(section => {
    if (section.offsetTop - 100 <= pixels) {
     clientTag.innerHTML = section.getAttribute("data-client") // Threshole making progress bar and dark color fade light to dark
     pageTag.innerHTML = section.getAttribute("data-page")     //grabbing atribute data

     if (section.hasAttribute("data-is-dark")){
        headerTag.classList.add("white")
        progressTag.classList.add("white")
     } else {
       headerTag.classList.remove("white")
       progressTag.classList.remove("white")
     }
    }
  })
})

//when we scroll page make things parallax
//we want to move certain ags based on how far they are from anchor point
//anchor point? middle of the section
//how far should we parallax? its a ratio of the middle distance scrolled to middle of the anchor

document.addEventListener("scroll", function(){
  const topViewport = window.pageYOffset
  const midViewport = topViewport + (window.innerHeight / 2)

  sections.forEach(section => {
    const topSection = section.offsetTop
    const midSection = topSection + (section.offsetHeight / 6)
    
    const distanceToSection = midViewport - midSection
    
    const parallaxTags = section.querySelectorAll(`[data-parallax]`)

    //loop over each parallax tag
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute("data-parallax"))
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`
    })
  })
})
