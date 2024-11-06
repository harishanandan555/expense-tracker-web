"use client";

import Image from "next/image";

type Props = {
	width?: number;
	height?: number;
};

export const Logo = ({ width, height }: Props) => {
	return (
		<Image
			src="/logo/default.svg"
			alt="SpendaScope"
			width={width ?? 40}
			height={height ?? 40}
		/>
	);
};
