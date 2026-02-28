import { SparkleField } from "./SparkleField";

export function CarStage() {
  return (
    <div className="w-full h-40 relative flex items-center justify-center bg-gradient-to-r from-gold/10 to-transparent rounded-xl overflow-hidden">
      <SparkleField density={32} />
      <span className="text-gold font-semibold text-lg relative z-10">
        Car Stage Placeholder
      </span>
    </div>
  );
}
