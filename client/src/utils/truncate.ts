export default function truncate(str: string) {
	return str.length > 14 ? str.substring(0, 10) + '...' : str;
	//return str.length > 10 ? str.substring(0, 7) + '...' : str;
}
