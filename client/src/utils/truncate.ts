export default function truncate(str: string, maxLen: number) {
	return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}
