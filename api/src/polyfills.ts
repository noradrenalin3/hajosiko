// @ts-ignore
BigInt.prototype['toJSON'] = function () {
	if (Number.isSafeInteger(this)) {
		return Number(this);
	}
	return this.toString();
};
