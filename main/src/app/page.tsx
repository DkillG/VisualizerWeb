import { getPoints } from '@/functions/point';
import Room from './components/Room';
import { getMaterials } from '@/functions/material';

export default async function Home() {
	const points = await getPoints();
	const materials = await getMaterials();

	return (
		<main className="flex items-center justify-center w-screen h-screen">
			<Room points={points} materials={materials} />
		</main>
	);
}
