import { PointDTO } from '@/types/point';
import { database } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const pointsId: { [key: string]: string } = {
	Entrepaños: 'i7EVutewtycZY2qwmldG',
	Pavimento: 'EnRd7hAaNydVdVJ06qgF',
	Encimera: 'cd84QwP9gOhAU5p47UDn',
	Frente: 'Ks5CthbPwAvd2TNxzHEl',
};

export const getPoints = async (): Promise<PointDTO[]> => {
	try {
		const query = await getDocs(collection(database, 'points'));
		const points: PointDTO[] = [];

		query.forEach(doc => {
			const data = doc.data();

			points.push({
				id: pointsId[data.name],
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
