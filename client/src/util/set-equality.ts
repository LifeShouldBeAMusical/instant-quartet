function setEquality<T>(a: T[], b: T[]): boolean {
	if (a.length != b.length) {
		return false
	}

	return a.every((v) => b.includes(v)) && b.every((v) => a.includes(v))
}

export default setEquality
