import { useEffect, useRef, useState } from "react";
import carousel1 from "../media/images/carousel1.jpg";
import carousel2 from "../media/images/carousel2.jpg";
import carousel3 from "../media/images/carousel3.jpg";

const Slideshow = () => {
    const imageUrls = [carousel1, carousel2, carousel3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRefs = useRef([]);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % imageUrls.length);
    };

    useEffect(() => {

        const currentImage = imageRefs.current[currentIndex];
        const previousImage = imageRefs.current[(currentIndex - 1 + imageUrls.length) % imageUrls.length];
        previousImage.style.opacity = 0;
        previousImage.style.filter = "blur(10px)";
        currentImage.style.opacity = 1;
        currentImage.style.transition = "opacity 1s";
        currentImage.style.filter = "blur(0)";

        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="relative top-0 left-0 w-full h-[1200px] flex items-center justify-center">
                {imageUrls.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        ref={(el) => (imageRefs.current[index] = el)}
                        alt="slide"
                        className={`w-full h-full object-cover absolute filter blur-md transition-all ${
                            index === currentIndex ? "opacity-1" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
