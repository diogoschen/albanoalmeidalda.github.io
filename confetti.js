tsParticles.load("tsparticles", {
    fullScreen: {
        enable: true
    },
    particles: {
        number: {
            value: 0
        },
        color: {
            value: ["#ffee00", "#ffee00", "#ffee00", "#ffee00"]
        },
        shape: {
            type: ["circle", "square"]
        },
        opacity: {
            value: {
                max: 1,
                min: 0
            },
            animation: {
                enable: true,
                speed: 2,
                startValue: "max",
                destroy: "min"
            }
        },
        size: {
            value: { min: 3, max: 7 }
        },
        life: {
            duration: {
                sync: true,
                value: 5
            },
            count: 1
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
                acceleration: 20
            },
            speed: {
                min: 25,
                max: 100
            },
            drift: {
                min: -2,
                max: 2
            },
            decay: 0.05,
            direction: "none",
            outModes: {
                default: "destroy",
                top: "none"
            }
        },
        rotate: {
            value: {
                min: 0,
                max: 360
            },
            direction: "random",
            move: true,
            animation: {
                enable: true,
                speed: 60
            }
        },
        tilt: {
            direction: "random",
            enable: true,
            move: true,
            value: {
                min: 0,
                max: 360
            },
            animation: {
                enable: true,
                speed: 60
            }
        },
        roll: {
            darken: {
                enable: true,
                value: 25
            },
            enable: true,
            speed: {
                min: 15,
                max: 25
            }
        },
        wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
                min: -15,
                max: 15
            }
        }
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            resize: true
        }
    },
    detectRetina: true,
    background: {
        color: ""
    },
    responsive: [
        {
            maxWidth: 700,
            options: {
                particles: {
                    move: {
                        speed: 30,
                        decay: 0.05
                    }
                }
            }
        }
    ],
    emitters: [
        {
            direction: "top-right",
            rate: {
                delay: 0.1,
                quantity: 10
            },
            position: {
                x: 0,
                y: 50
            },
            size: {
                width: 0,
                height: 0
            }
        },
        {
            direction: "top-left",
            rate: {
                delay: 0.1,
                quantity: 10
            },
            position: {
                x: 100,
                y: 50
            },
            size: {
                width: 0,
                height: 0
            }
        }
    ]
});
