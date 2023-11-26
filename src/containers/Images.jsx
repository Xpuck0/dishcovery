import { useRef } from "react";

import checkImageExists from "../utils/imageUtils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

import "./Images.css"

export default function Images({ images }) {
    const sliderRef = useRef(null);
    const scrollAmount = 100;

    return (
        <div className="images">
            {/* Left navigation button */}
            < button
                className="nav-btn"
                onClick={() => {
                    const container = sliderRef.current;
                    container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
                }
                }
            >
                {/* <ChevronLeftIcon /> */}
                <FaChevronLeft />
            </button >
            {/* Image container */}
            < div className="images-container" ref={sliderRef} >
                {
                    images.filter(img => checkImageExists(img)).map((image) => {
                        return (
                            <img
                                className="image"
                                alt="sliderImage"
                                key={image}
                                src={image}
                            />
                        );
                    })
                }
            </div >
            {/* Right navigation button */}
            < button
                className="nav-btn"
                onClick={() => {
                    const container = sliderRef.current;
                    container.scrollLeft += scrollAmount; // Scroll right by the specified amount
                }}
            >
                <FaChevronRight/>
            </button >
        </div>

    )
}