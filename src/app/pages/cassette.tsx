import { useEffect, useId, useRef } from "react";
import { cn } from "~/utils";

function Cassette({
  isRecording = false,
  className,
}: {
  isRecording?: boolean;
  className?: string;
}) {
  const rootId = useId();
  const animateId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const firstStart = useRef(true);
  useEffect(() => {
    if (!svgRef.current) return;

    if (isRecording) {
      if (firstStart.current) {
        svgRef.current
          .querySelectorAll("animateTransform")
          .forEach((anim) => anim.beginElement());
        firstStart.current = false;
      }
      svgRef.current.unpauseAnimations();
    } else {
      svgRef.current.pauseAnimations();
    }
  }, [isRecording]);

  return (
    <svg className={className} fill="none" ref={svgRef} viewBox="0 0 375 209">
      <g filter={`url(#${rootId}_a)`}>
        <mask fill="#fff" id={`${rootId}_b`}>
          <path d="M2.01 0H373v17H2V0Z" />
        </mask>
        <mask fill="#fff" id={`${rootId}_c`}>
          <path d="M2 153h371v7H2v-7Z" />
        </mask>
        <path
          d="M3.77 1.77h367.45v196.45H3.77z"
          fill="#EAB333"
          stroke="#000"
          strokeWidth="3.55"
        />
        <path d="M2 0h369.46v17H2V0Z" fill="#FFD498" />
        <path
          d="M2.01 0v-3.55h-3.56V0h3.56ZM373 0h3.56v-3.55H373V0ZM2 3.55H373v-7.1H2v7.1ZM369.44 0v17h7.12V0h-7.12ZM5.57 17V0h-7.12v17h7.12Z"
          fill="#000"
          mask={`url(#${rootId}_b)`}
        />
        <path
          d="M3.77 41.77h367.45v116.45H3.77z"
          fill="#E7410C"
          stroke="#000"
          strokeWidth="3.55"
        />
        <path d="M2 153h371v7H2v-7Z" fill="#9B2600" />
        <path
          d="M2 153v-3.55h-3.55V153H2Zm371 0h3.55v-3.55H373V153ZM2 156.55h371v-7.1H2v7.1ZM369.45 153v7h7.1v-7h-7.1Zm-363.9 7v-7h-7.1v7h7.1Z"
          fill="#000"
          mask={`url(#${rootId}_c)`}
        />
        <g clipPath={`url(#${rootId}_d)`}>
          <path
            d="M74.98 57.78H300.1a42.16 42.16 0 1 1 0 84.32H74.98a42.16 42.16 0 1 1 0-84.32Z"
            fill={`url(#${rootId}_e)`}
            stroke="#000"
            strokeWidth="3.55"
          />
          <circle
            cx="288.96"
            cy="98.9"
            r="31.38"
            stroke="#000"
            strokeWidth="1.77"
          />
          <circle
            cx="85.13"
            cy="98.9"
            r="31.38"
            stroke="#000"
            strokeWidth="1.77"
          />
          <g clipPath={`url(#${rootId}_f)`}>
            <path
              d="M144.19 84.69a3.28 3.28 0 0 1 3.28-3.29h56.12c2.58 13.7 2.32 21.3 0 35h-56.12a3.28 3.28 0 0 1-3.28-3.28V84.69Z"
              fill="#534A43"
            />
          </g>
          <rect
            height="33.23"
            rx="2.4"
            stroke="#000"
            strokeWidth="1.77"
            width="83.95"
            x="145.07"
            y="82.29"
          />
        </g>
        <path
          clipRule="evenodd"
          d="M108.82 95.89h-5.8v6.02h5.8a24.04 24.04 0 0 1-9.33 16.16l-2.9-5.01-5.22 3 2.9 5.03a23.98 23.98 0 0 1-18.66 0l2.9-5.04-5.21-3-2.9 5.02a24.04 24.04 0 0 1-9.33-16.16h5.8v-6.02h-5.8a24.04 24.04 0 0 1 9.34-16.16l2.9 5.02 5.21-3.01-2.9-5.02a23.98 23.98 0 0 1 18.66 0l-2.9 5.02 5.22 3.01 2.9-5.01a24.04 24.04 0 0 1 9.32 16.15Z"
          fill="#000"
          fillRule="evenodd"
          style={{ transformOrigin: "84.947px 98.902px 0" }}
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            begin="indefinite"
            dur="3s"
            fill="freeze"
            id={animateId}
            keyTimes="0; 1"
            repeatCount="indefinite"
            type="rotate"
            values="0;360"
          />
        </path>
        <path
          clipRule="evenodd"
          d="M312.65 95.89h-5.8v6.02h5.8a24.04 24.04 0 0 1-9.34 16.16l-2.9-5.01-5.21 3 2.9 5.03a23.99 23.99 0 0 1-18.66 0l2.9-5.04-5.21-3-2.9 5.02a24.04 24.04 0 0 1-9.33-16.16h5.8v-6.02h-5.8a24.04 24.04 0 0 1 9.34-16.16l2.9 5.02 5.21-3.01-2.9-5.02a23.98 23.98 0 0 1 18.66 0l-2.9 5.02 5.21 3.01 2.9-5.01a24.04 24.04 0 0 1 9.33 16.15Z"
          fill="#000"
          fillRule="evenodd"
          style={{ transformOrigin: "288.775px 98.902px 0" }}
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            begin="indefinite"
            dur="3s"
            fill="freeze"
            keyTimes="0; 1"
            repeatCount="indefinite"
            type="rotate"
            values="0;360"
          />
        </path>
        <g stroke="#000" strokeOpacity=".25">
          <path d="M2.22.5h370.67M2.22 8.39h370.67M2.22 16.39h370.67M2.22 24.39h370.67M2.22 32.39h370.67M2.22 40.39h370.67M2.22 48.39h370.67M2.22 56.39h370.67M2.22 64.39h370.67M2.22 72.39h370.67M2.22 80.39h370.67M2.22 88.39h370.67M2.22 96.39h370.67M2.22 104.39h370.67M2.22 112.39h370.67M2.22 120.39h370.67M2.22 128.39h370.67M2.22 136.39h370.67M2.22 144.39h370.67M2.22 152.39h370.67M2.22 160.39h370.67M2.22 168.39h370M2.22 176.39h370M3.22 184.39h369M3.22 192.39h369M3.22 200.39h369" />
        </g>
      </g>
      <defs>
        <clipPath id={`${rootId}_d`}>
          <rect
            fill="#fff"
            height="87.88"
            rx="43.94"
            width="313"
            x="31"
            y="56"
          />
        </clipPath>
        <clipPath id={`${rootId}_f`}>
          <rect
            fill="#fff"
            height="35"
            rx="3.28"
            width="85.72"
            x="144.19"
            y="81.4"
          />
        </clipPath>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${rootId}_e`}
          x1="187.35"
          x2="186.05"
          y1="141.7"
          y2="53.72"
        >
          <stop offset="1" stopColor="#464140" />
          <stop stopColor="#312E2D" />
        </linearGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="208.67"
          id={`${rootId}_a`}
          width="374.56"
          x=".22"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation=".89" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11_1045"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_11_1045"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export const CassettePlayerSection = ({
  isRecording,
  className,
  ...props
}: { isRecording: boolean } & React.ComponentProps<"button">) => (
  <button
    className={cn(
      "rounded-md border-4 bg-neutral-450 pb-2 shadow-[0_12px_3px_0_rgba(0,0,0,0.2)] active:*:translate-y-3",
      className,
    )}
    type="button"
    {...props}
  >
    <div className="-mx-1 -mt-1 rounded-md border-4 bg-neutral-300 p-5 pb-3 transition-transform">
      <Cassette className="w-full" isRecording={isRecording} />
    </div>
  </button>
);
