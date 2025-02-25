import './Explore.css'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { IoIosLink } from 'react-icons/io'

function Explore() {
    return (
        <>
            <div className='max-w-6xl'>
                <div className='text-4xl text-white mt-10 ml-8 heading-override'>
                    <h1 className="inline-block font-semibold">Projects</h1>
                </div>
                <div className='mr-20'>
                    <hr className="w-full mt-3 ml-8 mb-10" />
                </div>
                
                <div className='mt-10 ml-8 mr-8 mb-4'>
                    <h1 className='text-3xl text-white'>
                        <a className='a-override' href='https://github.com/fj-corp/Efficient-Data-Stream-Anomaly-Detection'>
                            Real time data stream anomaly detection &nbsp;
                            <IoIosLink className='inline'/>
                        </a>
                    </h1>
                    <p className='mt-6 break-words'>
                        <span className='text-white'>Project simulates noisy seasonal data and identifies anomalies using a combination of Z-score and Exponential Moving Average (EMA), making it more 
                            adaptable than traditional methods. Unlike Local Outlier Factor (LOF), it captures subtle changes that might go unnoticed. 
                            It’s built from scratch without SciPy, providing an efficient and mathematically transparent approach to anomaly detection.
                            The motivation behind this project was to understand the mathematics behind traditional SciPy algorithms that heavily utilize machine learning,
                            where a user might not understand the underlying mathematics. This project has been a part of my ongoing interest in the world of anomaly detection with and without Scikit.
                        </span>
                    </p>
                    <p className='mt-2 break-words'>
                        <span className='text-white'>
                            Technologies used: Python, Matlab, Numpy
                        </span>
                    </p>
                    <p className='mt-2 break-words'>
                        <span className='text-white'>
                            Here's an example of what realtime anomaly detection would look like:
                        </span>
                    </p>
                    <Carousel className='mt-8 ml-5 mr-5'>
                        <CarouselContent>
                            <CarouselItem><img src="./output.png" alt=":(" className="w-full h-auto" /></CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        
            <div className='max-w-6xl mt-12'>
                <div className='text-4xl text-white mt-10 ml-8 heading-override'>
                    <h1 className="inline-block font-semibold">Leetcode History/Analytics</h1>
                </div>
                <div className='mr-20'>
                    <hr className="w-full mt-3 ml-8 mb-10" />
                </div>
            </div>
        </>
    )
}

export default Explore;