var htmlOriginal;
var htmlMem;
var cursorTimeline;

//////////////////////////////////////////////////////////////////////////////////
function onSplitFrames() {
    // -- called when splitting banner into frames
}

// INIT BANNER ----------------------------------
function init() {
    // Disable separate frames
    // separateFrames = function() {};

    setBannerSize();
    show(".scene");
    show(".common");
    set(".htmlMem", { skewX: 0.1, transformOrigin: "50% 50%" });

    new ImagePreloader(
        ["frame1-text.png", "frame2-text.png", "frame3-text.png"],
        frame0
    );

    set('.cursor .line', {drawSVG: "0% 0%", display: "none"})

    htmlOriginal = $("body").innerHTML;
    htmlMem = $(".htmlMem").innerHTML;

    addListeners();
}

function frame0() {
    show(".banner");
    from(".htmlMem", 0.25, { opacity: 0 }, "in", 0);
    frame1();

    // cursor slides in
    cursorTimeline = new TimelineMax({ paused: true });
    cursorTimeline.from('.cursor', 0.5, { x: 300, ease: Power2.easeOut})
        .from('.cursor', 0.7, { rotation: -90, ease: Back.easeOut}, 0.2)
        .to('.cursor .line', 0.2, { display: "", drawSVG: "30% 70%", ease: Linear.easeOut}, 1.2)
        .to('.cursor .line', 0.2, { drawSVG: "100% 100%", ease: Power2.easeOut}, 1.4)
        .to('.cursor', 0.2, { scale: 0.7, transformOrigin: "50% 50%", ease: Power3.easeOut}, 1.2)
        .to('.cursor', 0.2, { scale: 1, transformOrigin: "50% 50%", ease: Power3.easeOut}, 1.3)
        .to('.cursor', 0.6, { y: 150, rotation: 90, ease: Power2.easeIn}, 1.5)
        .to('.cursor', 0.6, { x: 150, ease: Sine.easeIn}, 1.5)
        .set('.cursor .line', {drawSVG: "0% 0%"})
}

function frame1() {
    show(".frame1");
    from(".frame1", 0.4, { opacity: 0, y: -20 }, "out", 0.1);

    hide(".blue-lines.left");
    hide(".blue-lines.right");
    var timeline = new TimelineMax({ delay: 0.2 })
        // show cloud    
        .fromTo("#cloud", 0.7, {drawSVG: "0% 0%"}, {drawSVG: "0% 75%", ease: Power2.easeOut})
        .from(".blue-lines .blue-line2", 0.4, {scale: 0, transformOrigin: "50% 50%", drawSVG: "50% 50%", ease: Power2.easeOut}, "-=0.4")
        .from(".blue-lines .blue-line1", 0.4, {scale: 0, transformOrigin: "50% 50%", drawSVG: "50% 50%", ease: Power2.easeOut}, "-=0.3")
        .from("#play", 0.5, {scale: 0.5, transformOrigin: "50% 50%", x: -20, opacity: 0, ease: Back.easeOut}, "-=0.3")
        

        // hide cloud
        .to(".blue-lines .blue-line1", 0.4, {scale: 1.2, drawSVG: "100% 100%", opacity: 0, ease: Power2.easeIn}, 1.5)
        .to(".blue-lines .blue-line2", 0.4, {scale: 1.2, drawSVG: "100% 100%", opacity: 0, ease: Power2.easeIn}, "-=0.35")
        .to("#play", 0.5, {scale: 0.5, transformOrigin: "50% 50%", x: 20, opacity: 0, ease: Power3.easeIn}, "-=0.4")
        .to("#cloud", 0.7, {drawSVG: "100% 100%", ease: Power2.easeInOut}, "-=0.4")
        .to("#cloud", 0.7, {scale: 0.5, transformOrigin:"50% 50%", y: -130, stroke: "#fdd100",  ease: Power2.easeIn}, "-=0.7")
        
    wait(2.5, frame2);
}

function frame2() {
    show(".frame2");
    from(".frame2 .text", 0.4, { opacity: 0, y: -20 }, "out", 1.0);
    to(".frame1", 0.4, { opacity: 0, y: 20 }, "in", 0.25);


    var timeline = new TimelineMax({ delay: 0 })
        // show button
        .from('.frame2 .cta', 0.3, { display: "none", scale: 0.8, ease: Back.easeOut })
        .from('.frame2 .cta', 0.5, { x: 50, width: 38, ease: Power2.easeOut }, "-=0.3")
        .from('.frame2 .cta img', 0.25, { opacity: 0, ease: Power2.easeIn }, "-=0.2")
        // press button animation
        .to('.frame2 .cta', 0.1, { scale: 0.8, ease: Power2.easeOut }, 2.75)
        .to('.frame2 .cta', 0.1, { scale: 1, ease: Power2.easeOut })
    
    wait(1.5, function(){ 
        cursorTimeline.play();
    })

        

    wait(2.6, frame3);
}

function frame3() {
    show(".frame3");
    from(".frame3 .text", 0.4, { opacity: 0, y: -20 }, "out", 0.5);
    to(".frame2 .text", 0.4, { opacity: 0, y: 20 }, "in");

    var timeline = new TimelineMax({ delay: 0.5 });
    timeline.to('.frame2 .cta', 0.5, { rotationX: -90, ease: Power2.easeIn })
        .from('.frame3 .cta', 0.5, { rotationX: 90, ease: Power2.easeOut })
        .from('.frame3 .logo', 0.5, { opacity: 0, ease: Power2.easeIn }, "-=0.5")


    if (banner.loopCount < 1) {
        banner.loopCount++;
        wait(5, loop);
    } else {
        from(".replay", 0.5, { opacity: 0 }, "in", 1);
    }
}

function loop() {
    killAll();
    to(".htmlMem", 1.0, { opacity: 0 }, "in");
    set(".replay", { display: "none", opacity: 1 });

    banner.looping = true;

    wait(1.0, function () {
        killAll();
        set(".htmlMem", { opacity: 1 });
        $(".htmlMem").innerHTML = htmlMem;
        frame0();
        banner.looping = false;
    });
}

function reset() {
    loop();
}

window.addEventListener("load", init);
