import { useEffect } from "react";

type UseBoundsValidationProps = {
  value: number;
  min: number;
  max: number;
  onOutOfBounds?: (closest: number) => void;
};

/**
 * Validates that value stays within bounds and calls callback when out of range.
 * Useful for pagination, sliders, or any ranged input validation.
 *
 * @returns An object containing the `isOutOfBounds` boolean and the `closest` value
 *
 * @example
 * useBoundsValidation({
 *   value: currentPage,
 *   min: 1,
 *   max: totalPages,
 *   onOutOfBounds: (validPage) => navigate(`/?page=${validPage}`)
 * });
 */
function useBoundsValidation({
  value,
  min,
  max,
  onOutOfBounds,
}: UseBoundsValidationProps) {
  const isOutOfBounds = value < min || value > max;
  const closest = isOutOfBounds ? (value < min ? min : max) : value;

  useEffect(() => {
    if (isOutOfBounds) {
      onOutOfBounds?.(closest);
    }
  }, [isOutOfBounds, closest, onOutOfBounds]);

  return { isOutOfBounds, closest };
}

export { useBoundsValidation };
export type { UseBoundsValidationProps };
