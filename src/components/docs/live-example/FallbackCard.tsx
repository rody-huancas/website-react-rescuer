import type { FallbackProps } from "react-rescuer";
import { PrimaryButton } from "@/components/docs/live-example/buttons";

const FallbackCard = ({ error, resetError, retryCount, errorContext }: FallbackProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/8">
      <div className="border-b border-red-500/20 bg-red-500/10 px-4 py-3">
        <div className="text-sm font-semibold text-white">Algo salio mal</div>
        <div className="mt-1 text-sm text-white/70">{error.message}</div>
      </div>

      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/25 p-3">
            <div className="font-(family-name:--font-geist-mono) text-[11px] tracking-[0.18em] text-white/45">
              FINGERPRINT
            </div>
            <div className="mt-2 font-(family-name:--font-geist-mono) text-[12px] text-white/75 break-all">
              {errorContext.fingerprint}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-3">
            <div className="font-(family-name:--font-geist-mono) text-[11px] tracking-[0.18em] text-white/45">
              RETRY COUNT
            </div>
            <div className="mt-2 font-(family-name:--font-geist-mono) text-[12px] text-white/75">
              {retryCount}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <PrimaryButton onClick={resetError}>Reintentar</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default FallbackCard;
