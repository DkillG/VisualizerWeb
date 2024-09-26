import { PointDTO } from '@/types/point';
import { database } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getPoints = async (): Promise<PointDTO[]> => {
	try {
		const query = await getDocs(collection(database, 'points'));
		const points: PointDTO[] = [];

		query.forEach(doc => {
			const data = doc.data();
			points.push({
				name: data.name,
				coords: [data.coordX, data.coordY],
			});
		});

		return points;
	} catch (error) {
		console.error(error);
		return [];
	}
};
