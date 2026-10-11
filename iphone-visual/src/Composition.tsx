import React from "react";
import {AbsoluteFill, CanvasImage, Composition, Easing, getStaticFiles, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

type Props = {firstScreen: string; secondScreen: string};
const ease = {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1)} as const;
const Screen: React.FC<{file: string; number: string}> = ({file, number}) => {
  const {fps} = useVideoConfig();
  return getStaticFiles().some((asset) => asset.name === file) ? <CanvasImage src={staticFile(file)} premountFor={fps} style={{width: "100%", height: "100%", objectFit: "cover"}} /> :
    <AbsoluteFill style={{background: "linear-gradient(150deg,#161e22,#080c10)", justifyContent: "center", alignItems: "center", color: "#77928a", fontFamily: "Arial", gap: 24}}>
      <div style={{fontSize: 20, letterSpacing: 5}}>СКРИНШОТ {number}</div>
      <div style={{fontSize: 13, color: "#62716d"}}>Ожидается оригинал</div>
    </AbsoluteFill>;
};
export const IPhoneVisual: React.FC<Props> = ({firstScreen, secondScreen}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const change = interpolate(t, [2.25, 2.8], [0, 1], ease);
  const yaw = interpolate(t, [0, 1.3, 2.25, 2.65, 3.3, 5], [-58, -19, -16, 31, 17, 25], ease);
  return <AbsoluteFill style={{background: "#070a0d", fontFamily: "Arial, sans-serif", overflow: "hidden"}}>
    <AbsoluteFill style={{background: "radial-gradient(ellipse at 50% 48%,#15362e 0%,#0d1919 30%,#070a0d 67%)"}} />
    <div style={{position: "absolute", left: 130, top: 220, width: 820, height: 1330, border: "1px solid #77e5ba12", borderRadius: "50%", rotate: "-24deg"}} />
    <div style={{position: "absolute", left: 345, top: 1570, width: 430, height: 90, borderRadius: "50%", background: "#000", filter: "blur(35px)", opacity: 0.8, scale: interpolate(t, [0, 1.3, 5], [0.65, 1, 0.85], ease)}} />
    <div style={{position: "absolute", inset: 0, perspective: 2200, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{position: "relative", width: 578, height: 1232, transformStyle: "preserve-3d", transform: `rotateY(${yaw}deg) rotateX(${interpolate(t,[0,1.3,5],[8,-3,3],ease)}deg)`, rotate: interpolate(t,[0,1.3,2.25,3.3,5],["-12deg","-5deg","-5deg","5deg","3deg"],ease), translate: `0px ${interpolate(t,[0,1.3,5],[130,-20,-32],ease)}px`, scale: interpolate(t,[0,1.3,5],[0.85,1.06,1.03],ease)}}>
        {Array.from({length: 22}, (_, i) => <div key={i} style={{position: "absolute", inset: 0, borderRadius: 89, background: i % 3 === 0 ? "#627076" : "#333f45", border: "1px solid #7e8a90", transform: `translateZ(${-i}px)`, backfaceVisibility: "hidden"}} />)}
        <div style={{position: "absolute", inset: 0, borderRadius: 89, padding: 9, background: "linear-gradient(125deg,#f3f7f9,#7c8b94 13%,#25343b 44%,#acb8bd 67%,#33434c)", boxShadow: "0 28px 80px #0009", transform: "translateZ(1px)"}}>
          <div style={{width: "100%", height: "100%", borderRadius: 80, background: "#030405", padding: 11, boxSizing: "border-box"}}>
            <div style={{position: "relative", width: "100%", height: "100%", borderRadius: 68, overflow: "hidden", background: "#000"}}>
              <AbsoluteFill style={{translate: `${-change * 100}% 0`, opacity: 1 - change * 0.35}}><Screen file={firstScreen} number="01" /></AbsoluteFill>
              <AbsoluteFill style={{translate: `${(1 - change) * 100}% 0`, opacity: change}}><Screen file={secondScreen} number="02" /></AbsoluteFill>
              <div style={{position: "absolute", top: 17, left: "50%", translate: "-50% 0", width: 114, height: 29, borderRadius: 20, background: "#000", boxShadow: "inset 0 0 0 1px #17191b"}}><div style={{position: "absolute", right: 13, top: 9, width: 10, height: 10, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%,#123046,#05070c 65%)"}} /></div>
              <AbsoluteFill style={{pointerEvents: "none", background: "linear-gradient(118deg,#ffffff12 0%,transparent 30%,transparent 60%,#ffffff04 100%)"}} />
            </div>
          </div>
        </div>
        <div style={{position: "absolute", right: -3, top: 310, width: 5, height: 145, borderRadius: 3, background: "linear-gradient(#a8b5bc,#26363f)", transform: "translateZ(-8px)"}} />
        <div style={{position: "absolute", left: -3, top: 220, width: 5, height: 54, borderRadius: 3, background: "#6e7e87", transform: "translateZ(-8px)"}} />
        <div style={{position: "absolute", left: -3, top: 320, width: 5, height: 93, borderRadius: 3, background: "#6e7e87", transform: "translateZ(-8px)"}} />
        <div style={{position: "absolute", left: -3, top: 443, width: 5, height: 93, borderRadius: 3, background: "#6e7e87", transform: "translateZ(-8px)"}} />
      </div>
    </div>
    <div style={{position: "absolute", top: 144, width: "100%", textAlign: "center", color: "#eef8f3", fontSize: 46, fontWeight: 600, letterSpacing: -1, opacity: interpolate(t,[0,0.8],[0,1],ease)}}>iHub Pay<span style={{color: "#6be4b0"}}>.</span></div>
    <div style={{position: "absolute", bottom: 185, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 25, fontSize: 25, letterSpacing: 3}}>
      <span style={{color: change < 0.5 ? "#a0f8ce" : "#61716c"}}>КОДЫ</span><span style={{color: "#486259"}}> / </span><span style={{color: change >= 0.5 ? "#a0f8ce" : "#61716c"}}>ПРИЛОЖЕНИЯ</span>
    </div>
    <div style={{position: "absolute", bottom: 139, left: 470, width: 140, height: 3, background: "#ffffff12", borderRadius: 2}}><div style={{height: 3, width: `${interpolate(t,[0,5],[0,100],ease)}%`, background: "#75e9b9", borderRadius: 2}} /></div>
  </AbsoluteFill>;
};
export const MyComposition = () => <Composition id="IPhoneVisual" component={IPhoneVisual} durationInFrames={150} fps={30} width={1080} height={1920} defaultProps={{firstScreen: "screen-1.jpg", secondScreen: "screen-2.jpg"}} />;
