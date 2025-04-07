import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type ISourceOptions
  } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

const ParticleConfig = () => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
        }).then(() => setInit(true));
    }, []);


    /**
    const particlesLoaded = async (container?: Container) => {
        console.log(container);
    };
    */

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: "#061117", // Background color
            },
            backgroundMode: {
                enable: true,
                zIndex: 0,
            },
            particles: {
                number: {
                    value: 355, // Number of particles
                    density: {
                        enable: true,
                        value_area: 789.1476416322727, // Area density
                    },
                },
                color: {
                    value: "#ffffff", // Particle color
                },
                shape: {
                    type: "circle", // Particle shape
                    stroke: {
                        width: 0,
                        color: "#058bbb",
                    },
                    polygon: {
                        nb_sides: 5, // Number of sides for polygon shape
                    },
                    image: {
                        src: "img/github.svg", // Image source for image shape
                        width: 100,
                        height: 100,
                    },
                },
                opacity: {
                    value: 0.48927153781200905, // Opacity
                    random: false,
                    anim: {
                        enable: true,
                        speed: 0.2,
                        opacity_min: 0,
                        sync: false,
                    },
                },
                size: {
                    value: 2, // Particle size
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0,
                        sync: false,
                    },
                },
                links: {
                    enable: false, // Disable links (line_linked in JS)
                    distance: 150,
                    color: "#058bbb",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out", // Out mode
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                detect_on: "canvas", // Detect interactivity on canvas
                events: {
                    onHover: {
                        enable: true,
                        mode: "bubble", // Hover mode
                    },
                    onClick: {
                        enable: true,
                        mode: "push", // Click mode
                    },
                    resize: {
                        enable: true,
                        delay: 0.5,
                    },
                },
                modes: {
                    grab: {
                        distance: 400,
                        links: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 83.91608391608392,
                        size: 1,
                        duration: 3,
                        opacity: 1,
                        speed: 3,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    push: {
                        particles_nb: 4, // Number of particles to push
                    },
                    remove: {
                        particles_nb: 2, // Number of particles to remove
                    },
                },
            },
            retina_detect: true, // Retina detection
        }),
        [],
      );

    if (init) {
        return (
          <Particles
            id="tsparticles"
            // particlesLoaded={particlesLoaded}
            options={options}
          />
        );
    }
    
    return <></>;
};

export default ParticleConfig;