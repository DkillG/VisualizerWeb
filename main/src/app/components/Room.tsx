'use client';

import Image from 'next/image';
import { PointDTO } from '@/types/point';
import { MaterialDTO } from '@/types/material';
import { IoFingerPrint } from 'react-icons/io5';
import { BASE_IMAGE_URL } from '@/shared/constants';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FullPoint extends PointDTO {
	materials: MaterialDTO[];
}

interface SelectedMaterial {
	[key: string]: {
		layer: string;
		pointId: string;
	};
}

const Room = ({
	points,
	materials
}: {
	points: PointDTO[];
	materials: MaterialDTO[];
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [fullPoints] = useState<FullPoint[]>(
		points.map(point => ({
			...point,
			materials: materials.filter(material =>
				material.points.includes(point.id)
			)
		}))
	);
	const [loading, setLoading] = useState(false);
	const [menu, setMenu] = useState<FullPoint | null>(null);
	const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial>(
		{}
	);

	// Handling click event on components
	const handlePointClick = (point: FullPoint) => setMenu(point);
	const handleMaterialClick = (material: MaterialDTO) => {
		setLoading(true);
		setSelectedMaterials(prev => ({
			...prev,
			[menu!.id]: {
				pointId: menu!.id,
				layer: material.layers[menu!.id]
			}
		}));
	}

	// Cancels the menu when clicking outside the point
	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
		};

		document.addEventListener('mousedown', onClickOutside);
		return () => document.removeEventListener('mousedown', onClickOutside);
	}, []);

	// Prevent any inifnity loading
	useEffect(() => {
		if(loading) setTimeout(() => setLoading(false), 1500);
	}, [loading]);

	return (
		<div className="relative">
			{loading && <div className='absolute flex items-center justify-center w-full h-full top-0 left-0 bg-black/50 z-50'><i className='text-4xl animate-spin'><AiOutlineLoading3Quarters /></i></div>}
			<Image
				priority
				width={1240}
				height={873}
				src={BASE_IMAGE_URL}
				alt="White kitchen base image"
			/>

			{
				// Layers appear when there is a layer selected
				fullPoints.map(
					(point, i) =>
						selectedMaterials[point.id] && (
							<Image
								key={i}
								width={1240}
								height={873}
								alt={point.name}
								className="absolute top-0 left-0"
								src={selectedMaterials[point.id].layer}
								onLoadingComplete={() => setLoading(false)}
							/>
						)
				)
			}

			{
				// Menu appears when click a point
				menu && (
					<div
						ref={ref}
						style={{
							left: globalThis?.window.innerWidth < 650 ? '0%' : `${menu.coords[0] + 2}%`,
							top: globalThis?.window.innerWidth < 650 ? '105%' : `${menu.coords[1] - 4}%`,
						}}
						className="absolute flex flex-wrap w-full sm:max-w-[11.5rem] sm:justify-start justify-center gap-2 sm:bg-black/50 p-2 rounded-md"
					>
						{menu.materials.map((material, i) => (
							<div
								key={i}
								onClick={() => handleMaterialClick(material)}
								className="flex flex-col w-24 sm:w-20 bg-white hover:bg-[#ddd] rounded-md hover:cursor-pointer duration-200 ease-in-out"
							>
								<Image
									width={180}
									height={180}
									alt={material.name}
									src={material.preview}
									className="rounded-t-md h-20 sm:h-16 justify-self-start"
								/>
								<span className="flex items-center justify-center py-2 sm:py-1 text-xs text-center font-medium h-full text-black">
									{material.name}
								</span>
							</div>
						))}
					</div>
				)
			}

			{
				// Render the points in the base image
				!menu &&
				fullPoints.map((point, i) => (
					<button
						key={i}
						style={{
							top: `${point.coords[1]}%`,
							left: `${point.coords[0]}%`
						}}
						onClick={() => handlePointClick(point)}
						className="absolute text-sm md:text-2xl hover:scale-110 p-1 bg-zinc-800/40 rounded-full ease-in-out duration-200"
					>
						<IoFingerPrint />
					</button>
				))
			}
		</div>
	);
};

export default Room;
