"use client"

import React from "react"

interface Carousel3DProps {
  images: string[]
  imageWidth?: number
  imageHeight?: number
  rotateSpeed?: number
  pauseOnHover?: boolean
  translateZ?: number
  borderRadius?: number
  showBackface?: boolean
  pauseDuration?: number
}

export default function Carousel3D({
  images,
  imageWidth = 400,
  imageHeight = 450,
  rotateSpeed = 20,
  pauseOnHover = true,
  translateZ = 350,
  borderRadius = 0,
  showBackface = true,
  pauseDuration = 3,
}: Carousel3DProps) {
  const totalItems = Math.max(images.length, 6)
  const spreadAngle = 360 / totalItems
  const animationPlayState = pauseOnHover ? "running" : "paused"

  // Calculate animation timing for pause effect
  // Total time = rotateSpeed, pause time per stop = pauseDuration
  const totalPauseTime = pauseDuration * totalItems
  const totalAnimationTime = rotateSpeed + totalPauseTime
  const rotatePercent = (rotateSpeed / totalAnimationTime) * 100
  const pausePercent = (pauseDuration / totalAnimationTime) * 100

  // Fill array to minimum 6 images if needed
  const filledImages = [
    ...images,
    ...Array.from(
      { length: totalItems - images.length },
      (_, i) => `https://picsum.photos/200/120?random=${i}`
    ),
  ]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        perspective: "2500px",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "auto",
      }}
    >
      <style jsx>{`
        @keyframes rotationWithPause {
          ${Array.from({ length: totalItems }, (_, i) => {
            const stepPercent = (100 / totalItems) * i
            const rotateToPercent = stepPercent + (rotatePercent / totalItems)
            const pauseToPercent = rotateToPercent + (pausePercent / totalItems)
            const angle = (360 / totalItems) * i
            const nextAngle = (360 / totalItems) * (i + 1)

            return `
              ${stepPercent.toFixed(2)}% {
                transform: rotateY(${angle}deg);
              }
              ${rotateToPercent.toFixed(2)}% {
                transform: rotateY(${nextAngle}deg);
              }
              ${pauseToPercent.toFixed(2)}% {
                transform: rotateY(${nextAngle}deg);
              }
            `
          }).join('')}
          100% {
            transform: rotateY(360deg);
          }
        }

        .carousel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          transform-origin: center center;
          animation: rotationWithPause ${totalAnimationTime}s infinite ease-in-out;
          animation-play-state: ${animationPlayState};
        }

        .carousel:hover {
          animation-play-state: paused;
        }

        .carousel figure {
          position: absolute;
          margin: 0;
          top: 50%;
          left: 50%;
          transform-origin: center center;
          overflow: hidden;
          transition: transform 0.5s ease;
          backface-visibility: ${showBackface ? "visible" : "hidden"};
       
        }

        .carousel figure img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.5s ease;
          cursor: pointer;
          backface-visibility: ${showBackface ? "visible" : "hidden"};
          image-rendering: high-quality;
          image-rendering: -webkit-optimize-contrast;
          filter: contrast(1.05) brightness(1.02) saturate(1.1);
        }

        .carousel figure img:hover {
          transform: scale(1.2);
        }
      `}</style>

      <div className="carousel">
        {filledImages.map((src, index) => {
          const angle = index * spreadAngle
          const transform = `
            translate(-50%, -50%)
            rotateY(${angle}deg)
            translateZ(${translateZ}px)
          `

          return (
            <figure
              key={index}
              style={{
                width: imageWidth,
                height: imageHeight,
                transform,
                borderRadius,
              }}
            >
              <img
                src={src}
                alt={`carousel-${index}`}
                style={{ borderRadius }}
              />
            </figure>
          )
        })}
      </div>
    </div>
  )
}
