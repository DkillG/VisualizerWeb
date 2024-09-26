import { getPoints } from '@/functions/point';
import Room from './components/Room';

export default async function Home() {
	const points = await getPoints();

	return (
		<main className="flex items-center justify-center w-screen h-screen">
			<Room points={points} />
		</main>
	);
}
