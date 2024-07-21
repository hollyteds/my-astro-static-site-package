/// <reference types="astro/client" />

/**
 * Global interface declaration for the window object.
 */
declare global {
	interface Window {
		/**
		 * Configuration object for WebFont.
		 */
		WebFontConfig: {
			google?: {
				families: string[];
			};
			active?: () => void;
			inactive?: () => void;
			fontactive?: (familyName: string, fvd: string) => void;
			fontinactive?: (familyName: string, fvd: string) => void;
		};
	}
}
