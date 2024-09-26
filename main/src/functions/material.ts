import { database } from '@/lib/firebase';
import { MaterialDTO } from '@/types/material';
import { collection, getDocs } from 'firebase/firestore';

export const getMaterials = async (): Promise<MaterialDTO[]> => {
	try {
		const query = await getDocs(collection(database, 'materials'));
		const materials: MaterialDTO[] = [];

		query.forEach(doc => {
			const data = doc.data();

			materials.push({
				name: data.name,
				points: data.points,
				layers: data.layers,
				preview: data.materialPreview,
			});
		});

		return materials;
	} catch (error) {
		console.error(error);
		return [];
	}
};
