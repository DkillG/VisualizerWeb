'use client';

import Image from 'next/image';
import { PointDTO } from '@/types/point';
import { MaterialDTO } from '@/types/material';
import { IoFingerPrint } from 'react-icons/io5';
import { BASE_IMAGE_URL } from '@/shared/constants';
import { useEffect, useRef, useState } from 'react';

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

	const [menu, setMenu] = useState<FullPoint | null>(null);
	const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial>(
		{}
	);

	// Handling click event on components
	const handlePointClick = (point: FullPoint) => setMenu(point);
	const handleMaterialClick = (material: MaterialDTO) =>
		setSelectedMaterials(prev => ({
			...prev,
			[menu!.id]: {
				pointId: menu!.id,
				layer: material.layers[menu!.id]
			}
		}));

	// Cancels the menu when clicking outside the point
	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
		};

		document.addEventListener('mousedown', onClickOutside);
		return () => document.removeEventListener('mousedown', onClickOutside);
	}, []);

	return (
		<div className="relative">
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
							top: `${menu.coords[1] - 4}%`,
							left: `${menu.coords[0] + 2}%`
						}}
						className="absolute flex flex-wrap gap-2 bg-black/50 p-2 rounded-md"
					>
						{menu.materials.map((material, i) => (
							<div
								key={i}
								onClick={() => handleMaterialClick(material)}
								className="flex flex-col w-24 h-28 bg-white hover:bg-[#ddd] rounded-md hover:cursor-pointer duration-200 ease-in-out"
							>
								<Image
									width={180}
									height={180}
									alt={material.name}
									src={material.preview}
									className="rounded-t-md h-20 justify-self-start"
								/>
								<span className="flex items-center justify-center text-center text-xs font-medium h-full text-black">
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
							className="absolute text-2xl hover:scale-110 p-1 bg-zinc-800/40 rounded-full ease-in-out duration-200"
						>
							<IoFingerPrint />
						</button>
					))
			}
		</div>
	);
};

export default Room;
