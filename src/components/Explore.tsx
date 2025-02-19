import './Explore.css'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

function Explore() {
    return (
        <div className='max-w-6xl'>
            <div className='text-4xl text-white mt-10 ml-8 heading-override'>
                <h1 className="inline-block font-semibold">Projects</h1>
            </div>
            <div className='w-48'>
                <hr className="w-full mt-3 ml-8 mb-10" />
            </div>
            <div className='mt-10 ml-8 mr-8 mb-4'>
                <h1 className='text-3xl text-white'>
                    <a className='a-override' href='https://github.com/fj-corp/Efficient-Data-Stream-Anomaly-Detection'>Real time data stream anomaly detection</a>
                </h1>
                <p className='mt-6 break-words'>
                    <span className='text-white'>This is a real-time anomaly detection system that processes data streams on the fly. It simulates noisy 
                        seasonal data and identifies anomalies using a combination of Z-score and Exponential Moving Average (EMA), making it more 
                        adaptable than traditional methods. Unlike Local Outlier Factor (LOF), it captures subtle changes that might go unnoticed. 
                        It’s built from scratch without SciPy, providing an efficient and mathematically transparent approach to anomaly detection.
                        The motivation behind this project was to understand the mathematics behind traditional SciPy algorithms that heavily utilize machine learning,
                        where a user might not understand the underlying mathematics. This project has been a part of my ongoing research in the field of anomaly detection. 
                    </span>
                </p>
            </div>
            <div className='sm:m-20 md:m-18 lg:m-18'>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem><img src="./output.png" alt=":(" className="w-full h-auto" /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}

export default Explore;