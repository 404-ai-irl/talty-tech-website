"use client"

import { memo } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"

/**
 * CSS Variable types for theme consistency
 */
type ThemeVariables = {
  "--primary-rgb": string;
};

/**
 * Animated logo component with interactive effects
 * Implements optimized animations with proper cleanup
 */
const FancyLogo: React.FC = () => {
  // Use typed refs for better type safety

  return (
    <>
      <style jsx global>{`
        /* Animation keyframes */
        @keyframes pulse {
          0%, 100% { 
            transform: translateY(0); 
            filter: brightness(1); 
          }
          50% { 
            transform: translateY(-2px); 
            filter: brightness(1.2); 
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 2px rgba(var(--primary-rgb, 0, 123, 255), 0.3)); 
          }
          50% { 
            filter: drop-shadow(0 0 10px rgba(var(--primary-rgb, 0, 123, 255), 0.6)); 
          }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }
        
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Gradient text styling from hero section */
        .gradient-text {
          background: linear-gradient(90deg, var(--primary) 0%, var(--chart-1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Logo styling */
        .logo-container {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          text-decoration: none;
        }
        
        .logo-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            from 180deg at 50% 50%,
            hsl(var(--primary, 222, 80%, 50%)) 0deg,
            transparent 60deg,
            transparent 300deg,
            hsl(var(--primary, 222, 80%, 50%)) 360deg
          );
          opacity: 0;
          filter: blur(20px);
          transition: opacity 0.5s ease, width 0.5s ease, height 0.5s ease;
          animation: rotate 8s linear infinite;
          will-change: transform;
        }
        
        .logo-container:hover .logo-bg,
        .logo-container:focus-visible .logo-bg {
          opacity: 0.15;
          width: 150%;
          height: 150%;
        }
        
        .sparkle-container {
          position: relative;
          animation: float 3s ease-in-out infinite;
          will-change: transform;
        }
        
        .sparkle-icon {
          animation: glow 2s ease-in-out infinite;
          will-change: filter;
        }
        
        
        
      `}</style>

      <Link href="/" className="logo-container group relative flex items-center gap-2 py-2">

        <div className="sparkle-container mr-0.5">
          <Sparkles className="sparkle-icon h-6 w-6 text-primary" aria-hidden="true" />
          <div className="absolute -inset-2 -z-10 rounded-full bg-primary/5 opacity-0 blur-md transition-all duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-baseline">
            <div className="relative overflow-hidden rounded-md px-1" aria-label="Talty Tech">
              {/* Talty with individual letter animations */}
              <div className="relative z-10 text-2xl font-bold tracking-tight">                
                Talty Tech
              </div>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-300 group-hover:w-full"></div>
            </div>

          </div>

          <span className="text-[10px] font-medium text-muted-foreground tracking-widest" aria-hidden="true">
            INNOVATION REDEFINED</span>
        </div>
      </Link>
    </>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(FancyLogo)