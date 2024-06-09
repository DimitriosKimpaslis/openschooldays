import { useEffect, useState } from "react";
import carousel1 from "../media/images/carousel1.jpg";
import carousel2 from "../media/images/carousel2.jpg";
import carousel3 from "../media/images/carousel3.jpg";


const Slideshow = () => {
    const imageUrls = [carousel1, carousel2, carousel3]
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % imageUrls.length)

    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 6000)
        return () => clearInterval(interval)
    }, [currentIndex])

    useEffect(() => {
        const image1 = document.getElementById(1)
        const image2 = document.getElementById(2)
        const image0 = document.getElementById(0)
        const imageElements = [image0, image1, image2]

        imageElements.forEach((img) => {
            img.style.opacity = 0
        })
        const currentImage = document.getElementById(currentIndex)
        currentImage.style.opacity = 1
        currentImage.style.transition = 'opacity 1s'
        currentImage.style.filter = 'blur(0)'
    }
        
    , [currentIndex])

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="relative top-0 left-0 w-full h-[1200px] flex items-center justify-center">
                <img src={imageUrls[1]} id={1} alt="slide" className="w-full h-full object-cover absolute filter blur-md transition-all opacity-0" />
                <img src={imageUrls[2]} id={2} alt="slide" className="w-full h-full object-cover absolute filter blur-md transition-all opacity-0" />
                <img src={imageUrls[0]} id={0} alt="slide" className="w-full h-full object-cover absolute transition-all " />

            </div>
        </div>

    );
}

export default Slideshow;
