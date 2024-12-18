import { cn } from "@/lib/utils";

export default function RetroGrid({
  className,
  angle = 65,
  lineColorLight = "rgba(128, 0, 128, 0.3)", // Purple for light mode
  lineColorDark = "rgba(255, 0, 255, 0.3)"  // Magenta for dark mode (example)
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]",
        className
      )}
      style={{
        "--grid-angle": `${angle}deg`
      }}>
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            // Light Styles with custom line color
            `[background-image:linear-gradient(to_right,${lineColorLight}_10px,transparent_0),linear-gradient(to_bottom,${lineColorLight}_1px,transparent_0)]`,
            // Dark styles with custom line color
            `dark:[background-image:linear-gradient(to_right,${lineColorDark}_10px,transparent_0),linear-gradient(to_bottom,${lineColorDark}_1px,transparent_0)]`
          )}
        />
      </div>
      {/* Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black"
      />
    </div>
  );
}
