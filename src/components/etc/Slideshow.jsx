import { useEffect, useRef, useState } from "react";

const Slideshow = () => {
    const imageUrls = ["https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/carousel1.e577d66d541f78139cb8.jpg?t=2024-07-03T11%3A32%3A47.427Z", "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/carousel2.0d1968599086f1b61e2e.jpg?t=2024-07-03T11%3A32%3A53.921Z", "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/carousel3.81ae70584e366e279ad6.jpg?t=2024-07-03T11%3A33%3A00.102Z"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRefs = useRef([]);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % imageUrls.length);
    };

    useEffect(() => {

        const currentImage = imageRefs.current[currentIndex];
        const previousImage = imageRefs.current[(currentIndex - 1 + imageUrls.length) % imageUrls.length];
        previousImage.style.opacity = 0;
        previousImage.style.filter = "blur(3px)";
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
            <div className="relative top-0 left-0 w-full lg:h-[1200px] h-[600px] flex items-center justify-center">
                {imageUrls.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        ref={(el) => (imageRefs.current[index] = el)}
                        alt="slide"
                        className={`w-full h-full object-cover absolute filter blur-sm transition-all ${
                            index === currentIndex ? "opacity-1" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
