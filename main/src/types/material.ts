export interface MaterialDTO {
	name: string;
	preview: string;
	points: string[];
	layers: { [key: string]: string };
}
